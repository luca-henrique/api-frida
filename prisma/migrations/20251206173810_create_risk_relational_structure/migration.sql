-- CreateTable
CREATE TABLE "RiskAssessmentAnswer" (
    "id" TEXT NOT NULL,
    "assessmentId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RiskAssessmentAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RiskAssessmentAnswer_assessmentId_questionId_key" ON "RiskAssessmentAnswer"("assessmentId", "questionId");

-- AddForeignKey
ALTER TABLE "RiskAssessmentAnswer" ADD CONSTRAINT "RiskAssessmentAnswer_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "RiskAssessment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RiskAssessmentAnswer" ADD CONSTRAINT "RiskAssessmentAnswer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "RiskQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
