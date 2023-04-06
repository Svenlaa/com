import { adminProcedure, publicProcedure, router } from "../trpc";
import { z } from "zod";
import { formatDate, formatYearWeek } from "../../../utils/date";

export const runningRouter = router({
  all: publicProcedure
    .input(z.number().default(new Date().getFullYear()))
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.run.findMany({
        where: {
          AND: {
            yearWeek: { startsWith: `${input}w` },
          },
        },
        orderBy: {
          date: "desc",
        },
      });
    }),
  get: publicProcedure.input(z.string()).query(async ({ input, ctx }) => {
    return await ctx.prisma.run.findUnique({
      where: { id: input },
    });
  }),
  create: adminProcedure
    .input(
      z.object({
        date: z.string().length(10).default(formatDate(new Date())),
        distance: z.number(),
        time: z.number().nullable(),
        location: z.string().nullable(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const date = input.date;
      const yearWeek = formatYearWeek(new Date(date));
      return await ctx.prisma.run.create({
        data: {
          date,
          distance: input.distance,
          time: input.time,
          yearWeek,
          location: input.location,
        },
      });
    }),
  addTime: adminProcedure
    .input(
      z.object({
        id: z.string(),
        time: z.number().nullable(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.run.update({
        where: { id: input.id },
        data: {
          time: input.time,
        },
      });
    }),
  delete: adminProcedure.input(z.string()).mutation(async ({ input, ctx }) => {
    return await ctx.prisma.run.delete({
      where: { id: input },
    });
  }),
});
