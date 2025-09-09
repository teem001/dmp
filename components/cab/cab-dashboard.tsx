"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, Eye, Calendar, CheckCircle, Clock, XCircle, AlertTriangle, Users } from "lucide-react"

interface CABRequest {
  id: string
  requestId: string
  projectName: string
  version: string
  status: "pending-review" | "scheduled" | "approved" | "rejected" | "on-hold"
  priority: "low" | "medium" | "high" | "critical"
  submittedBy: string
  submittedAt: string
  scheduledMeeting?: string
  reviewedBy?: string
  reviewedAt?: string
  changeType: string
  businessImpact: string
  riskLevel: "low" | "medium" | "high" | "critical"
  hasCleanSecurity: boolean
  hasTestReport: boolean
  estimatedDowntime: string
  rollbackPlan: boolean
}

const mockCABRequests: CABRequest[] = [
  {
    id: "cab-001",
    requestId: "CAB-2024-001",
    projectName: "Project Alpha",
    version: "v2.1.0",
    status: "pending-review",
    priority: "high",
    submittedBy: "Project Manager",
    submittedAt: "2024-01-16T14:30:00Z",
    changeType: "Major Feature Release",
    businessImpact: "High - New customer-facing features",
    riskLevel: "medium",
    hasCleanSecurity: true,
    hasTestReport: true,
    estimatedDowntime: "2 hours",
    rollbackPlan: true,
  },
  {
    id: "cab-002",
    requestId: "CAB-2024-002",
    projectName: "Project Beta",
    version: "v1.3.2",
    status: "scheduled",
    priority: "medium",
    submittedBy: "Project Manager",
    submittedAt: "2024-01-15T11:20:00Z",
    scheduledMeeting: "2024-01-18T14:00:00Z",
    changeType: "Bug Fix",
    businessImpact: "Medium - Fixes user-reported issues",
    riskLevel: "low",
    hasCleanSecurity: true,
    hasTestReport: true,
    estimatedDowntime: "30 minutes",
    rollbackPlan: true,
  },
  {
    id: "cab-003",
    requestId: "CAB-2024-003",
    projectName: "Project Gamma",
    version: "v3.0.1",
    status: "approved",
    priority: "low",
    submittedBy: "Project Manager",
    submittedAt: "2024-01-14T09:15:00Z",
    reviewedBy: "CAB Board",
    reviewedAt: "2024-01-16T10:30:00Z",
    changeType: "Enhancement",
    businessImpact: "Low - Performance improvements",
    riskLevel: "low",
    hasCleanSecurity: true,
    hasTestReport: true,
    estimatedDowntime: "15 minutes",
    rollbackPlan: true,
  },
  {
    id: "cab-004",
    requestId: "CAB-2024-004",
    projectName: "Project Delta",
    version: "v1.0.5",
    status: "rejected",
    priority: "critical",
    submittedBy: "Project Manager",
    submittedAt: "2024-01-13T16:45:00Z",
    reviewedBy: "CAB Board",
    reviewedAt: "2024-01-15T13:20:00Z",
    changeType: "Hotfix",
    businessImpact: "Critical - Security vulnerability fix",
    riskLevel: "high",
    hasCleanSecurity: false,
    hasTestReport: true,
    estimatedDowntime: "1 hour",
    rollbackPlan: false,
  },
]

export function CABDashboard() {
  const [requests] = useState<CABRequest[]>(mockCABRequests)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")

  const getStatusIcon = (status: CABRequest["status"]) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "scheduled":
        return <Calendar className="h-4 w-4 text-blue-600" />
      case "on-hold":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: CABRequest["status"]) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "on-hold":
        return "bg-yellow-100 text-yellow-800"
      case "pending-review":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  const getPriorityColor = (priority: CABRequest["priority"]) => {
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

  const getRiskColor = (risk: CABRequest["riskLevel"]) => {
    switch (risk) {
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.requestId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.version.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || request.status === statusFilter
    const matchesPriority = priorityFilter === "all" || request.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  const stats = {
    total: requests.length,
    pending: requests.filter((r) => r.status === "pending-review").length,
    scheduled: requests.filter((r) => r.status === "scheduled").length,
    approved: requests.filter((r) => r.status === "approved").length,
    rejected: requests.filter((r) => r.status === "rejected").length,
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Scheduled</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.scheduled}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Rejected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
          </CardContent>
        </Card>
      </div>

      {/* CAB Requests Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Change Advisory Board Requests
          </CardTitle>
          <CardDescription>Review and approve deployment requests</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search requests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending-review">Pending Review</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="on-hold">On Hold</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Requests Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Request ID</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Risk Level</TableHead>
                  <TableHead>Compliance</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead className="w-[70px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-mono text-sm">{request.requestId}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{request.projectName}</p>
                        <p className="text-sm text-muted-foreground">{request.version}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(request.status)} flex items-center gap-1 w-fit`}>
                        {getStatusIcon(request.status)}
                        {request.status.replace("-", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(request.priority)}>{request.priority}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getRiskColor(request.riskLevel)}>{request.riskLevel}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Badge variant={request.hasCleanSecurity ? "secondary" : "destructive"} className="text-xs">
                          {request.hasCleanSecurity ? "✓" : "✗"} Security
                        </Badge>
                        <Badge variant={request.hasTestReport ? "secondary" : "destructive"} className="text-xs">
                          {request.hasTestReport ? "✓" : "✗"} Testing
                        </Badge>
                        <Badge variant={request.rollbackPlan ? "secondary" : "destructive"} className="text-xs">
                          {request.rollbackPlan ? "✓" : "✗"} Rollback
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(request.submittedAt)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Review Request
                          </DropdownMenuItem>
                          {request.status === "pending-review" && (
                            <DropdownMenuItem>
                              <Calendar className="mr-2 h-4 w-4" />
                              Schedule Meeting
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredRequests.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No CAB requests found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
