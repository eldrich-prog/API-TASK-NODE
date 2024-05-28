/*
  Warnings:

  - You are about to drop the column `user_id` on the `Evaluation` table. All the data in the column will be lost.
  - Added the required column `matriculation_id` to the `Evaluation` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Temperature" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "temperature" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Evaluation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "note" REAL NOT NULL,
    "task_id" INTEGER NOT NULL,
    "matriculation_id" INTEGER NOT NULL,
    "state_id" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Evaluation_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "Task" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Evaluation_matriculation_id_fkey" FOREIGN KEY ("matriculation_id") REFERENCES "Matriculation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Evaluation_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "State" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Evaluation" ("createdAt", "id", "note", "state_id", "task_id", "updatedAt") SELECT "createdAt", "id", "note", "state_id", "task_id", "updatedAt" FROM "Evaluation";
DROP TABLE "Evaluation";
ALTER TABLE "new_Evaluation" RENAME TO "Evaluation";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
