import { type Employee } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "~/components/data-table";
import { DataTableColumnHeader } from "~/components/data-table-column-header";
import { DataTableRowActions } from "~/components/data-table-row-actions";
import { Checkbox } from "~/components/ui/checkbox";
import { Skeleton } from "~/components/ui/skeleton";
import { api } from "~/utils/api";

export function EmployeeTable() {
  const { isLoading, data } = api.employees.getAll.useQuery();

  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-8 w-[250px]" />
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

  return <DataTable columns={employeeColumns} data={data} />;
}

const employeeColumns: ColumnDef<Employee>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "employeeId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Employee" />
    ),
    cell: ({ row }) => {
      const employeeId: string = row.getValue("employeeId");
      return <div className="w-[120px]">{`EMPLOYEE-${employeeId}`}</div>;
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="max-w-[500px] truncate font-medium">
          {row.getValue("name")}
        </div>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
