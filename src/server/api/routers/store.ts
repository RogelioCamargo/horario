import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const storeRouter = createTRPCRouter({
  getAll: privateProcedure.query(({ ctx }) => {
    if (!ctx.userId) return [];

    return ctx.prisma.store.findMany({
      where: {
        userId: ctx.userId,
      },
    });
  }),
});
