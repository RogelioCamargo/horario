import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DownloadIcon,
} from "lucide-react";
import Head from "next/head";
import React from "react";
import { MainNav } from "~/components/main-nav";
import TeamSwitcher from "~/components/team-switcher";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  addDays,
  compareAsc,
  eachDayOfInterval,
  format,
  formatISO,
  getDay,
  isToday,
  nextTuesday,
  subDays,
} from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/secondary-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { UserNav } from "~/components/user-nav";
import { cn } from "~/lib/utils";
import type { DateRange } from "react-day-picker";
import { ThemeToggle } from "~/components/theme-toggle";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { Skeleton } from "~/components/ui/skeleton";
import { ShiftForm } from "~/components/shift-form";
import { type Shift } from "@prisma/client";

export default function Store() {
  const router = useRouter();
  const storeId = router.query.id as string;

  const defaultEndDate = nextTuesday(new Date());
  const defaultStartDate = subDays(defaultEndDate, 6);
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: defaultStartDate,
    to: defaultEndDate,
  });

  const { isLoading, data } = api.stores.getStoreWithEmployees.useQuery({
    storeId,
    startDate: formatISO(defaultStartDate),
    endDate: formatISO(defaultEndDate),
  });
  const startOfWeekDate = date?.from || defaultStartDate;
  const endOfWeekDate = date?.to || defaultEndDate;

  const weekDates = eachDayOfInterval({
    start: startOfWeekDate,
    end: endOfWeekDate,
  });

  if (isLoading) {
    return (
      <div className="container space-y-3">
        <Skeleton className="mb-14 mt-5 h-8 w-full" />
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-8 w-[250px]" />
        <Skeleton className="h-8 w-[350px]" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </div>
    );
  }

  if (data == null) {
    return (
      <div className="pt-10 text-center text-lg">Failed to fetch data.</div>
    );
  }

  const { store, shifts } = data;

  if (store == null) {
    return (
      <div className="pt-10 text-center text-lg">Failed to fetch data.</div>
    );
  }
  console.log(shifts);
  return (
    <>
      <Head>
        <title>Horar.io</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="flex flex-col">
          <div className="border-b">
            <div className="container flex h-16 items-center px-4">
              <TeamSwitcher currentStore={store} />
              <MainNav storeId={store.id} className="mx-6" />
              <div className="ml-auto flex items-center space-x-1">
                <ThemeToggle />
                <UserNav />
              </div>
            </div>
          </div>
          <div className="container flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Schedule</h2>
            </div>
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="calendar" disabled>
                  Calendar
                </TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <div className="flex justify-between">
                  <div className="flex items-end gap-1 md:items-center">
                    <Button
                      variant="ghost"
                      className="h-8 w-8 p-0"
                      onClick={() => {
                        setDate({
                          from: subDays(startOfWeekDate, 7),
                          to: subDays(startOfWeekDate, 1),
                        });
                      }}
                    >
                      <span className="sr-only">Go to previous page</span>
                      <ChevronLeftIcon className="h-4 w-4" />
                    </Button>
                    <div className="hidden gap-2 md:grid">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id="date"
                            variant={"outline"}
                            className={cn(
                              "w-[300px] justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date?.from ? (
                              date.to ? (
                                <>
                                  {format(date.from, "LLL dd, y")} -{" "}
                                  {format(date.to, "LLL dd, y")}
                                </>
                              ) : (
                                format(date.from, "LLL dd, y")
                              )
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={date?.from}
                            selected={date}
                            onSelect={setDate}
                            numberOfMonths={2}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <Button
                      variant="ghost"
                      className="h-8 w-8 p-0"
                      onClick={() => {
                        setDate({
                          from: addDays(endOfWeekDate, 1),
                          to: addDays(endOfWeekDate, 7),
                        });
                      }}
                    >
                      <span className="sr-only">Go to next page</span>
                      <ChevronRightIcon className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button>
                    <DownloadIcon className="mr-3 h-4 w-4" />
                    Download
                  </Button>
                </div>
                <Table>
                  <TableCaption className="pb-5">
                    Modify the shifts for the specified employees by adding or
                    removing them.
                  </TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-left">
                        <div className="w-36">Employee</div>
                      </TableHead>
                      {weekDates.map((date) => (
                        <TableHead
                          className={
                            isToday(date)
                              ? "bg-secondary text-secondary-foreground"
                              : ""
                          }
                          key={date.toString()}
                        >
                          <div className="w-36">
                            {format(date, "iii LLL dd, y")}
                          </div>
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {store.employees?.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell className="text-left font-medium">
                          {employee.name}
                        </TableCell>
                        {weekDates.map((date) => {
                          const dayOfWeek = getDay(date);
                          const employeeShiftsByDay = shifts[employee.id] || {};

                          const employeeShifts: Shift[] =
                            employeeShiftsByDay[dayOfWeek] || [];
                          return (
                            <TableCell
                              key={date.valueOf()}
                              className="text-muted-foreground"
                            >
                              {employeeShifts.length == 0 ? (
                                <ShiftForm
                                  store={store}
                                  employee={employee}
                                  date={date}
                                />
                              ) : (
                                <>
                                  {employeeShifts
                                    .sort(function (a, b) {
                                      const key1 = a.startDate;
                                      const key2 = b.startDate;

                                      if (key1 < key2) {
                                        return -1;
                                      } else if (key1 == key2) {
                                        return 0;
                                      } else {
                                        return 1;
                                      }
                                    })
                                    .map((shift) => (
                                      <div key={shift.id} className="space-y-1">
                                        {format(shift.startDate, "h:mma")}-
                                        {format(shift.endDate, "h:mma")}
                                        {shift?.notes}
                                      </div>
                                    ))}
                                </>
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </>
  );
}
