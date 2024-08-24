/*
  Warnings:

  - Added the required column `productPrice` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cart" ADD COLUMN "productPrice" INTEGER NOT NULL DEFAULT 0;

