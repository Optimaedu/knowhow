/*
  Warnings:

  - You are about to drop the column `language` on the `submission` table. All the data in the column will be lost.
  - Added the required column `passed` to the `submission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "submission" DROP COLUMN "language",
ADD COLUMN     "passed" BOOLEAN NOT NULL;
