/*
  Warnings:

  - You are about to drop the column `groupId` on the `artists` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "artists" DROP CONSTRAINT "artists_groupId_fkey";

-- DropIndex
DROP INDEX "artists_name_groupId_key";

-- AlterTable
ALTER TABLE "artists" DROP COLUMN "groupId";

-- CreateTable
CREATE TABLE "group_artists" (
    "artistId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,

    CONSTRAINT "group_artists_pkey" PRIMARY KEY ("artistId","groupId")
);

-- AddForeignKey
ALTER TABLE "group_artists" ADD CONSTRAINT "group_artists_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_artists" ADD CONSTRAINT "group_artists_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
