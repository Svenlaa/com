import { protectedProcedure, publicProcedure, router } from "../trpc";
import { z } from "zod";
import { formatDate, formatYearWeek } from "../../../utils/date";

export const runningRouter = router({
  getAll: publicProcedure
    .input(z.number().default(new Date().getFullYear()))
    .query(async ({ input, ctx }) => {
      const user =
        ctx.session?.user ??
        (await ctx.prisma.user.findFirst({ select: { id: true } }));

      return await ctx.prisma.run.findMany({
        where: {
          AND: {
            date: { startsWith: input + "" },
            runnerId: user?.id,
          },
        },
        select: {
          date: true,
          distance: true,
          id: true,
          yearWeek: true,
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
      })
    )
    .mutation(async ({ input, ctx }) => {
      const date = input.date;
      const yearWeek = formatYearWeek(new Date(date));
      const runnerId = ctx.session.user.id;
      const yes = await ctx.prisma.run.create({
        data: {
          date,
          distance: input.distance,
          yearWeek,
          runnerId,
        },
      });
      return yes;
    }),
});
