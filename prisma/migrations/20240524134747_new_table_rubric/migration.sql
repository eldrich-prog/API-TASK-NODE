/*
  Warnings:

  - Added the required column `rubric_id` to the `Evaluation` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Evaluation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "rubric_id" INTEGER NOT NULL,
    "note" REAL NOT NULL,
    "task_id" INTEGER NOT NULL,
    "matriculation_id" INTEGER NOT NULL,
    "state_id" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Evaluation_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "Task" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Evaluation_matriculation_id_fkey" FOREIGN KEY ("matriculation_id") REFERENCES "Matriculation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Evaluation_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "State" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Evaluation_rubric_id_fkey" FOREIGN KEY ("rubric_id") REFERENCES "Rubric" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Evaluation" ("createdAt", "id", "matriculation_id", "note", "state_id", "task_id", "updatedAt") SELECT "createdAt", "id", "matriculation_id", "note", "state_id", "task_id", "updatedAt" FROM "Evaluation";
DROP TABLE "Evaluation";
ALTER TABLE "new_Evaluation" RENAME TO "Evaluation";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
