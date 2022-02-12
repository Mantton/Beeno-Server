/*
  Warnings:

  - You are about to drop the column `endHex` on the `rarity` table. All the data in the column will be lost.
  - You are about to drop the column `startHex` on the `rarity` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "rarity" DROP COLUMN "endHex",
DROP COLUMN "startHex";
