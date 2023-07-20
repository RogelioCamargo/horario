import React from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { type Employee, type Store } from "@prisma/client";
import { Textarea } from "./ui/textarea";
import { format, getDate, getMonth, getYear } from "date-fns";
import { useUser } from "@clerk/nextjs";
import { api } from "~/utils/api";

// const defaultShift = {
//   startDate: null,
//   endDate: null,
//   notes: "",
// };

export function ShiftForm({
  store,
  employee,
  date,
}: {
  store: Store;
  employee: Employee;
  date: Date;
}) {
  const user = useUser();
  const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false);
  const [newShift, setNewShift] = React.useState({
    startDate: "",
    endDate: "",
    storeId: store.id,
    employeeId: employee.id,
    notes: "",
  });
  const { mutate, isLoading: isCreatingShift } =
    api.shifts.createShift.useMutation({
      onSuccess: () => {
        window.location.reload();
      },
    });

  console.log(newShift);

  return (
    <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
      <DialogTrigger>+ Shift</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add shift</DialogTitle>
          <DialogDescription>
            {employee.name} <br /> {format(date, "iii LLL dd, y")}
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start date</Label>
              <Input
                id="startDate"
                name="startDate"
                onChange={(e) =>
                  setNewShift({
                    ...newShift,
                    startDate: e.target.value,
                  })
                }
                value={newShift.startDate}
                type="time"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End date</Label>
              <Input
                id="endDate"
                name="endDate"
                onChange={(e) =>
                  setNewShift({
                    ...newShift,
                    endDate: e.target.value,
                  })
                }
                value={newShift.endDate}
                type="time"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Notes</Label>
              <Textarea
                onChange={(e) =>
                  setNewShift({
                    ...newShift,
                    notes: e.target.value,
                  })
                }
                value={newShift.notes}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setShowNewTeamDialog(false)}
            disabled={isCreatingShift}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="md: mb-3"
            disabled={isCreatingShift}
            onClick={(e) => {
              e.preventDefault();
              if (user.user == null) {
                return null;
              }
              if (newShift.startDate != "" && newShift.endDate != "") {
                const [startHour, startMinute] = newShift.startDate.split(":");
                const [endHour, endMinute] = newShift.endDate.split(":");
                const startDate = new Date(
                  getYear(date),
                  getMonth(date),
                  getDate(date),
                  Number(startHour),
                  Number(startMinute)
                );
                const endDate = new Date(
                  getYear(date),
                  getMonth(date),
                  getDate(date),
                  Number(endHour),
                  Number(endMinute)
                );
                mutate({
                  ...newShift,
                  startDate,
                  endDate,
                  userId: user.user.id,
                });
              }
            }}
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
