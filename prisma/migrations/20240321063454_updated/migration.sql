-- CreateEnum
CREATE TYPE "ScrapType" AS ENUM ('Ledbatteries', 'Plastic', 'PETbottles');

-- CreateEnum
CREATE TYPE "PickupFrequency" AS ENUM ('one', 'three', 'seven');

-- CreateTable
CREATE TABLE "Core_Information" (
    "core_information_id" SERIAL NOT NULL,
    "pickup_address" TEXT NOT NULL,
    "scrap_type" "ScrapType" NOT NULL,
    "pickup_frequency" "PickupFrequency" NOT NULL,
    "businessProfileId" INTEGER NOT NULL,

    CONSTRAINT "Core_Information_pkey" PRIMARY KEY ("core_information_id")
);

-- AddForeignKey
ALTER TABLE "Core_Information" ADD CONSTRAINT "Core_Information_businessProfileId_fkey" FOREIGN KEY ("businessProfileId") REFERENCES "BusinessProfile"("business_profile_id") ON DELETE RESTRICT ON UPDATE CASCADE;
