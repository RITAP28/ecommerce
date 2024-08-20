/*
  Warnings:

  - A unique constraint covering the columns `[sessionToken,userId]` on the table `Session` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Session_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_userId_key" ON "Session"("sessionToken", "userId");
