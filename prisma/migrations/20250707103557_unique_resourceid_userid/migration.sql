/*
  Warnings:

  - A unique constraint covering the columns `[resourceId,userId]` on the table `resource_sharing` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "resource_sharing_resourceId_userId_key" ON "resource_sharing"("resourceId", "userId");
