import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, Clock, AlertTriangle, Eye, Search, Filter, User } from "lucide-react"
import Link from "next/link"

export default function ReviewQueue() {
  const queueItems = [
    {
      id: "SUB-2024-001",
      applicant: "John Smith",
      type: "Life Insurance",
      riskScore: 75,
      priority: "medium",
      assignedTo: "You",
      timeInQueue: "2h 15m",
      dueDate: "Today, 5:00 PM",
      status: "pending_review",
      aiRecommendation: "Manual Review",
    },
    {
      id: "SUB-2024-003",
      applicant: "Michael Brown",
      type: "Life Insurance",
      riskScore: 85,
      priority: "high",
      assignedTo: "You",
      timeInQueue: "4h 32m",
      dueDate: "Today, 3:00 PM",
      status: "overdue",
      aiRecommendation: "Decline",
    },
    {
      id: "SUB-2024-008",
      applicant: "Lisa Anderson",
      type: "Health Insurance",
      riskScore: 68,
      priority: "medium",
      assignedTo: "Sarah Wilson",
      timeInQueue: "1h 45m",
      dueDate: "Tomorrow, 10:00 AM",
      status: "in_progress",
      aiRecommendation: "Manual Review",
    },
    {
      id: "SUB-2024-012",
      applicant: "David Thompson",
      type: "Disability Insurance",
      riskScore: 55,
      priority: "low",
      assignedTo: "You",
      timeInQueue: "30m",
      dueDate: "Tomorrow, 2:00 PM",
      status: "pending_review",
      aiRecommendation: "Approve",
    },
    {
      id: "SUB-2024-015",
      applicant: "Emma Martinez",
      type: "Life Insurance",
      riskScore: 72,
      priority: "medium",
      assignedTo: "Mike Johnson",
      timeInQueue: "3h 20m",
      dueDate: "Today, 4:30 PM",
      status: "pending_review",
      aiRecommendation: "Manual Review",
    },
  ]

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">High Priority</Badge>
      case "medium":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Medium</Badge>
      case "low":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Low</Badge>
      default:
        return <Badge variant="secondary">{priority}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending_review":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Pending Review</Badge>
      case "in_progress":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">In Progress</Badge>
      case "overdue":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Overdue</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getRiskColor = (score: number) => {
    if (score >= 80) return "text-red-600 bg-red-50"
    if (score >= 70) return "text-orange-600 bg-orange-50"
    if (score >= 60) return "text-yellow-600 bg-yellow-50"
    return "text-green-600 bg-green-50"
  }

  const getRecommendationIcon = (recommendation: string) => {
    switch (recommendation) {
      case "Approve":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "Decline":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case "Manual Review":
        return <Clock className="h-4 w-4 text-orange-600" />
      default:
        return <Clock className="h-4 w-4 text-slate-600" />
    }
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Review Queue</h1>
          <p className="text-slate-600">Applications awaiting underwriter decisions</p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Items</SelectItem>
              <SelectItem value="pending">Pending Review</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="priority">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="priority">Priority</SelectItem>
              <SelectItem value="time">Time in Queue</SelectItem>
              <SelectItem value="risk">Risk Score</SelectItem>
              <SelectItem value="due">Due Date</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Queue Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total in Queue</p>
                <p className="text-2xl font-bold text-slate-900">12</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Assigned to You</p>
                <p className="text-2xl font-bold text-slate-900">3</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <User className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Overdue</p>
                <p className="text-2xl font-bold text-red-600">1</p>
              </div>
              <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Avg Processing</p>
                <p className="text-2xl font-bold text-slate-900">2.4h</p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
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
              Advanced Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Review Queue List */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="text-slate-900">Review Queue</CardTitle>
          <CardDescription>{queueItems.length} applications awaiting review</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {queueItems.map((item) => (
              <div
                key={item.id}
                className={`border rounded-lg p-6 transition-colors hover:bg-slate-50 ${
                  item.status === "overdue" ? "border-red-200 bg-red-50" : "border-slate-200"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg font-semibold text-slate-900">{item.applicant}</h3>
                      {getPriorityBadge(item.priority)}
                      {getStatusBadge(item.status)}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-slate-900">ID:</span>
                        <span className="text-slate-600 ml-2">{item.id}</span>
                      </div>
                      <div>
                        <span className="font-medium text-slate-900">Type:</span>
                        <span className="text-slate-600 ml-2">{item.type}</span>
                      </div>
                      <div>
                        <span className="font-medium text-slate-900">Assigned:</span>
                        <span className="text-slate-600 ml-2">{item.assignedTo}</span>
                      </div>
                      <div>
                        <span className="font-medium text-slate-900">In Queue:</span>
                        <span className="text-slate-600 ml-2">{item.timeInQueue}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 mt-3 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-900">Risk Score:</span>
                        <div className={`px-2 py-1 rounded-full text-sm font-medium ${getRiskColor(item.riskScore)}`}>
                          {item.riskScore}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-900">AI Recommendation:</span>
                        <div className="flex items-center gap-1">
                          {getRecommendationIcon(item.aiRecommendation)}
                          <span className="text-slate-600">{item.aiRecommendation}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-900">Due:</span>
                        <span
                          className={`${item.status === "overdue" ? "text-red-600 font-medium" : "text-slate-600"}`}
                        >
                          {item.dueDate}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <Button
                      variant={item.assignedTo === "You" ? "default" : "outline"}
                      size="sm"
                      className={item.assignedTo === "You" ? "bg-blue-600 hover:bg-blue-700" : ""}
                      asChild
                    >
                      <Link href={`/submissions/${item.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        {item.assignedTo === "You" ? "Review Now" : "View"}
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
