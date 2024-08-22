/*
  Warnings:

  - You are about to drop the column `productImage` on the `Cart` table. All the data in the column will be lost.
  - Added the required column `productImageLink` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "productImage",
ADD COLUMN     "productImageLink" TEXT NOT NULL,
ALTER COLUMN "pQuantity" SET DEFAULT 1;
