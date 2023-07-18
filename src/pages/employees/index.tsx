import Head from "next/head";
import React from "react";
import { UserNav } from "~/components/user-nav";
import { ThemeToggle } from "~/components/theme-toggle";
import { DataTable } from "~/components/data-table";
import { employeeColumns } from "~/components/employee-columns";
import Link from "next/link";
import { api } from "~/utils/api";

export default function Employees() {
  const { isLoading, data } = api.employees.getAll.useQuery();

  if (isLoading) {
    return "Loading...";
  }

  if (data == null) {
    return "Error to load data.";
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
            <div className="container flex h-16 items-center px-8">
              <Link href="/" className="flex items-center text-lg font-medium">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-6 w-6"
                >
                  <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                </svg>
                Horar.io
              </Link>
              <div className="ml-auto flex items-center space-x-1">
                <ThemeToggle />
                <UserNav />
              </div>
            </div>
          </div>
          <div className="container flex-1 space-y-8 p-8 pt-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Employees</h2>
              <p className="text-muted-foreground">
                Select any of your employees to view their schedule or update
                their settings.
              </p>
            </div>
            <DataTable columns={employeeColumns} data={data} />
          </div>
        </div>
      </main>
    </>
  );
}
