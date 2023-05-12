import { publicProcedure, router } from "../trpc";
import { runningRouter } from "./running";

export const appRouter = router({
  running: runningRouter,
  status: publicProcedure.query(() => "up"),
});

export type AppRouter = typeof appRouter;
