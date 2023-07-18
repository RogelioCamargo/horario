import { DataTable } from "~/components/data-table";
import { storeColumns } from "~/components/store-columns";
import { Skeleton } from "~/components/ui/skeleton";
import { api } from "~/utils/api";

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
