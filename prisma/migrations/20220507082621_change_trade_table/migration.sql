/*
  Warnings:

  - You are about to drop the column `status` on the `trade_offers` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `trade_offers` table. All the data in the column will be lost.
  - Added the required column `isLocked` to the `trade_offers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tradeStatus` to the `trade_offers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tradeType` to the `trade_offers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "trade_offers" DROP COLUMN "status",
DROP COLUMN "type",
ADD COLUMN     "isLocked" BOOLEAN NOT NULL,
ADD COLUMN     "tradeStatus" INTEGER NOT NULL,
ADD COLUMN     "tradeType" INTEGER NOT NULL,
ALTER COLUMN "convocationTimestamp" DROP NOT NULL;

-- CreateTable
CREATE TABLE "TradeType" (
    "id" SERIAL NOT NULL,
    "label" VARCHAR(15) NOT NULL,

    CONSTRAINT "TradeType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TradeStatus" (
    "id" SERIAL NOT NULL,
    "label" VARCHAR(15) NOT NULL,

    CONSTRAINT "TradeStatus_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "trade_offers" ADD CONSTRAINT "trade_offers_tradeType_fkey" FOREIGN KEY ("tradeType") REFERENCES "TradeType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trade_offers" ADD CONSTRAINT "trade_offers_tradeStatus_fkey" FOREIGN KEY ("tradeStatus") REFERENCES "TradeStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
