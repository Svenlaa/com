// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import { runningRouter } from "./running";

export const appRouter = router({
  running: runningRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
