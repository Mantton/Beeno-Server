-- AlterTable
ALTER TABLE "eras" ADD COLUMN     "imageId" INTEGER;

-- AddForeignKey
ALTER TABLE "eras" ADD CONSTRAINT "eras_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "images"("id") ON DELETE SET NULL ON UPDATE CASCADE;
