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
import { format } from "date-fns";

export function ShiftForm({
  store,
  employee,
  date,
}: {
  store: Store;
  employee: Employee;
  date: Date;
}) {
  const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false);
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
              <Input id="startDate" name="startDate" type="time" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End date</Label>
              <Input id="endDate" name="endDate" type="time" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Notes</Label>
              <Textarea />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowNewTeamDialog(false)}>
            Cancel
          </Button>
          <Button type="submit" className="md: mb-3">
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
