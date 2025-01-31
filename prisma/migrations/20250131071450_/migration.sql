/*
  Warnings:

  - A unique constraint covering the columns `[userId,challengeId]` on the table `submission` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "submission_userId_challengeId_key" ON "submission"("userId", "challengeId");
