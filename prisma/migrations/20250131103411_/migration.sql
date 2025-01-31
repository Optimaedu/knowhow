/*
  Warnings:

  - The primary key for the `Challenge` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Challenge` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `challengeId` on the `submission` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "submission" DROP CONSTRAINT "submission_challengeId_fkey";

-- AlterTable
ALTER TABLE "Challenge" DROP CONSTRAINT "Challenge_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Challenge_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "submission" DROP COLUMN "challengeId",
ADD COLUMN     "challengeId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "submission_userId_challengeId_key" ON "submission"("userId", "challengeId");

-- AddForeignKey
ALTER TABLE "submission" ADD CONSTRAINT "submission_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE;
