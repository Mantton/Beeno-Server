/*
  Warnings:

  - You are about to drop the column `minted` on the `cardsets` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `cardsets` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "cardsets" DROP COLUMN "minted",
DROP COLUMN "title",
ADD COLUMN     "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
