-- AlterTable
ALTER TABLE "ContactInquiry" 
ADD COLUMN     "websitePlatforms" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "budgetRange" TEXT,
ADD COLUMN     "needDomain" BOOLEAN,
ADD COLUMN     "needHosting" BOOLEAN,
ADD COLUMN     "googleBusinessProfile" BOOLEAN,
ADD COLUMN     "instagramBusinessPage" BOOLEAN,
ADD COLUMN     "facebookBusinessPage" BOOLEAN,
ADD COLUMN     "primaryGoal" TEXT,
ADD COLUMN     "requiredPages" TEXT[] DEFAULT ARRAY[]::TEXT[];
