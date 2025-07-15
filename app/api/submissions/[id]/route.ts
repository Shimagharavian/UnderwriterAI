import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  // Mock submission data
  const submission = {
    id: params.id,
    applicantName: "John Smith",
    dateOfBirth: "1985-03-15",
    occupation: "Software Engineer",
    smoker: false,
    medicalConditions: ["Hypertension"],
    coverageAmount: 500000,
    insuranceType: "Life Insurance",
    submittedAt: "2024-01-15T10:30:00Z",
    status: "pending",
    documents: [
      { name: "Application Form.pdf", type: "application", size: "2.3 MB" },
      { name: "Medical Report.pdf", type: "medical", size: "1.8 MB" },
      { name: "ID Document.jpg", type: "identification", size: "0.9 MB" },
    ],
    riskAssessment: {
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
    },
  }

  return NextResponse.json({ submission })
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const body = await request.json()

  // Mock updating submission
  const updatedSubmission = {
    id: params.id,
    ...body,
    updatedAt: new Date().toISOString(),
  }

  return NextResponse.json({ submission: updatedSubmission })
}
