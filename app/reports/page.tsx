import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp, TrendingDown, Download, Calendar, Filter } from "lucide-react"

export default function Reports() {
  const metrics = [
    {
      title: "Total Applications",
      value: "1,247",
      change: "+12.5%",
      trend: "up",
      period: "This month",
    },
    {
      title: "Approval Rate",
      value: "78.3%",
      change: "+2.1%",
      trend: "up",
      period: "This month",
    },
    {
      title: "Average Processing Time",
      value: "2.4 days",
      change: "-0.3 days",
      trend: "down",
      period: "This month",
    },
    {
      title: "High Risk Applications",
      value: "156",
      change: "+8.2%",
      trend: "up",
      period: "This month",
    },
  ]

  const riskDistribution = [
    { risk: "Low Risk (0-40)", count: 487, percentage: 39.1, color: "bg-green-500" },
    { risk: "Medium Risk (41-70)", count: 604, percentage: 48.4, color: "bg-orange-500" },
    { risk: "High Risk (71-100)", count: 156, percentage: 12.5, color: "bg-red-500" },
  ]

  const recentReports = [
    {
      name: "Monthly Underwriting Summary",
      type: "Summary Report",
      generated: "2024-01-15",
      status: "Ready",
    },
    {
      name: "Risk Assessment Analysis",
      type: "Analytics Report",
      generated: "2024-01-14",
      status: "Ready",
    },
    {
      name: "Compliance Audit Trail",
      type: "Compliance Report",
      generated: "2024-01-13",
      status: "Ready",
    },
  ]

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Reports & Analytics</h1>
          <p className="text-slate-600">Comprehensive insights into underwriting performance</p>
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

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <Card key={index} className="border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">{metric.title}</CardTitle>
              {metric.trend === "up" ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-green-600" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{metric.value}</div>
              <p className="text-xs text-slate-500 mt-1">
                <span className={metric.trend === "up" ? "text-green-600" : "text-green-600"}>{metric.change}</span>{" "}
                {metric.period}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Risk Distribution */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-900">Risk Score Distribution</CardTitle>
            <CardDescription>Breakdown of applications by risk level</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {riskDistribution.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-900">{item.risk}</span>
                    <span className="text-slate-600">
                      {item.count} ({item.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className={`h-2 rounded-full ${item.color}`} style={{ width: `${item.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Processing Time Trends */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-900">Processing Time Trends</CardTitle>
            <CardDescription>Average time to decision over the last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-slate-500">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                <p>Chart visualization would be implemented here</p>
                <p className="text-sm">Using a charting library like Chart.js or Recharts</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Reports */}
      <Card className="border-slate-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-slate-900">Generated Reports</CardTitle>
              <CardDescription>Download and view recent reports</CardDescription>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">Generate New Report</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentReports.map((report, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-slate-900 mb-1">{report.name}</h4>
                  <div className="flex items-center gap-4 text-sm text-slate-600">
                    <span>{report.type}</span>
                    <span>Generated: {report.generated}</span>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{report.status}</Badge>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
