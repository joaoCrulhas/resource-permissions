/*
  Warnings:

  - You are about to drop the `resource_sharing` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `resource_sharing_scope` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "resource_sharing";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "resource_sharing_scope";
PRAGMA foreign_keys=on;
