import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Clock, CheckCircle, AlertTriangle, Activity, Upload } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  const stats = [
    {
      title: "Total Submissions",
      value: "247",
      change: "+12%",
      icon: FileText,
      color: "text-blue-600",
    },
    {
      title: "Pending Review",
      value: "18",
      change: "-5%",
      icon: Clock,
      color: "text-orange-600",
    },
    {
      title: "Approved Today",
      value: "34",
      change: "+8%",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      title: "High Risk Flagged",
      value: "7",
      change: "+2%",
      icon: AlertTriangle,
      color: "text-red-600",
    },
  ]

  const recentSubmissions = [
    {
      id: "SUB-2024-001",
      applicant: "John Smith",
      type: "Life Insurance",
      riskScore: 75,
      status: "pending",
      submittedAt: "2024-01-15T10:30:00Z",
    },
    {
      id: "SUB-2024-002",
      applicant: "Sarah Johnson",
      type: "Health Insurance",
      riskScore: 45,
      status: "approved",
      submittedAt: "2024-01-15T09:15:00Z",
    },
    {
      id: "SUB-2024-003",
      applicant: "Michael Brown",
      type: "Life Insurance",
      riskScore: 85,
      status: "manual_review",
      submittedAt: "2024-01-15T08:45:00Z",
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
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getRiskScoreColor = (score: number) => {
    if (score >= 80) return "text-red-600"
    if (score >= 60) return "text-orange-600"
    return "text-green-600"
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard</h1>
        <p className="text-slate-600">Welcome to your underwriting command center</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
              <p className="text-xs text-slate-500 mt-1">
                <span className={stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}>{stat.change}</span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-slate-200 hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <Button className="w-full h-20 bg-blue-600 hover:bg-blue-700 text-lg font-semibold" asChild>
              <Link href="/submissions">
                <div className="flex flex-col items-center gap-2">
                  <FileText className="h-8 w-8" />
                  <span>Submissions</span>
                </div>
              </Link>
            </Button>
            <div className="mt-4 text-center">
              <p className="text-sm text-slate-600">Manage applications</p>
              <p className="text-xs text-slate-500 mt-1">18 pending review</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <Button className="w-full h-20 bg-orange-600 hover:bg-orange-700 text-lg font-semibold" asChild>
              <Link href="/risk-analysis">
                <div className="flex flex-col items-center gap-2">
                  <AlertTriangle className="h-8 w-8" />
                  <span>Risk</span>
                </div>
              </Link>
            </Button>
            <div className="mt-4 text-center">
              <p className="text-sm text-slate-600">Risk assessment</p>
              <p className="text-xs text-slate-500 mt-1">7 high-risk flagged</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <Button className="w-full h-20 bg-green-600 hover:bg-green-700 text-lg font-semibold" asChild>
              <Link href="/review-queue">
                <div className="flex flex-col items-center gap-2">
                  <CheckCircle className="h-8 w-8" />
                  <span>Review</span>
                </div>
              </Link>
            </Button>
            <div className="mt-4 text-center">
              <p className="text-sm text-slate-600">Review queue</p>
              <p className="text-xs text-slate-500 mt-1">12 awaiting decision</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border-slate-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Today's Submissions</p>
                <p className="text-2xl font-bold text-slate-900">12</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Upload className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-xs text-green-600">+3 from yesterday</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Avg Risk Score</p>
                <p className="text-2xl font-bold text-slate-900">68</p>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Activity className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-xs text-orange-600">Medium risk level</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Decisions Made</p>
                <p className="text-2xl font-bold text-slate-900">8</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-xs text-green-600">6 approved, 2 declined</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Processing Time</p>
                <p className="text-2xl font-bold text-slate-900">2.1h</p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-xs text-green-600">-0.3h improvement</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Submissions */}
        <Card className="lg:col-span-2 border-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-900">Recent Submissions</CardTitle>
            <CardDescription>Latest underwriting applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSubmissions.map((submission) => (
                <div
                  key={submission.id}
                  className="flex items-center justify-between p-4 border border-slate-200 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-medium text-slate-900">{submission.applicant}</h4>
                      {getStatusBadge(submission.status)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      <span>{submission.id}</span>
                      <span>{submission.type}</span>
                      <span className={`font-medium ${getRiskScoreColor(submission.riskScore)}`}>
                        Risk Score: {submission.riskScore}
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/submissions/${submission.id}`}>Review</Link>
                  </Button>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-slate-200">
              <Button variant="outline" className="w-full bg-transparent" asChild>
                <Link href="/submissions">View All Submissions</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
