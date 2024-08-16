-- CreateTable
CREATE TABLE "Cart" (
    "productId" INTEGER NOT NULL,
    "productName" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "userName" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Cart_productId_userId_key" ON "Cart"("productId", "userId");

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
