-- CreateTable
CREATE TABLE "Note" (
    "nid" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "text" TEXT,
    "createdAt" INTEGER NOT NULL,
    "updatedAt" INTEGER NOT NULL,
    "intro" TEXT,
    "status" REAL NOT NULL,
    "author" TEXT,
    "attachment" TEXT,
    "onlineSyncAt" INTEGER
);
