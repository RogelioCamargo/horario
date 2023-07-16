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
import { addDays, format } from "date-fns";
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
} from "~/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { UserNav } from "~/components/user-nav";
import { cn } from "~/lib/utils";
import { DateRange } from "react-day-picker";

const shifts = [
  {
    id: 1,
    employee: "Camargo, Juan",
    paymentStatus: "7AM - 3PM",
    totalAmount: "7AM - 3PM",
    paymentMethod: "7AM - 3PM",
  },
  {
    id: 2,
    employee: "Isidoro, Ana",
    paymentStatus: "7AM - 3PM",
    totalAmount: "7AM - 3PM",
    paymentMethod: "7AM - 3PM",
  },
  {
    id: 3,
    employee: "Sanchez, Leyla",
    paymentStatus: "3PM - 10PM",
    totalAmount: "3PM - 10PM",
    paymentMethod: "3PM - 10PM",
  },
  {
    id: 4,
    employee: "T, Alejandra",
    paymentStatus: "3PM - 10PM",
    totalAmount: "3PM - 10PM",
    paymentMethod: "3PM - 10PM",
  },
];

export default function Home() {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 7),
  });

  return (
    <>
      <Head>
        <title>Horario</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="flex flex-col">
          <div className="border-b">
            <div className="container flex h-16 items-center px-4">
              <TeamSwitcher />
              <MainNav className="mx-6" />
              <div className="ml-auto flex items-center space-x-4">
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
                  <div className="flex gap-1 items-center">
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Go to previous page</span>
                      <ChevronLeftIcon className="h-4 w-4" />
                    </Button>
                    <div className="grid gap-2">
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
                    <Button variant="ghost" className="h-8 w-8 p-0">
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
                  <TableCaption>
                    Modify the shifts for the specified employees by adding or
                    removing them.
                  </TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px] text-left">
                        Employee
                      </TableHead>
                      <TableHead>{new Date().toDateString()}</TableHead>
                      <TableHead>{new Date().toDateString()}</TableHead>
                      <TableHead>{new Date().toDateString()}</TableHead>
                      <TableHead>{new Date().toDateString()}</TableHead>
                      <TableHead>{new Date().toDateString()}</TableHead>
                      <TableHead>{new Date().toDateString()}</TableHead>
                      <TableHead>{new Date().toDateString()}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {shifts.map((shift) => (
                      <TableRow key={shift.id}>
                        <TableCell className="text-left font-medium">
                          {shift.employee}
                        </TableCell>
                        <TableCell>{shift.paymentStatus}</TableCell>
                        <TableCell>{shift.paymentMethod}</TableCell>
                        <TableCell>{shift.totalAmount}</TableCell>
                        <TableCell>{shift.paymentStatus}</TableCell>
                        <TableCell>{shift.paymentMethod}</TableCell>
                        <TableCell>{shift.totalAmount}</TableCell>
                        <TableCell>{shift.totalAmount}</TableCell>
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
