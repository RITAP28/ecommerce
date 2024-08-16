/*
  Warnings:

  - Added the required column `productDescription` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productImage` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cart" ADD COLUMN     "productDescription" TEXT NOT NULL,
ADD COLUMN     "productImage" TEXT NOT NULL;
