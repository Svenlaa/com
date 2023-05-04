import { adminProcedure, publicProcedure, router } from "../trpc";
import { z } from "zod";
import { formatDate, formatYearWeek } from "../../../utils/date";
import { Run } from "../../db/schema";
import { desc, eq, like } from "drizzle-orm/expressions";
import { createId } from "@paralleldrive/cuid2";
import { asc } from "drizzle-orm/expressions";

export const runningRouter = router({
  all: publicProcedure
    .input(z.number().default(new Date().getFullYear()))
    .query(async ({ input, ctx }) => {
      const firstRun = await ctx.db
        .select({ yearWeek: Run.yearWeek })
        .from(Run)
        .limit(1)
        .orderBy(asc(Run.date))
        .then((e) => e[0]);
      const firstYearString = firstRun?.yearWeek.split("w")[0] ?? null;
      const firstYear = firstYearString === null ? 0 : +firstYearString;

      const runs = await ctx.db
        .select()
        .from(Run)
        .where(like(Run.yearWeek, `${input}w%`))
        .orderBy(desc(Run.date));

      return { runs, firstYear };
    }),
  get: publicProcedure.input(z.string()).query(async ({ input, ctx }) => {
    return (await ctx.db.select().from(Run).where(eq(Run.id, input)))[0];
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
      if (!ctx.session.user.isAdmin)
        throw Error("You are not authorized to create runs");
      return await ctx.db.insert(Run).values({
        id: createId(),
        date,
        distance: input.distance,
        time: input.time,
        yearWeek,
        location: input.location,
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
      if (!ctx.session.user.isAdmin)
        throw Error("You are not authorized to create runs");
      return await ctx.db
        .update(Run)
        .set({ time: input.time })
        .where(eq(Run.id, input.id));
    }),
  delete: adminProcedure.input(z.string()).mutation(async ({ input, ctx }) => {
    const run = input;
    if (!ctx.session.user.isAdmin)
      throw Error("You are not authorized to delete runs");

    return await ctx.db.delete(Run).where(eq(Run.id, run));
  }),
});
