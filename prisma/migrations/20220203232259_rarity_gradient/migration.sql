/*
  Warnings:

  - You are about to drop the column `hex` on the `rarity` table. All the data in the column will be lost.
  - Added the required column `endHex` to the `rarity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startHex` to the `rarity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "rarity" DROP COLUMN "hex",
ADD COLUMN     "endHex" VARCHAR(6) NOT NULL,
ADD COLUMN     "startHex" VARCHAR(6) NOT NULL;
