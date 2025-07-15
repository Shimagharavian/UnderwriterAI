import { type NextRequest, NextResponse } from "next/server"

// Mock database
const submissions = [
  {
    id: "SUB-2024-001",
    applicantName: "John Smith",
    dateOfBirth: "1985-03-15",
    occupation: "Software Engineer",
    smoker: false,
    medicalConditions: ["Hypertension"],
    coverageAmount: 500000,
    insuranceType: "Life Insurance",
    submittedAt: "2024-01-15T10:30:00Z",
    status: "pending",
    documents: 3,
    riskScore: 75,
  },
  {
    id: "SUB-2024-002",
    applicantName: "Sarah Johnson",
    dateOfBirth: "1990-07-22",
    occupation: "Teacher",
    smoker: false,
    medicalConditions: [],
    coverageAmount: 250000,
    insuranceType: "Health Insurance",
    submittedAt: "2024-01-15T09:15:00Z",
    status: "approved",
    documents: 2,
    riskScore: 45,
  },
]

export async function GET() {
  return NextResponse.json({ submissions })
}

export async function POST(request: NextRequest) {
  const body = await request.json()

  // Generate new submission ID
  const newId = `SUB-2024-${String(submissions.length + 1).padStart(3, "0")}`

  const newSubmission = {
    id: newId,
    ...body,
    submittedAt: new Date().toISOString(),
    status: "pending",
  }

  submissions.push(newSubmission)

  return NextResponse.json({ submission: newSubmission }, { status: 201 })
}
