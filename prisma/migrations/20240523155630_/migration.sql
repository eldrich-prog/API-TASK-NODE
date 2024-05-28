-- CreateTable
CREATE TABLE "Rubric" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "porcentage" REAL NOT NULL,
    "task_type_id" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Rubric_task_type_id_fkey" FOREIGN KEY ("task_type_id") REFERENCES "Task_Type" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
