import { createTRPCRouter } from "~/server/api/trpc";
import { storeRouter } from "./routers/store";
import { employeeRouter } from "./routers/employee";
import { shiftRouter } from "./routers/shift";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  stores: storeRouter,
  employees: employeeRouter,
  shifts: shiftRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
