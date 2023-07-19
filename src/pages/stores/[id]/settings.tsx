import Head from "next/head";
import { MainNav } from "~/components/main-nav";
import { SidebarNav } from "~/components/sidebar-nav";
import TeamSwitcher from "~/components/team-switcher";
import { ThemeToggle } from "~/components/theme-toggle";
import { Separator } from "~/components/ui/separator";
import { UserNav } from "~/components/user-nav";
import { StoreDetailsForm } from "./_details-form";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { Skeleton } from "~/components/ui/skeleton";

export default function Settings() {
  // use router
  const router = useRouter();
  const storeId = router.query.id as string;
  const { isLoading, data: store } = api.stores.getStoreWithEmployees.useQuery({
    storeId,
  });

  if (isLoading) {
    return <Skeleton className="h-6 w-[150px]" />;
  }

  if (store == null) {
    return (
      <div className="pt-10 text-center text-lg">Failed to fetch data.</div>
    );
  }

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
              <TeamSwitcher currentStore={store} />
              <MainNav storeId={store.id} className="mx-6" />
              <div className="ml-auto flex items-center space-x-1">
                <ThemeToggle />
                <UserNav />
              </div>
            </div>
          </div>
          <div className="container flex-1 space-y-4 p-8 pt-6">
            <div className="space-y-0.5">
              <h2 className="text-3xl font-bold tracking-tight">
                Settings
              </h2>
              <p className="text-muted-foreground">
                Manage your store details and employees.
              </p>
            </div>
            <Separator className="my-6" />
            <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
              <aside className="-mx-4 lg:w-1/5">
                <SidebarNav
                  items={[
                    {
                      title: "Settings",
                      href: `/stores/${storeId}/settings`,
                    },
                    {
                      title: "Employees",
                      href: `/stores/${storeId}/employees`,
                    },
                  ]}
                />
              </aside>
              <div className="flex-1 lg:max-w-2xl">
                <StoreDetailsForm store={store} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
