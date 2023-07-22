import { shouldAutoRemoveFilter } from "@tanstack/react-table";
import { TRPCError } from "@trpc/server";
import { addDays, getDate, getMonth, getYear, subDays } from "date-fns";
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
  copyShiftsFromTargetWeek: privateProcedure
    .input(
      z.object({
        weeksBefore: z.number(),
        startDate: z.date(),
        endDate: z.date(),
        storeId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.userId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const startDate = new Date(
        getYear(input.startDate),
        getMonth(input.startDate),
        getDate(input.startDate),
        0,
        0
      );
      const endDate = new Date(
        getYear(input.endDate),
        getMonth(input.endDate),
        getDate(input.endDate),
        23,
        59
      );
      const targetStartDate = subDays(startDate, input.weeksBefore * 7);
      const targetEndDate = subDays(endDate, input.weeksBefore * 7);

      // delete current week's shifts
      await ctx.prisma.shift.deleteMany({
        where: {
          storeId: input.storeId,
          startDate: {
            lte: endDate,
            gte: startDate,
          },
        },
      });

      const lastWeekShifts = await ctx.prisma.shift.findMany({
        where: {
          userId: ctx.userId,
          startDate: {
            lte: targetEndDate,
            gte: targetStartDate,
          },
          storeId: input.storeId,
        },
      });

      const newShifts = lastWeekShifts.map((shift) => {
        return {
          ...shift,
          startDate: addDays(shift.startDate, 7),
          endDate: addDays(shift.endDate, 7),
        };
      });

      return ctx.prisma.shift.createMany({
        data: newShifts,
      });
    }),
});
