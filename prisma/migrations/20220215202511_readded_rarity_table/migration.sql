/*
  Warnings:

  - You are about to drop the column `rarity` on the `cardsets` table. All the data in the column will be lost.
  - Added the required column `rarityId` to the `cardsets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cardsets" DROP COLUMN "rarity",
ADD COLUMN     "rarityId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "rarities" (
    "id" SERIAL NOT NULL,
    "label" VARCHAR(20) NOT NULL,
    "points" INTEGER NOT NULL,

    CONSTRAINT "rarities_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cardsets" ADD CONSTRAINT "cardsets_rarityId_fkey" FOREIGN KEY ("rarityId") REFERENCES "rarities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
