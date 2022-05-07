/*
  Warnings:

  - Added the required column `eraId` to the `cards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cards" ADD COLUMN     "eraId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_eraId_fkey" FOREIGN KEY ("eraId") REFERENCES "eras"("id") ON DELETE CASCADE ON UPDATE CASCADE;
