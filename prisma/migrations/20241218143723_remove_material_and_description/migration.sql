-- CreateEnum
CREATE TYPE "Role" AS ENUM ('PH_OPERATOR', 'WH_OPERATOR');

-- CreateEnum
CREATE TYPE "StatusMaterial" AS ENUM ('AVAILABLE', 'UNAVAILABLE');

-- CreateEnum
CREATE TYPE "StatusSPK" AS ENUM ('PENDING', 'ON_PROCESS', 'DONE');

-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'WH_OPERATOR',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Material" (
    "materialId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "descriptions" TEXT,
    "quantity" INTEGER NOT NULL,
    "status" "StatusMaterial" NOT NULL DEFAULT 'UNAVAILABLE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Material_pkey" PRIMARY KEY ("materialId")
);

-- CreateTable
CREATE TABLE "SPK" (
    "spkId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "file" TEXT,
    "tanggal_pengajuan" TIMESTAMP(3) NOT NULL,
    "penerima" TEXT NOT NULL,
    "status" "StatusSPK" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SPK_pkey" PRIMARY KEY ("spkId")
);

-- CreateTable
CREATE TABLE "Notification" (
    "notifId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("notifId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Material_name_key" ON "Material"("name");

-- AddForeignKey
ALTER TABLE "SPK" ADD CONSTRAINT "SPK_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
