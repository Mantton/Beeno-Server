-- CreateTable
CREATE TABLE "CardFavorite" (
    "cardId" INTEGER NOT NULL,
    "accountId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "CardFavorite_cardId_accountId_key" ON "CardFavorite"("cardId", "accountId");

-- AddForeignKey
ALTER TABLE "CardFavorite" ADD CONSTRAINT "CardFavorite_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardFavorite" ADD CONSTRAINT "CardFavorite_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "cards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
