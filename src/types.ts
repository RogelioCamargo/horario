import { type Employee, type Store } from "@prisma/client";

export type StoreWithEmployees = Store & { employees: Employee[] };
