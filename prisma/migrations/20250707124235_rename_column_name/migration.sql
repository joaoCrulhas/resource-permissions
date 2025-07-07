/*
  Warnings:

  - You are about to drop the column `global` on the `resource_user` table. All the data in the column will be lost.
  - You are about to drop the column `individual` on the `resource_user` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_resource_user" (
    "resource_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "is_individual" BOOLEAN NOT NULL DEFAULT false,
    "is_global" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("resource_id", "user_id"),
    CONSTRAINT "resource_user_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "resource" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "resource_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_resource_user" ("created_at", "resource_id", "updated_at", "user_id") SELECT "created_at", "resource_id", "updated_at", "user_id" FROM "resource_user";
DROP TABLE "resource_user";
ALTER TABLE "new_resource_user" RENAME TO "resource_user";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
