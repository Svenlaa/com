// src/server/trpc/router/_app.ts
import { publicProcedure, router } from "../trpc";
import { runningRouter } from "./running";

export const appRouter = router({
  running: runningRouter,
  status: publicProcedure.query(() => "up"),
});

// export type definition of API
export type AppRouter = typeof appRouter;
