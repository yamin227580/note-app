-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "companyName" TEXT NOT NULL,
    "siteName" TEXT NOT NULL,
    "siteAddress" TEXT NOT NULL,
    "totalPrice" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "email" TEXT,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Labor" (
    "id" SERIAL NOT NULL,
    "laborType" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "email" TEXT,

    CONSTRAINT "Labor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expense" (
    "id" SERIAL NOT NULL,
    "siteName" TEXT NOT NULL,
    "laborType" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "date" TEXT NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);
