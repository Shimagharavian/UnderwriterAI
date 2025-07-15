"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { User, Bell, Shield, Database, Save } from "lucide-react"

export default function Settings() {
  const [settings, setSettings] = useState({
    // User Settings
    name: "Demo User",
    email: "demo@underwriteai.com",
    role: "Senior Underwriter",

    // Notification Settings
    emailNotifications: true,
    riskAlerts: true,
    dailyReports: false,

    // AI Settings
    riskThreshold: "70",
    autoApprovalLimit: "100000",
    confidenceThreshold: "85",

    // System Settings
    language: "en",
    timezone: "America/Toronto",
    dataRetention: "7",
  })

  const { toast } = useToast()

  const handleSave = () => {
    // Simulate saving settings
    setTimeout(() => {
      toast({
        title: "Settings saved",
        description: "Your preferences have been updated successfully.",
      })
    }, 500)
  }

  const updateSetting = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Settings</h1>
        <p className="text-slate-600">Manage your account and system preferences</p>
      </div>

      <div className="space-y-6">
        {/* User Profile */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <User className="h-5 w-5" />
              User Profile
            </CardTitle>
            <CardDescription>Manage your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={settings.name}
                  onChange={(e) => updateSetting("name", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={settings.email}
                  onChange={(e) => updateSetting("email", e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <Select value={settings.role} onValueChange={(value) => updateSetting("role", value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Senior Underwriter">Senior Underwriter</SelectItem>
                  <SelectItem value="Junior Underwriter">Junior Underwriter</SelectItem>
                  <SelectItem value="Underwriting Manager">Underwriting Manager</SelectItem>
                  <SelectItem value="Risk Analyst">Risk Analyst</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription>Configure your notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium text-slate-900">Email Notifications</Label>
                <p className="text-sm text-slate-600">Receive email updates for important events</p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => updateSetting("emailNotifications", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium text-slate-900">High Risk Alerts</Label>
                <p className="text-sm text-slate-600">Get notified when high-risk applications are submitted</p>
              </div>
              <Switch
                checked={settings.riskAlerts}
                onCheckedChange={(checked) => updateSetting("riskAlerts", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium text-slate-900">Daily Reports</Label>
                <p className="text-sm text-slate-600">Receive daily summary reports via email</p>
              </div>
              <Switch
                checked={settings.dailyReports}
                onCheckedChange={(checked) => updateSetting("dailyReports", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* AI Configuration */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <Shield className="h-5 w-5" />
              AI Configuration
            </CardTitle>
            <CardDescription>Configure AI risk assessment parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="riskThreshold">Risk Score Threshold</Label>
                <Select value={settings.riskThreshold} onValueChange={(value) => updateSetting("riskThreshold", value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="60">60 - Low Threshold</SelectItem>
                    <SelectItem value="70">70 - Medium Threshold</SelectItem>
                    <SelectItem value="80">80 - High Threshold</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-slate-500 mt-1">Applications above this score require manual review</p>
              </div>
              <div>
                <Label htmlFor="autoApprovalLimit">Auto-Approval Limit (CAD)</Label>
                <Input
                  id="autoApprovalLimit"
                  value={settings.autoApprovalLimit}
                  onChange={(e) => updateSetting("autoApprovalLimit", e.target.value)}
                  className="mt-1"
                />
                <p className="text-xs text-slate-500 mt-1">Maximum coverage amount for automatic approval</p>
              </div>
            </div>
            <div>
              <Label htmlFor="confidenceThreshold">AI Confidence Threshold (%)</Label>
              <Input
                id="confidenceThreshold"
                value={settings.confidenceThreshold}
                onChange={(e) => updateSetting("confidenceThreshold", e.target.value)}
                className="mt-1"
              />
              <p className="text-xs text-slate-500 mt-1">Minimum confidence level required for AI recommendations</p>
            </div>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <Database className="h-5 w-5" />
              System Settings
            </CardTitle>
            <CardDescription>Configure system-wide preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="language">Language</Label>
                <Select value={settings.language} onValueChange={(value) => updateSetting("language", value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="timezone">Timezone</Label>
                <Select value={settings.timezone} onValueChange={(value) => updateSetting("timezone", value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="America/Toronto">Eastern Time (Toronto)</SelectItem>
                    <SelectItem value="America/Vancouver">Pacific Time (Vancouver)</SelectItem>
                    <SelectItem value="America/Winnipeg">Central Time (Winnipeg)</SelectItem>
                    <SelectItem value="America/Halifax">Atlantic Time (Halifax)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="dataRetention">Data Retention Period (years)</Label>
              <Select value={settings.dataRetention} onValueChange={(value) => updateSetting("dataRetention", value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 Years</SelectItem>
                  <SelectItem value="7">7 Years</SelectItem>
                  <SelectItem value="10">10 Years</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-slate-500 mt-1">Compliance with Canadian data retention requirements</p>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end pt-6 border-t border-slate-200">
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
            <Save className="mr-2 h-4 w-4" />
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  )
}
