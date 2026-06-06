-- AlterTable
ALTER TABLE "ContactInquiry" 
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'NEW',
ADD COLUMN     "notes" TEXT;
