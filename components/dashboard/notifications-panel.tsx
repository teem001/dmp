"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, CheckCircle, AlertTriangle, Info, X } from "lucide-react"
import { useState } from "react"

interface Notification {
  id: string
  type: "success" | "warning" | "info" | "error"
  title: string
  message: string
  timestamp: string
  actionRequired?: boolean
  projectId?: string
}

const mockNotifications: Notification[] = [
  {
    id: "notif-001",
    type: "warning",
    title: "Security Scan Required",
    message: "Project Alpha requires security assessment before CAB review",
    timestamp: "10 minutes ago",
    actionRequired: true,
    projectId: "proj-001",
  },
  {
    id: "notif-002",
    type: "success",
    title: "Deployment Successful",
    message: "Project Gamma v3.0.1 has been successfully deployed to production",
    timestamp: "2 hours ago",
    actionRequired: false,
    projectId: "proj-003",
  },
  {
    id: "notif-003",
    type: "info",
    title: "CAB Meeting Scheduled",
    message: "Change Advisory Board meeting scheduled for tomorrow at 2:00 PM",
    timestamp: "4 hours ago",
    actionRequired: false,
  },
  {
    id: "notif-004",
    type: "error",
    title: "Build Failed",
    message: "Project Delta build failed during QA testing phase",
    timestamp: "6 hours ago",
    actionRequired: true,
    projectId: "proj-004",
  },
]

export function NotificationsPanel() {
  const [notifications, setNotifications] = useState(mockNotifications)

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      default:
        return <Info className="h-4 w-4 text-blue-600" />
    }
  }

  const getNotificationColor = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return "bg-green-100 text-green-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "error":
        return "bg-red-100 text-red-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  const dismissNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const actionRequiredCount = notifications.filter((n) => n.actionRequired).length

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
            {actionRequiredCount > 0 && (
              <Badge variant="destructive" className="text-xs">
                {actionRequiredCount} action required
              </Badge>
            )}
          </div>
        </div>
        <CardDescription>Recent updates and alerts from your workflow</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No new notifications</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border-l-4 ${
                  notification.actionRequired ? "bg-yellow-50 border-l-yellow-400" : "bg-card border-l-border"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-medium">{notification.title}</h4>
                        <Badge variant="secondary" className={`text-xs ${getNotificationColor(notification.type)}`}>
                          {notification.type}
                        </Badge>
                        {notification.actionRequired && (
                          <Badge variant="outline" className="text-xs">
                            Action Required
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                      <p className="text-xs text-muted-foreground">{notification.timestamp}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => dismissNotification(notification.id)}
                    className="h-6 w-6 p-0"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
