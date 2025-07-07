-- CreateTable
CREATE TABLE "resource_group" (
    "resource_id" INTEGER NOT NULL,
    "group_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,

    PRIMARY KEY ("resource_id", "group_id"),
    CONSTRAINT "resource_group_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "resource" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "resource_group_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "group" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "resource_user" (
    "resource_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,

    PRIMARY KEY ("resource_id", "user_id"),
    CONSTRAINT "resource_user_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "resource" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "resource_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
