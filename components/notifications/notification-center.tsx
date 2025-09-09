"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Mail, Check, X, Clock, AlertTriangle, Settings, Search } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"

interface Notification {
  id: string
  type: "email" | "system" | "alert"
  category: "security" | "approval" | "deployment" | "general"
  title: string
  message: string
  status: "sent" | "pending" | "failed" | "read" | "unread"
  priority: "low" | "medium" | "high" | "critical"
  recipient: string
  sender: string
  timestamp: string
  projectId?: string
  ticketId?: string
  actionRequired?: boolean
  emailTemplate?: string
}

const mockNotifications: Notification[] = [
  {
    id: "notif-001",
    type: "email",
    category: "security",
    title: "Security Assessment Required",
    message: "Project Alpha v2.1.0 requires security assessment. Ticket REM-2024-001 has been created.",
    status: "sent",
    priority: "high",
    recipient: "security-team@company.com",
    sender: "DMP System",
    timestamp: "2024-01-16T14:30:00Z",
    projectId: "proj-001",
    ticketId: "REM-2024-001",
    actionRequired: true,
    emailTemplate: "security-assessment-request",
  },
  {
    id: "notif-002",
    type: "email",
    category: "approval",
    title: "CAB Approval Required",
    message: "Project Beta v1.3.2 is ready for CAB review. All security scans are clean.",
    status: "sent",
    priority: "medium",
    recipient: "cab-board@company.com",
    sender: "DMP System",
    timestamp: "2024-01-16T11:20:00Z",
    projectId: "proj-002",
    actionRequired: true,
    emailTemplate: "cab-approval-request",
  },
  {
    id: "notif-003",
    type: "email",
    category: "deployment",
    title: "Deployment Approved - Ready for Release",
    message: "Project Gamma v3.0.1 has been approved by CAB and is ready for deployment.",
    status: "sent",
    priority: "high",
    recipient: "support-team@company.com",
    sender: "DMP System",
    timestamp: "2024-01-16T10:15:00Z",
    projectId: "proj-003",
    actionRequired: true,
    emailTemplate: "deployment-approved",
  },
  {
    id: "notif-004",
    type: "system",
    category: "security",
    title: "Vulnerabilities Found - Remediation Required",
    message: "Security scan for Project Delta v1.0.5 found 3 critical vulnerabilities. Developer notification sent.",
    status: "read",
    priority: "critical",
    recipient: "john.developer@company.com",
    sender: "DMP System",
    timestamp: "2024-01-15T16:45:00Z",
    projectId: "proj-004",
    ticketId: "REM-2024-004",
    actionRequired: true,
    emailTemplate: "vulnerability-remediation",
  },
  {
    id: "notif-005",
    type: "email",
    category: "deployment",
    title: "Deployment Successful",
    message: "Project Echo v2.0.0 has been successfully deployed to production. All stakeholders notified.",
    status: "sent",
    priority: "medium",
    recipient: "all-stakeholders@company.com",
    sender: "DMP System",
    timestamp: "2024-01-15T14:20:00Z",
    projectId: "proj-005",
    actionRequired: false,
    emailTemplate: "deployment-success",
  },
]

export function NotificationCenter() {
  const { user } = useAuth()
  const [notifications] = useState<Notification[]>(mockNotifications)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")

  const getTypeIcon = (type: Notification["type"]) => {
    switch (type) {
      case "email":
        return <Mail className="h-4 w-4 text-blue-600" />
      case "alert":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      default:
        return <Bell className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusIcon = (status: Notification["status"]) => {
    switch (status) {
      case "sent":
        return <Check className="h-4 w-4 text-green-600" />
      case "failed":
        return <X className="h-4 w-4 text-red-600" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "read":
        return <Check className="h-4 w-4 text-blue-600" />
      default:
        return <Bell className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: Notification["status"]) => {
    switch (status) {
      case "sent":
        return "bg-green-100 text-green-800"
      case "failed":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "read":
        return "bg-blue-100 text-blue-800"
      case "unread":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  const getPriorityColor = (priority: Notification["priority"]) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
    }
  }

  const getCategoryColor = (category: Notification["category"]) => {
    switch (category) {
      case "security":
        return "bg-red-100 text-red-800"
      case "approval":
        return "bg-blue-100 text-blue-800"
      case "deployment":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.recipient.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = typeFilter === "all" || notification.type === typeFilter
    const matchesStatus = statusFilter === "all" || notification.status === statusFilter
    const matchesCategory = categoryFilter === "all" || notification.category === categoryFilter

    return matchesSearch && matchesType && matchesStatus && matchesCategory
  })

  const stats = {
    total: notifications.length,
    sent: notifications.filter((n) => n.status === "sent").length,
    pending: notifications.filter((n) => n.status === "pending").length,
    failed: notifications.filter((n) => n.status === "failed").length,
    actionRequired: notifications.filter((n) => n.actionRequired).length,
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Sent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.sent}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Failed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.failed}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Action Required</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.actionRequired}</div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Center
          </CardTitle>
          <CardDescription>Manage and track all system notifications and communications</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="system">System</SelectItem>
                <SelectItem value="alert">Alert</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="read">Read</SelectItem>
                <SelectItem value="unread">Unread</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-36">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="security">Security</SelectItem>
                <SelectItem value="approval">Approval</SelectItem>
                <SelectItem value="deployment">Deployment</SelectItem>
                <SelectItem value="general">General</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Notifications List */}
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border ${
                  notification.actionRequired ? "border-l-4 border-l-orange-400 bg-orange-50" : "bg-card"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    {getTypeIcon(notification.type)}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm font-medium">{notification.title}</h4>
                        <Badge className={getCategoryColor(notification.category)} variant="secondary">
                          {notification.category}
                        </Badge>
                        <Badge className={getPriorityColor(notification.priority)} variant="secondary">
                          {notification.priority}
                        </Badge>
                        {notification.actionRequired && (
                          <Badge variant="outline" className="text-xs">
                            Action Required
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>To: {notification.recipient}</span>
                        <span>•</span>
                        <span>{formatDate(notification.timestamp)}</span>
                        {notification.ticketId && (
                          <>
                            <span>•</span>
                            <span>Ticket: {notification.ticketId}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`${getStatusColor(notification.status)} flex items-center gap-1`}>
                      {getStatusIcon(notification.status)}
                      {notification.status}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Settings className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredNotifications.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No notifications found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
