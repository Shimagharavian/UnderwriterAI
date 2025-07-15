import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, TrendingUp, TrendingDown, Eye, Filter, Calendar } from "lucide-react"
import Link from "next/link"

export default function RiskAnalysis() {
  const highRiskSubmissions = [
    {
      id: "SUB-2024-003",
      applicant: "Michael Brown",
      riskScore: 85,
      riskLevel: "High",
      primaryRisk: "Medical History",
      submittedAt: "2024-01-15T08:45:00Z",
      urgency: "high",
    },
    {
      id: "SUB-2024-007",
      applicant: "Jennifer Wilson",
      riskScore: 82,
      riskLevel: "High",
      primaryRisk: "Age + Occupation",
      submittedAt: "2024-01-14T15:20:00Z",
      urgency: "high",
    },
    {
      id: "SUB-2024-001",
      applicant: "John Smith",
      riskScore: 75,
      riskLevel: "Medium-High",
      primaryRisk: "Hypertension",
      submittedAt: "2024-01-15T10:30:00Z",
      urgency: "medium",
    },
    {
      id: "SUB-2024-009",
      applicant: "Robert Davis",
      riskScore: 78,
      riskLevel: "Medium-High",
      primaryRisk: "Smoking History",
      submittedAt: "2024-01-13T11:15:00Z",
      urgency: "medium",
    },
  ]

  const riskTrends = [
    {
      category: "Medical Conditions",
      count: 23,
      trend: "up",
      change: "+15%",
      avgScore: 78,
    },
    {
      category: "Age-Related Risk",
      count: 18,
      trend: "down",
      change: "-8%",
      avgScore: 72,
    },
    {
      category: "Occupation Risk",
      count: 12,
      trend: "up",
      change: "+22%",
      avgScore: 65,
    },
    {
      category: "Lifestyle Factors",
      count: 15,
      trend: "down",
      change: "-5%",
      avgScore: 58,
    },
  ]

  const getRiskColor = (score: number) => {
    if (score >= 80) return "text-red-600 bg-red-50 border-red-200"
    if (score >= 70) return "text-orange-600 bg-orange-50 border-orange-200"
    if (score >= 60) return "text-yellow-600 bg-yellow-50 border-yellow-200"
    return "text-green-600 bg-green-50 border-green-200"
  }

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case "high":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">High Priority</Badge>
      case "medium":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Medium Priority</Badge>
      default:
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Low Priority</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-CA", {
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
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Risk Analysis</h1>
          <p className="text-slate-600">Monitor and analyze risk patterns across submissions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Date Range
          </Button>
        </div>
      </div>

      {/* Risk Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-slate-600">High Risk Applications</h3>
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-2">7</div>
            <div className="flex items-center text-sm">
              <TrendingUp className="h-4 w-4 text-red-600 mr-1" />
              <span className="text-red-600">+2 from last week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-slate-600">Average Risk Score</h3>
              <div className="h-5 w-5 bg-orange-100 rounded flex items-center justify-center">
                <span className="text-xs font-bold text-orange-600">68</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-2">68.2</div>
            <div className="flex items-center text-sm">
              <TrendingDown className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-green-600">-2.1 from last week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-slate-600">Risk Threshold Breaches</h3>
              <div className="h-5 w-5 bg-red-100 rounded flex items-center justify-center">
                <span className="text-xs font-bold text-red-600">!</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-2">12</div>
            <div className="flex items-center text-sm">
              <TrendingUp className="h-4 w-4 text-red-600 mr-1" />
              <span className="text-red-600">+4 from last week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-slate-600">AI Confidence</h3>
              <div className="h-5 w-5 bg-blue-100 rounded flex items-center justify-center">
                <span className="text-xs font-bold text-blue-600">AI</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-2">87%</div>
            <div className="flex items-center text-sm">
              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-green-600">+3% from last week</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* High Risk Submissions */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-900">High Risk Submissions</CardTitle>
            <CardDescription>Applications requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {highRiskSubmissions.map((submission) => (
                <div
                  key={submission.id}
                  className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-slate-900">{submission.applicant}</h4>
                        {getUrgencyBadge(submission.urgency)}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <span>{submission.id}</span>
                        <span>Primary Risk: {submission.primaryRisk}</span>
                      </div>
                      <div className="text-xs text-slate-500 mt-1">Submitted {formatDate(submission.submittedAt)}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div
                        className={`px-3 py-1 rounded-full text-sm font-bold border ${getRiskColor(submission.riskScore)}`}
                      >
                        {submission.riskScore}
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/submissions/${submission.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          Review
                        </Link>
                      </Button>
                    </div>
                  </div>
                  <Progress value={submission.riskScore} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Risk Trends */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-900">Risk Category Trends</CardTitle>
            <CardDescription>Analysis of risk factors over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {riskTrends.map((trend, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <h4 className="font-medium text-slate-900">{trend.category}</h4>
                      <div className="flex items-center gap-1">
                        {trend.trend === "up" ? (
                          <TrendingUp className="h-4 w-4 text-red-600" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-green-600" />
                        )}
                        <span
                          className={`text-sm font-medium ${trend.trend === "up" ? "text-red-600" : "text-green-600"}`}
                        >
                          {trend.change}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-slate-900">{trend.count} cases</div>
                      <div className="text-xs text-slate-500">Avg: {trend.avgScore}</div>
                    </div>
                  </div>
                  <Progress value={trend.avgScore} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
