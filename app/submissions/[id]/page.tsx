"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle, XCircle, AlertTriangle, FileText, User, Activity, MessageSquare } from "lucide-react"
import { useRouter } from "next/navigation"

export default function SubmissionDetail({ params }: { params: { id: string } }) {
  const [decision, setDecision] = useState<string>("")
  const [notes, setNotes] = useState<string>("")
  const { toast } = useToast()
  const router = useRouter()

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
    auditTrail: [
      {
        timestamp: "2024-01-15T10:30:00Z",
        action: "Submission created",
        user: "System",
        details: "Application submitted via web portal",
      },
      {
        timestamp: "2024-01-15T10:31:00Z",
        action: "Documents processed",
        user: "AI Engine",
        details: "OCR and data extraction completed",
      },
      {
        timestamp: "2024-01-15T10:32:00Z",
        action: "Risk assessment completed",
        user: "AI Engine",
        details: "Risk score: 75, Medium-High risk level",
      },
      {
        timestamp: "2024-01-15T10:33:00Z",
        action: "Assigned for review",
        user: "System",
        details: "Assigned to underwriter queue",
      },
    ],
  }

  const handleDecision = async (decisionType: string) => {
    if (!notes.trim()) {
      toast({
        title: "Notes required",
        description: "Please add notes explaining your decision.",
        variant: "destructive",
      })
      return
    }

    setDecision(decisionType)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Decision recorded",
        description: `Application has been ${decisionType.toLowerCase()}.`,
      })
      router.push("/submissions")
    }, 1000)
  }

  const getRiskColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "low":
        return "text-green-600 bg-green-50"
      case "medium":
        return "text-orange-600 bg-orange-50"
      case "medium-high":
        return "text-red-600 bg-red-50"
      case "high":
        return "text-red-700 bg-red-100"
      default:
        return "text-slate-600 bg-slate-50"
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact.toLowerCase()) {
      case "low":
        return "text-green-600"
      case "medium":
        return "text-orange-600"
      case "high":
        return "text-red-600"
      default:
        return "text-slate-600"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-CA", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Submission Review: {submission.id}</h1>
            <p className="text-slate-600">Underwriter decision panel for {submission.applicantName}</p>
          </div>
          <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Pending Review</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Applicant Information */}
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-900">
                <User className="h-5 w-5" />
                Applicant Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm font-medium text-slate-600">Full Name</Label>
                  <p className="text-slate-900 font-medium">{submission.applicantName}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-slate-600">Date of Birth</Label>
                  <p className="text-slate-900">{submission.dateOfBirth}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-slate-600">Occupation</Label>
                  <p className="text-slate-900">{submission.occupation}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-slate-600">Smoker Status</Label>
                  <span
                    className={`inline-block px-2 py-1 rounded text-sm ${submission.smoker ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}
                  >
                    {submission.smoker ? "Yes" : "No"}
                  </span>
                </div>
                <div>
                  <Label className="text-sm font-medium text-slate-600">Insurance Type</Label>
                  <p className="text-slate-900">{submission.insuranceType}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-slate-600">Coverage Amount</Label>
                  <p className="text-slate-900 font-medium">${submission.coverageAmount.toLocaleString()}</p>
                </div>
                <div className="col-span-2">
                  <Label className="text-sm font-medium text-slate-600">Medical Conditions</Label>
                  <p className="text-slate-900">{submission.medicalConditions.join(", ")}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Risk Assessment */}
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-900">
                <Activity className="h-5 w-5" />
                AI Risk Assessment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-slate-900 mb-2">{submission.riskAssessment.riskScore}</div>
                  <div
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(submission.riskAssessment.riskLevel)}`}
                  >
                    {submission.riskAssessment.riskLevel} Risk
                  </div>
                  <div className="text-sm text-slate-500 mt-2">
                    Confidence: {(submission.riskAssessment.confidence * 100).toFixed(0)}%
                  </div>
                </div>

                <div className="md:col-span-2">
                  <h4 className="font-medium text-slate-900 mb-3">Risk Factor Breakdown</h4>
                  <div className="space-y-2">
                    {submission.riskAssessment.factors.map((factor, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-slate-50 rounded">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 text-sm">
                            <span className="font-medium text-slate-900">{factor.factor}</span>
                            <span className={`font-medium ${getImpactColor(factor.impact)}`}>{factor.impact}</span>
                            <span className="text-slate-600">+{factor.score}</span>
                          </div>
                          <p className="text-xs text-slate-600 mt-1">{factor.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900 mb-1">AI Recommendation</h4>
                    <p className="text-blue-800">{submission.riskAssessment.recommendation}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-900">
                <FileText className="h-5 w-5" />
                Uploaded Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {submission.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-slate-500" />
                      <div>
                        <p className="font-medium text-slate-900">{doc.name}</p>
                        <p className="text-sm text-slate-500">
                          {doc.type} • {doc.size}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Decision Panel */}
        <div className="space-y-6">
          {/* Decision Actions */}
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-slate-900">Underwriter Decision</CardTitle>
              <CardDescription>Make your underwriting decision</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="notes" className="text-sm font-medium text-slate-900">
                  Decision Notes *
                </Label>
                <Textarea
                  id="notes"
                  placeholder="Explain your decision rationale..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="mt-2"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Button
                  onClick={() => handleDecision("APPROVED")}
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={!!decision}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Approve Application
                </Button>

                <Button
                  onClick={() => handleDecision("DECLINED")}
                  variant="destructive"
                  className="w-full"
                  disabled={!!decision}
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Decline Application
                </Button>

                <Button
                  onClick={() => handleDecision("MANUAL_REVIEW")}
                  variant="outline"
                  className="w-full"
                  disabled={!!decision}
                >
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Send for Manual Review
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Audit Trail */}
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-900">
                <MessageSquare className="h-5 w-5" />
                Audit Trail
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {submission.auditTrail.map((entry, index) => (
                  <div key={index} className="border-l-2 border-blue-200 pl-4 pb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-slate-900">{entry.action}</span>
                      <span className="text-xs text-slate-500">{entry.user}</span>
                    </div>
                    <p className="text-sm text-slate-600 mb-1">{entry.details}</p>
                    <p className="text-xs text-slate-500">{formatDate(entry.timestamp)}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
