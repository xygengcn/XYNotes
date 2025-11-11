-- CreateTable
CREATE TABLE "TaskQuadrant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "taskId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "quadrant" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "deadline" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" DATETIME,
    "author" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "TaskQuadrant_taskId_key" ON "TaskQuadrant"("taskId");

-- CreateIndex
CREATE INDEX "TaskQuadrant_author_idx" ON "TaskQuadrant"("author");

-- CreateIndex
CREATE INDEX "TaskQuadrant_quadrant_idx" ON "TaskQuadrant"("quadrant");

-- CreateIndex
CREATE INDEX "TaskQuadrant_status_idx" ON "TaskQuadrant"("status");
