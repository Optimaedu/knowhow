/*
  Warnings:

  - The primary key for the `Challenge` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "submission" DROP CONSTRAINT "submission_challengeId_fkey";

-- AlterTable
ALTER TABLE "Challenge" DROP CONSTRAINT "Challenge_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Challenge_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Challenge_id_seq";

-- AlterTable
ALTER TABLE "submission" ALTER COLUMN "challengeId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "submission" ADD CONSTRAINT "submission_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE;
