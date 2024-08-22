/*
  Warnings:

  - Made the column `productImageLink` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
-- Step 1: Update existing NULL values to 'empty'
UPDATE "Product" 
SET "productImageLink" = 'empty' 
WHERE "productImageLink" IS NULL;

-- Step 2: Alter the column to NOT NULL and set the default
ALTER TABLE "Product" 
ALTER COLUMN "productImageLink" SET NOT NULL,
ALTER COLUMN "productImageLink" SET DEFAULT 'empty';

