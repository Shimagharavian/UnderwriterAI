"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Upload, FileText, X, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

export default function NewSubmission() {
  const [files, setFiles] = useState<File[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [extractedData, setExtractedData] = useState<any>(null)
  const [riskAssessment, setRiskAssessment] = useState<any>(null)
  const { toast } = useToast()
  const router = useRouter()

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || [])
    setFiles((prev) => [...prev, ...selectedFiles])
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const processDocuments = async () => {
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please upload at least one document to process.",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    // Simulate document processing
    setTimeout(() => {
      // Mock extracted data
      const mockExtractedData = {
        applicantName: "John Smith",
        dateOfBirth: "1985-03-15",
        occupation: "Software Engineer",
        smoker: false,
        medicalConditions: ["Hypertension"],
        coverageAmount: 500000,
        insuranceType: "Life Insurance",
      }

      // Mock risk assessment
      const mockRiskAssessment = {
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
      }

      setExtractedData(mockExtractedData)
      setRiskAssessment(mockRiskAssessment)
      setIsProcessing(false)

      toast({
        title: "Documents processed successfully",
        description: "AI analysis complete. Review the extracted data and risk assessment.",
      })
    }, 3000)
  }

  const submitForReview = async () => {
    // Simulate submission
    setTimeout(() => {
      toast({
        title: "Submission created successfully",
        description: "The application has been submitted for underwriter review.",
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

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">New Submission</h1>
        <p className="text-slate-600">Upload documents and process a new underwriting application</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Document Upload */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-900">Document Upload & Intake</CardTitle>
            <CardDescription>Upload application documents for AI processing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* File Upload Area */}
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
              <Upload className="mx-auto h-12 w-12 text-slate-400 mb-4" />
              <div className="space-y-2">
                <p className="text-lg font-medium text-slate-900">Drop files here or click to upload</p>
                <p className="text-sm text-slate-500">Supports PDF, Word documents, and images</p>
              </div>
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>

            {/* Uploaded Files */}
            {files.length > 0 && (
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-900">Uploaded Files</Label>
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-slate-500" />
                      <span className="text-sm text-slate-900">{file.name}</span>
                      <span className="text-xs text-slate-500">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      className="text-slate-500 hover:text-red-600"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <Button
              onClick={processDocuments}
              disabled={files.length === 0 || isProcessing}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing Documents...
                </>
              ) : (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Process Documents
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Extracted Data */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-900">Extracted Information</CardTitle>
            <CardDescription>AI-extracted data from uploaded documents</CardDescription>
          </CardHeader>
          <CardContent>
            {!extractedData ? (
              <div className="text-center py-8 text-slate-500">
                <FileText className="mx-auto h-12 w-12 mb-4 text-slate-300" />
                <p>Upload and process documents to see extracted data</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-slate-600">Applicant Name</Label>
                    <Input value={extractedData.applicantName} readOnly className="mt-1" />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-slate-600">Date of Birth</Label>
                    <Input value={extractedData.dateOfBirth} readOnly className="mt-1" />
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-slate-600">Occupation</Label>
                  <Input value={extractedData.occupation} readOnly className="mt-1" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-slate-600">Insurance Type</Label>
                    <Input value={extractedData.insuranceType} readOnly className="mt-1" />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-slate-600">Coverage Amount</Label>
                    <Input value={`$${extractedData.coverageAmount.toLocaleString()}`} readOnly className="mt-1" />
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-slate-600">Medical Conditions</Label>
                  <Input value={extractedData.medicalConditions.join(", ")} readOnly className="mt-1" />
                </div>

                <div className="flex items-center gap-2">
                  <Label className="text-sm font-medium text-slate-600">Smoker:</Label>
                  <span
                    className={`px-2 py-1 rounded text-sm ${extractedData.smoker ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}
                  >
                    {extractedData.smoker ? "Yes" : "No"}
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Risk Assessment */}
      {riskAssessment && (
        <Card className="mt-8 border-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-900">AI Risk Assessment</CardTitle>
            <CardDescription>Automated risk analysis and scoring</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Risk Score */}
              <div className="text-center">
                <div className="text-4xl font-bold text-slate-900 mb-2">{riskAssessment.riskScore}</div>
                <div
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(riskAssessment.riskLevel)}`}
                >
                  {riskAssessment.riskLevel} Risk
                </div>
                <div className="text-sm text-slate-500 mt-2">
                  Confidence: {(riskAssessment.confidence * 100).toFixed(0)}%
                </div>
              </div>

              {/* Risk Factors */}
              <div className="lg:col-span-2">
                <h4 className="font-medium text-slate-900 mb-4">Risk Factor Breakdown</h4>
                <div className="space-y-3">
                  {riskAssessment.factors.map((factor: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-medium text-slate-900">{factor.factor}</span>
                          <span className={`text-sm font-medium ${getImpactColor(factor.impact)}`}>
                            {factor.impact} Impact
                          </span>
                          <span className="text-sm text-slate-600">+{factor.score} points</span>
                        </div>
                        <p className="text-sm text-slate-600">{factor.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recommendation */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900 mb-1">AI Recommendation</h4>
                  <p className="text-blue-800">{riskAssessment.recommendation}</p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6 pt-6 border-t border-slate-200">
              <Button onClick={submitForReview} className="w-full bg-blue-600 hover:bg-blue-700">
                Submit for Underwriter Review
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
