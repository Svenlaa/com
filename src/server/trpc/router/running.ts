import { protectedProcedure, publicProcedure, router } from "../trpc";
import { z } from "zod";
import { formatDate, formatYearWeek } from "../../../utils/date";

export const runningRouter = router({
  getAll: publicProcedure
    .input(z.number().default(new Date().getFullYear()))
    .query(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findFirst({ select: { id: true } });
      return await ctx.prisma.run.findMany({
        where: {
          AND: {
            yearWeek: { startsWith: `${input}w` },
            runnerId: user?.id,
          },
        },
        orderBy: {
          date: "desc",
        },
      });
    }),
  create: protectedProcedure
    .input(
      z.object({
        date: z.string().length(10).default(formatDate(new Date())),
        distance: z.number(),
        time: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const date = input.date;
      const yearWeek = formatYearWeek(new Date(date));
      const runnerId = ctx.session.user.id;
      return await ctx.prisma.run.create({
        data: {
          date,
          distance: input.distance,
          time: input.time,
          yearWeek,
          runnerId,
        },
      });
    }),
  deleteItem: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      const run = input;
      const runnerId = ctx.session.user.id;
      const dbRunnerId = await ctx.prisma.run.findUnique({
        where: { id: run },
        select: { runnerId: true },
      });
      if (dbRunnerId?.runnerId !== runnerId)
        throw Error("You are not authorized to delete this run");

      return await ctx.prisma.run.delete({
        where: { id: run },
      });
    }),
});
