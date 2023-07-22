import { Shift } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { getDate, getDay, getMonth, getYear, parseISO } from "date-fns";
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
    .input(
      z.object({
        storeId: z.string(),
      })
    )
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
  getStoreWithEmployeeShifts: privateProcedure
    .input(
      z.object({
        storeId: z.string(),
        startDate: z.string(),
        endDate: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      if (!ctx.userId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      let startDate = parseISO(input.startDate);
      let endDate = parseISO(input.endDate);
      startDate = new Date(
        getYear(startDate),
        getMonth(startDate),
        getDate(startDate),
        0,
        0
      );
      endDate = new Date(
        getYear(endDate),
        getMonth(endDate),
        getDate(endDate),
        23,
        59
      );

      const store = await ctx.prisma.store.findFirst({
        where: {
          userId: ctx.userId,
          id: input.storeId,
        },
        include: {
          employees: true,
          shifts: {
            where: {
              startDate: {
                lte: endDate,
                gte: startDate,
              },
            },
          },
        },
      });

      if (!store) {
        return null;
      }

      const shifts = store.shifts;
      const shiftsByEmployee: ShiftsByEmployee = {};
      for (const shift of shifts) {
        const { employeeId, startDate } = shift;
        const dayOfWeek = getDay(startDate);
        if (!(employeeId in shiftsByEmployee)) {
          shiftsByEmployee[employeeId] = {};
        }

        const shiftsByDay = shiftsByEmployee[employeeId];
        if (!shiftsByDay) {
          continue;
        }
        if (!(dayOfWeek in shiftsByDay)) {
          shiftsByDay[dayOfWeek] = shift;
        }
      }

      return { store, shifts: shiftsByEmployee };
    }),
});

type ShiftsByEmployee = {
  [key: string]: {
    [index: string]: Shift;
  };
};
