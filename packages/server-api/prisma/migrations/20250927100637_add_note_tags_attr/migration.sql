-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_note_list" (
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
    "updatedAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "tags" TEXT NOT NULL DEFAULT '[]'
);
INSERT INTO "new_note_list" ("author", "content", "createdAt", "intro", "nid", "order", "status", "text", "title", "type", "updatedAt") SELECT "author", "content", "createdAt", "intro", "nid", "order", "status", "text", "title", "type", "updatedAt" FROM "note_list";
DROP TABLE "note_list";
ALTER TABLE "new_note_list" RENAME TO "note_list";
CREATE INDEX "note_list_author_idx" ON "note_list"("author");
CREATE INDEX "note_list_nid_idx" ON "note_list"("nid");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
