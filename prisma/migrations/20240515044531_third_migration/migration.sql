/*
  Warnings:

  - You are about to drop the column `description` on the `Evaluation` table. All the data in the column will be lost.
  - You are about to drop the column `grade` on the `Evaluation` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Evaluation` table. All the data in the column will be lost.
  - Made the column `admin_id` on table `Group` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `note` to the `Evaluation` table without a default value. This is not possible if the table is not empty.
  - Made the column `state_id` on table `Evaluation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `task_id` on table `Evaluation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_id` on table `Evaluation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `group_id` on table `Matriculation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `mat_user_id` on table `Matriculation` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Group" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "admin_id" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Group_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Group" ("admin_id", "createdAt", "id", "name", "updatedAt") SELECT "admin_id", "createdAt", "id", "name", "updatedAt" FROM "Group";
DROP TABLE "Group";
ALTER TABLE "new_Group" RENAME TO "Group";
CREATE TABLE "new_Evaluation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "note" REAL NOT NULL,
    "task_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "state_id" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Evaluation_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "Task" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Evaluation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Evaluation_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "State" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Evaluation" ("createdAt", "id", "state_id", "task_id", "updatedAt", "user_id") SELECT "createdAt", "id", "state_id", "task_id", "updatedAt", "user_id" FROM "Evaluation";
DROP TABLE "Evaluation";
ALTER TABLE "new_Evaluation" RENAME TO "Evaluation";
CREATE TABLE "new_Matriculation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "mat_user_id" INTEGER NOT NULL,
    "group_id" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Matriculation_mat_user_id_fkey" FOREIGN KEY ("mat_user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Matriculation_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "Group" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Matriculation" ("active", "createdAt", "group_id", "id", "mat_user_id", "updatedAt") SELECT "active", "createdAt", "group_id", "id", "mat_user_id", "updatedAt" FROM "Matriculation";
DROP TABLE "Matriculation";
ALTER TABLE "new_Matriculation" RENAME TO "Matriculation";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
