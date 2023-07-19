import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const employeeRouter = createTRPCRouter({
  getAll: privateProcedure.query(({ ctx }) => {
    if (!ctx.userId) throw new Error("User is not authenticated.");

    return ctx.prisma.employee.findMany({
      where: {
        userId: ctx.userId,
      },
    });
  }),
  // getEmployeesByStoreId: privateProcedure
  //   .input(z.object({ storeId: z.string() }))
  //   .query(({ ctx, input }) => {
  //     if (!ctx.userId) throw new Error("User is not authenticated.");

  //     return ctx.prisma.employee.findMany({
  //       where: {
  //         userId: ctx.userId,
  //         storeId: input.storeId,
  //       },
  //     });
  //   }),
});
