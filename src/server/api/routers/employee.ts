import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const employeeRouter = createTRPCRouter({
  getAll: privateProcedure.query(({ ctx }) => {
    if (!ctx.userId) return [];

    return ctx.prisma.employee.findMany({
      where: {
        userId: ctx.userId,
      },
    });
  }),
});
