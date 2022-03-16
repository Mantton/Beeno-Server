/*
  Warnings:

  - You are about to drop the column `imageId` on the `groups` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "groups" DROP CONSTRAINT "groups_imageId_fkey";

-- AlterTable
ALTER TABLE "groups" DROP COLUMN "imageId",
ADD COLUMN     "bannerImageId" INTEGER,
ADD COLUMN     "logoImageId" INTEGER;

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_bannerImageId_fkey" FOREIGN KEY ("bannerImageId") REFERENCES "images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_logoImageId_fkey" FOREIGN KEY ("logoImageId") REFERENCES "images"("id") ON DELETE SET NULL ON UPDATE CASCADE;
