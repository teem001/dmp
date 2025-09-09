"use client"

import { Header } from "@/components/layout/header"
import { NotificationCenter } from "@/components/notifications/notification-center"
import { WorkflowStatus } from "@/components/status/workflow-status"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Activity, Settings } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"

export default function NotificationsPage() {
  const { user } = useAuth()

  if (!user) {
    return <div>Please log in to access this page.</div>
  }

  // Show different views based on role
  const canViewNotifications = ["project-manager", "it-security", "cab"].includes(user.role)

  if (!canViewNotifications) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="p-6">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Access Restricted</CardTitle>
                <CardDescription>
                  This page is only available to Project Managers, IT Security, and CAB members. Your current role is:{" "}
                  {user.role}
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
            <h2 className="text-3xl font-bold text-balance">Notifications & Status Tracking</h2>
            <p className="text-muted-foreground text-pretty">
              Monitor system notifications, workflow progress, and deployment pipeline status
            </p>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="notifications" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="status" className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Workflow Status
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="notifications" className="space-y-6">
              <NotificationCenter />
            </TabsContent>

            <TabsContent value="status" className="space-y-6">
              <WorkflowStatus />
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Configure notification preferences and delivery methods</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <Settings className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>Notification settings coming soon</p>
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
