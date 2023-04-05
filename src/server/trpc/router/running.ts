import { protectedProcedure, publicProcedure, router } from "../trpc";
import { z } from "zod";
import { formatDate, formatYearWeek } from "../../../utils/date";
import { tbRuns } from "../../db/schema";
import { desc, eq, like } from "drizzle-orm/expressions";
import { createId } from "@paralleldrive/cuid2";

export const runningRouter = router({
  all: publicProcedure
    .input(z.number().default(new Date().getFullYear()))
    .query(async ({ input, ctx }) => {
      return await ctx.db
        .select()
        .from(tbRuns)
        .where(like(tbRuns.yearWeek, `${input}w%`))
        .orderBy(desc(tbRuns.date));
    }),
  get: publicProcedure.input(z.string()).query(async ({ input, ctx }) => {
    return (await ctx.db.select().from(tbRuns).where(eq(tbRuns.id, input)))[0];
  }),
  create: protectedProcedure
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
      if (!ctx.session.user.isAdmin)
        throw Error("You are not authorized to create runs");
      return await ctx.db.insert(tbRuns).values({
        id: createId(),
        date,
        distance: input.distance,
        time: input.time,
        yearWeek,
        location: input.location,
      });
    }),
  addTime: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        time: z.number().nullable(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (!ctx.session.user.isAdmin)
        throw Error("You are not authorized to create runs");
      return await ctx.db
        .update(tbRuns)
        .set({ time: input.time })
        .where(eq(tbRuns.id, input.id));
    }),
  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      const run = input;
      if (!ctx.session.user.isAdmin)
        throw Error("You are not authorized to delete runs");

      return await ctx.db.delete(tbRuns).where(eq(tbRuns.id, run));
    }),
});
