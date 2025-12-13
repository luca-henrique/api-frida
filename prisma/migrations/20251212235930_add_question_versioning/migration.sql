-- AlterTable
ALTER TABLE "RiskAssessmentAnswer" ADD COLUMN     "questionVersion" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "RiskQuestion" ADD COLUMN     "version" INTEGER NOT NULL DEFAULT 1;
