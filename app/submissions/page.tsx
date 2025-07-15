import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Filter, Upload, Eye, Calendar } from "lucide-react"
import Link from "next/link"

export default function Submissions() {
  const submissions = [
    {
      id: "SUB-2024-001",
      applicant: "John Smith",
      type: "Life Insurance",
      riskScore: 75,
      status: "pending",
      submittedAt: "2024-01-15T10:30:00Z",
      documents: 3,
    },
    {
      id: "SUB-2024-002",
      applicant: "Sarah Johnson",
      type: "Health Insurance",
      riskScore: 45,
      status: "approved",
      submittedAt: "2024-01-15T09:15:00Z",
      documents: 2,
    },
    {
      id: "SUB-2024-003",
      applicant: "Michael Brown",
      type: "Life Insurance",
      riskScore: 85,
      status: "manual_review",
      submittedAt: "2024-01-15T08:45:00Z",
      documents: 4,
    },
    {
      id: "SUB-2024-004",
      applicant: "Emily Davis",
      type: "Disability Insurance",
      riskScore: 60,
      status: "pending",
      submittedAt: "2024-01-14T16:20:00Z",
      documents: 2,
    },
    {
      id: "SUB-2024-005",
      applicant: "Robert Wilson",
      type: "Life Insurance",
      riskScore: 35,
      status: "approved",
      submittedAt: "2024-01-14T14:10:00Z",
      documents: 3,
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Approved</Badge>
      case "pending":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Pending</Badge>
      case "manual_review":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Manual Review</Badge>
      case "declined":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Declined</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getRiskScoreColor = (score: number) => {
    if (score >= 80) return "text-red-600 bg-red-50"
    if (score >= 60) return "text-orange-600 bg-orange-50"
    return "text-green-600 bg-green-50"
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
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Submissions</h1>
          <p className="text-slate-600">Manage and review underwriting applications</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700" asChild>
          <Link href="/submissions/new">
            <Upload className="mr-2 h-4 w-4" />
            New Submission
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-6 border-slate-200">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input placeholder="Search by applicant name or submission ID..." className="pl-10" />
              </div>
            </div>
            <Button variant="outline" className="shrink-0 bg-transparent">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Submissions List */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="text-slate-900">All Submissions</CardTitle>
          <CardDescription>{submissions.length} total submissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {submissions.map((submission) => (
              <div
                key={submission.id}
                className="border border-slate-200 rounded-lg p-6 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg font-semibold text-slate-900">{submission.applicant}</h3>
                      {getStatusBadge(submission.status)}
                      <div
                        className={`px-2 py-1 rounded-full text-sm font-medium ${getRiskScoreColor(submission.riskScore)}`}
                      >
                        Risk: {submission.riskScore}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-900">ID:</span>
                        {submission.id}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-900">Type:</span>
                        {submission.type}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-900">Documents:</span>
                        {submission.documents}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-2 text-sm text-slate-500">
                      <Calendar className="h-4 w-4" />
                      Submitted {formatDate(submission.submittedAt)}
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/submissions/${submission.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        Review
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
