/*
  Warnings:

  - You are about to drop the `Submission` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Submission" DROP CONSTRAINT "Submission_challengeId_fkey";

-- DropForeignKey
ALTER TABLE "Submission" DROP CONSTRAINT "Submission_userId_fkey";

-- DropTable
DROP TABLE "Submission";

-- CreateTable
CREATE TABLE "submission" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "challengeId" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "submission_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "submission" ADD CONSTRAINT "submission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "submission" ADD CONSTRAINT "submission_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE;
