-- CreateTable
CREATE TABLE "note_list" (
    "nid" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "intro" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "author" TEXT NOT NULL,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE INDEX "note_list_author_idx" ON "note_list"("author");

-- CreateIndex
CREATE INDEX "note_list_nid_idx" ON "note_list"("nid");
