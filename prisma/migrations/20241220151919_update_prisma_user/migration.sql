/*
  Warnings:

  - You are about to drop the column `file` on the `SPK` table. All the data in the column will be lost.
  - Added the required column `materialId` to the `SPK` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantityOrder` to the `SPK` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('FREE', 'OFF', 'ON_DUTY');

-- AlterTable
ALTER TABLE "SPK" DROP COLUMN "file",
ADD COLUMN     "materialId" INTEGER NOT NULL,
ADD COLUMN     "quantityOrder" INTEGER NOT NULL,
ALTER COLUMN "tanggal_pengajuan" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'FREE';

-- AddForeignKey
ALTER TABLE "SPK" ADD CONSTRAINT "SPK_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "Material"("materialId") ON DELETE RESTRICT ON UPDATE CASCADE;
