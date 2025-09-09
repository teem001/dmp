"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { SecurityDashboard } from "@/components/security/security-dashboard"
import { VulnerabilityReport } from "@/components/security/vulnerability-report"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, FileText, AlertTriangle, CheckCircle } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"

export default function SecurityPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleReportSubmit = (report: any) => {
    console.log("Security report submitted:", report)
    setShowSuccess(true)
    setActiveTab("dashboard")

    // Hide success message after 5 seconds
    setTimeout(() => setShowSuccess(false), 5000)
  }

  if (!user) {
    return <div>Please log in to access this page.</div>
  }

  // Only show security page for IT Security role
  if (user.role !== "it-security") {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="p-6">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Access Restricted</CardTitle>
                <CardDescription>
                  This page is only available to IT Security team members. Your current role is: {user.role}
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Page Header */}
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-balance">Security Assessment Center</h2>
            <p className="text-muted-foreground text-pretty">
              Manage security scans, vulnerability assessments, and generate security reports
            </p>
          </div>

          {/* Success Message */}
          {showSuccess && (
            <Card className="border-green-200 bg-green-50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-800">Security Report Submitted!</p>
                    <p className="text-sm text-green-700">
                      The security assessment report has been submitted and stakeholders have been notified.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Main Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="dashboard" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Security Queue
              </TabsTrigger>
              <TabsTrigger value="report" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Vulnerability Report
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Security Analytics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
              <SecurityDashboard />
            </TabsContent>

            <TabsContent value="report" className="space-y-6">
              <VulnerabilityReport
                ticketId="REM-2024-001"
                projectName="Project Alpha"
                version="v2.1.0"
                onReportSubmit={handleReportSubmit}
              />
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Security Analytics</CardTitle>
                  <CardDescription>Security trends and metrics across all projects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <AlertTriangle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>Security analytics dashboard coming soon</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
