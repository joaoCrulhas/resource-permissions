-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_resource_sharing_scope" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "resourceSharingId" INTEGER NOT NULL,
    "resourceSharingScope" TEXT NOT NULL,
    CONSTRAINT "resource_sharing_scope_resourceSharingId_fkey" FOREIGN KEY ("resourceSharingId") REFERENCES "resource_sharing" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_resource_sharing_scope" ("id", "resourceSharingId", "resourceSharingScope") SELECT "id", "resourceSharingId", "resourceSharingScope" FROM "resource_sharing_scope";
DROP TABLE "resource_sharing_scope";
ALTER TABLE "new_resource_sharing_scope" RENAME TO "resource_sharing_scope";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
