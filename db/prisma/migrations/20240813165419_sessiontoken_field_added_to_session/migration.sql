/*
  Warnings:

  - A unique constraint covering the columns `[sessionToken,userId]` on the table `Session` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sessionToken` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "sessionToken" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_userId_key" ON "Session"("sessionToken", "userId");
