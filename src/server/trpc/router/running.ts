import { adminProcedure, publicProcedure, router } from "../trpc";
import { z } from "zod";
import { formatDate, formatYearWeek } from "../../../utils/time";
import { Runs } from "../../../../drizzle/schema";
import { asc, desc, eq, like } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";

export const runningRouter = router({
  all: publicProcedure
    .input(z.number().default(new Date().getFullYear()))
    .query(async ({ input, ctx }) => {
      const firstRun = await ctx.db
        .select({ yearWeek: Runs.yearWeek })
        .from(Runs)
        .limit(1)
        .orderBy(asc(Runs.date))
        .then((e) => e[0]);
      const firstYearString = firstRun?.yearWeek.split("w")[0] ?? null;
      const firstYear = firstYearString === null ? 0 : +firstYearString;

      const runs = await ctx.db
        .select()
        .from(Runs)
        .where(like(Runs.yearWeek, `${input}w%`))
        .orderBy(desc(Runs.date));

      return { runs, firstYear };
    }),
  get: publicProcedure.input(z.string()).query(async ({ input, ctx }) => {
    return (await ctx.db.select().from(Runs).where(eq(Runs.id, input)))[0];
  }),
  create: adminProcedure
    .input(
      z.object({
        date: z
          .string()
          .regex(new RegExp(/\d{4}-[01]\d-[0-3]\d/))
          .default(formatDate(new Date())),
        distance: z.number(),
        time: z.number().nullable(),
        location: z.string().nullable(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const date = new Date(input.date);
      const yearWeek = formatYearWeek(date);
      if (!ctx.session.user.isAdmin)
        throw Error("You are not authorized to create runs");
      return await ctx.db.insert(Runs).values({
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
        .update(Runs)
        .set({ time: input.time })
        .where(eq(Runs.id, input.id));
    }),
  delete: adminProcedure.input(z.string()).mutation(async ({ input, ctx }) => {
    const run = input;
    if (!ctx.session.user.isAdmin)
      throw Error("You are not authorized to delete runs");

    return await ctx.db.delete(Runs).where(eq(Runs.id, run));
  }),
});
