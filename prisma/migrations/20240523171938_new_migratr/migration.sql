/*
  Warnings:

  - You are about to drop the column `percentage` on the `Task` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name_task" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "requirements" TEXT,
    "group_id" INTEGER,
    "task_type_id" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Task_task_type_id_fkey" FOREIGN KEY ("task_type_id") REFERENCES "Task_Type" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Task_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "Group" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Task" ("createdAt", "description", "group_id", "id", "name_task", "requirements", "task_type_id", "updatedAt") SELECT "createdAt", "description", "group_id", "id", "name_task", "requirements", "task_type_id", "updatedAt" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
