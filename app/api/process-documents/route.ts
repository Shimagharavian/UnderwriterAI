import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  // Simulate document processing delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Mock OCR/NLP extraction results
  const extractedData = {
    applicantName: "John Smith",
    dateOfBirth: "1985-03-15",
    occupation: "Software Engineer",
    smoker: false,
    medicalConditions: ["Hypertension"],
    coverageAmount: 500000,
    insuranceType: "Life Insurance",
    extractionConfidence: 0.92,
  }

  // Mock AI risk assessment
  const riskAssessment = {
    riskScore: 75,
    riskLevel: "Medium-High",
    factors: [
      { factor: "Age", impact: "Low", score: 20, description: "Applicant is 39 years old" },
      { factor: "Occupation", impact: "Low", score: 15, description: "Software Engineer - low risk occupation" },
      { factor: "Medical History", impact: "Medium", score: 40, description: "Hypertension requires monitoring" },
      { factor: "Lifestyle", impact: "Low", score: 0, description: "Non-smoker" },
    ],
    recommendation: "Manual review recommended due to medical history",
    confidence: 0.85,
    processingTime: "2.3 seconds",
  }

  return NextResponse.json({
    extractedData,
    riskAssessment,
    status: "success",
  })
}
