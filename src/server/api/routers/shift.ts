import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const shiftRouter = createTRPCRouter({
  createShift: privateProcedure
    .input(
      z.object({
        startDate: z.date(),
        endDate: z.date(),
        userId: z.string(),
        notes: z.string().optional(),
        employeeId: z.string(),
        storeId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.userId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      return await ctx.prisma.shift.create({
        data: input,
      });
    }),
});
