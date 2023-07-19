import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const storeRouter = createTRPCRouter({
  getAll: privateProcedure.query(({ ctx }) => {
    if (!ctx.userId) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    return ctx.prisma.store.findMany({
      where: {
        userId: ctx.userId,
      },
    });
  }),
  getStoreWithEmployees: privateProcedure
    .input(z.object({ storeId: z.string() }))
    .query(({ ctx, input }) => {
      if (!ctx.userId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      return ctx.prisma.store.findFirst({
        where: {
          userId: ctx.userId,
          id: input.storeId,
        },
        include: {
          employees: true,
        },
      });
    }),
});
