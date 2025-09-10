"use client"

import { useAuth } from "@/components/auth/auth-provider"
import { LoginForm } from "@/components/auth/login-form"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Upload, FileCheck, Shield, Rocket, CheckCircle, Clock, Activity, Bell } from "lucide-react"
import { WorkflowPipeline } from "@/components/dashboard/workflow-pipeline"
import { MetricsOverview } from "@/components/dashboard/metrics-overview"
import { NotificationsPanel } from "@/components/dashboard/notifications-panel"
import Link from "next/link"

function Dashboard() {
  const { user } = useAuth()

  const getWelcomeMessage = () => {
    const roleMessages = {
      developer: "Upload your tested code and track deployment progress",
      qa: "Generate test completion reports and monitor quality metrics",
      "project-manager": "Oversee project workflows and coordinate with teams",
      "it-security": "Perform security assessments and manage vulnerability reports",
      cab: "Review and approve deployment requests",
      support: "Deploy approved builds and manage production releases",
    }
    return roleMessages[user?.role as keyof typeof roleMessages] || "Welcome to the DMP Portal"
  }

  const getRoleActions = () => {
    const actions = {
      developer: [
        { icon: Upload, label: "Upload Code", description: "Submit tested code for review", href: "/upload" },
        { icon: Activity, label: "View Status", description: "Track deployment progress", href: "/notifications" },
      ],
      qa: [
        { icon: FileCheck, label: "Generate TCR", description: "Create test completion reports", href: "/qa" },
        { icon: Activity, label: "Quality Metrics", description: "View testing statistics", href: "/metrics" },
      ],
      "project-manager": [
        { icon: Activity, label: "Project Overview", description: "Monitor all active deployments", href: "/notifications" },
        { icon: Bell, label: "Notifications", description: "Manage system notifications", href: "/notifications" },
      ],
      "it-security": [
        { icon: Shield, label: "Security Scans", description: "Perform vulnerability assessments", href: "/security" },
        { icon: Bell, label: "Security Alerts", description: "Monitor security notifications", href: "/notifications" },
      ],
      cab: [
        { icon: CheckCircle, label: "Review Requests", description: "Approve deployment requests", href: "/cab" },
        { icon: Bell, label: "CAB Notifications", description: "Review approval notifications", href: "/notifications" },
      ],
      support: [
        { icon: Rocket, label: "Deploy Builds", description: "Execute approved deployments", href: "/deploy" },
        { icon: Activity, label: "Production Status", description: "Monitor live systems", href: "/production" },
      ],
    }
    return actions[user?.role as keyof typeof actions] || []
  }

  const mockStats = {
    developer: { pending: 3, approved: 12, deployed: 8 },
    qa: { reports: 15, passed: 12, failed: 3 },
    "project-manager": { active: 8, pending: 5, completed: 23 },
    "it-security": { scans: 6, vulnerabilities: 2, clean: 4 },
    cab: { requests: 4, approved: 15, rejected: 1 },
    support: { deployments: 7, successful: 6, failed: 1 },
  }

  const userStats = mockStats[user?.role as keyof typeof mockStats]

  return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Welcome Section */}
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-balance">Welcome back, {user?.name}</h2>
              <p className="text-muted-foreground text-pretty">{getWelcomeMessage()}</p>
            </div>

            <MetricsOverview />

            {/* Role-specific Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(userStats || {}).map(([key, value]) => (
                  <Card key={key}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium capitalize text-muted-foreground">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{value}</div>
                    </CardContent>
                  </Card>
              ))}
            </div>

            <WorkflowPipeline />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common tasks for your role</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-3">
                    {getRoleActions().map((action, index) => (
                        <Button key={index} variant="outline" className="h-auto p-4 justify-start bg-transparent" asChild>
                          <Link href={action.href || "#"}>
                            <action.icon className="mr-3 h-5 w-5" />
                            <div className="text-left">
                              <div className="font-medium">{action.label}</div>
                              <div className="text-sm text-muted-foreground">{action.description}</div>
                            </div>
                          </Link>
                        </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <NotificationsPanel />
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates in your workflow</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <div className="flex-1">
                      <p className="text-sm">Security scan completed for Project Alpha</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                    <Badge variant="secondary">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Clean
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                    <div className="flex-1">
                      <p className="text-sm">CAB approval pending for Project Beta</p>
                      <p className="text-xs text-muted-foreground">4 hours ago</p>
                    </div>
                    <Badge variant="outline">
                      <Clock className="mr-1 h-3 w-3" />
                      Pending
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <div className="flex-1">
                      <p className="text-sm">Deployment successful for Project Gamma</p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                    <Badge variant="secondary">
                      <Rocket className="mr-1 h-3 w-3" />
                      Deployed
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
  )
}

function AppContent() {
  const { isAuthenticated, login } = useAuth()

  if (!isAuthenticated) {
    return <LoginForm onLogin={login} />
  }

  return <Dashboard />
}

export default function CabPage() {
  return <AppContent />
}
