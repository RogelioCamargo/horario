import { DataTable } from "~/components/data-table";
import { Skeleton } from "~/components/ui/skeleton";
import { api } from "~/utils/api";
import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "~/components/ui/checkbox";
import { type Store } from "@prisma/client";
import { DataTableColumnHeader } from "~/components/data-table-column-header";
import { DataTableRowActions } from "~/components/data-table-row-actions";

export function StoreTable() {
  const { isLoading, data } = api.stores.getAll.useQuery();

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

  return <DataTable columns={storeColumns} data={data} />;
}

const storeColumns: ColumnDef<Store>[] = [
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
    accessorKey: "storeId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Store" />
    ),
    cell: ({ row }) => {
      const storeId: string = row.getValue("storeId");
      return <div className="w-[100px]">{`STORE-${storeId}`}</div>;
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
    accessorKey: "city",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="City" />
    ),
    cell: ({ row }) => {
      return (
        <div className="w-[120px] font-medium">{row.getValue("city")}</div>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "state",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="State" />
    ),
    cell: ({ row }) => {
      return (
        <div className="w-[80px] font-medium">{row.getValue("state")}</div>
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
