/*
  Warnings:

  - You are about to drop the column `rarityId` on the `cardsets` table. All the data in the column will be lost.
  - You are about to drop the `rarity` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `rarity` to the `cardsets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "cardsets" DROP CONSTRAINT "cardsets_rarityId_fkey";

-- AlterTable
ALTER TABLE "cardsets" DROP COLUMN "rarityId",
ADD COLUMN     "rarity" INTEGER NOT NULL;

-- DropTable
DROP TABLE "rarity";
