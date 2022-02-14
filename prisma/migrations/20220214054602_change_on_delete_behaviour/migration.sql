-- DropForeignKey
ALTER TABLE "cardset_artists" DROP CONSTRAINT "cardset_artists_setId_fkey";

-- DropForeignKey
ALTER TABLE "cardsets" DROP CONSTRAINT "cardsets_collectionId_fkey";

-- DropForeignKey
ALTER TABLE "collections" DROP CONSTRAINT "collections_eraId_fkey";

-- AddForeignKey
ALTER TABLE "collections" ADD CONSTRAINT "collections_eraId_fkey" FOREIGN KEY ("eraId") REFERENCES "eras"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cardsets" ADD CONSTRAINT "cardsets_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "collections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cardset_artists" ADD CONSTRAINT "cardset_artists_setId_fkey" FOREIGN KEY ("setId") REFERENCES "cardsets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
