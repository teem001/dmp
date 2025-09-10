"use client"

export const dynamic = "force-dynamic"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { CABDashboard } from "@/components/cab/cab-dashboard"
import { RequestReview } from "@/components/cab/request-review"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, FileText, Calendar, CheckCircle } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"

export default function CABPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [showSuccess, setShowSuccess] = useState(false)

  const handleApprovalDecision = (
      decision: "approved" | "rejected" | "on-hold",
      comments: string
  ) => {
    console.log("CAB decision submitted:", { decision, comments })
    setShowSuccess(true)
    setActiveTab("dashboard")

    // Hide success message after 5 seconds
    setTimeout(() => setShowSuccess(false), 5000)
  }

  if (!user) {
    return <div>Please log in to access this page.</div>
  }

  // Only show CAB page for CAB role
  if (user.role !== "cab") {
    return (
        <div className="min-h-screen bg-background">
          <Header />
          <main className="p-6">
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Access Restricted</CardTitle>
                  <CardDescription>
                    This page is only available to Change Advisory Board members. Your current role is: {user.role}
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
              <h2 className="text-3xl font-bold text-balance">Change Advisory Board</h2>
              <p className="text-muted-foreground text-pretty">
                Review and approve deployment requests to ensure controlled and safe changes to production systems
              </p>
            </div>

            {/* Success Message */}
            {showSuccess && (
                <Card className="border-green-200 bg-green-50">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-800">Decision Recorded!</p>
                        <p className="text-sm text-green-700">
                          Your CAB decision has been recorded and all stakeholders have been notified.
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
                  <Users className="h-4 w-4" />
                  CAB Dashboard
                </TabsTrigger>
                <TabsTrigger value="review" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Request Review
                </TabsTrigger>
                <TabsTrigger value="meetings" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  CAB Meetings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="dashboard" className="space-y-6">
                <CABDashboard />
              </TabsContent>

              <TabsContent value="review" className="space-y-6">
                <RequestReview requestId="CAB-2024-001" onApproval={handleApprovalDecision} />
              </TabsContent>

              <TabsContent value="meetings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>CAB Meetings</CardTitle>
                    <CardDescription>
                      Schedule and manage Change Advisory Board meetings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                      <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>CAB meeting management coming soon</p>
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
