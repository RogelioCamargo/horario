/*
  Warnings:

  - The `startOfWeekIndex` column on the `Store` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "DayOfWeek" AS ENUM ('SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY');

-- AlterTable
ALTER TABLE "Store" DROP COLUMN "startOfWeekIndex",
ADD COLUMN     "startOfWeekIndex" "DayOfWeek" NOT NULL DEFAULT 'TUESDAY';
