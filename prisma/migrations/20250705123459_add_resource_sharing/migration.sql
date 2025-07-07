/*
  Warnings:

  - You are about to drop the column `scope` on the `resource_sharing` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "resource_sharing_scope" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "resourceSharingId" INTEGER NOT NULL,
    "resourceSharingScope" TEXT NOT NULL,
    CONSTRAINT "resource_sharing_scope_resourceSharingId_fkey" FOREIGN KEY ("resourceSharingId") REFERENCES "resource_sharing" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_resource_sharing" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "resourceId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "groupId" INTEGER,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "resource_sharing_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "resource_sharing_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "group" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_resource_sharing" ("created_at", "groupId", "id", "resourceId", "updated_at", "userId") SELECT "created_at", "groupId", "id", "resourceId", "updated_at", "userId" FROM "resource_sharing";
DROP TABLE "resource_sharing";
ALTER TABLE "new_resource_sharing" RENAME TO "resource_sharing";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
