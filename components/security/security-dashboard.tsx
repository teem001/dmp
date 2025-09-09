"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Shield, AlertTriangle, CheckCircle, Clock, Download, Upload, Search } from "lucide-react"

interface SecurityTicket {
  id: string
  ticketId: string
  projectName: string
  version: string
  status: "pending-scan" | "scanning" | "vulnerabilities-found" | "clean" | "remediation-required"
  priority: "low" | "medium" | "high" | "critical"
  assignedTo: string
  createdAt: string
  lastScanAt?: string
  vulnerabilityCount: number
  criticalCount: number
  highCount: number
  mediumCount: number
  lowCount: number
  scanProgress?: number
}

const mockTickets: SecurityTicket[] = [
  {
    id: "sec-001",
    ticketId: "REM-2024-001",
    projectName: "Project Alpha",
    version: "v2.1.0",
    status: "vulnerabilities-found",
    priority: "high",
    assignedTo: "Security Team A",
    createdAt: "2024-01-15T14:20:00Z",
    lastScanAt: "2024-01-16T09:30:00Z",
    vulnerabilityCount: 5,
    criticalCount: 1,
    highCount: 2,
    mediumCount: 2,
    lowCount: 0,
  },
  {
    id: "sec-002",
    ticketId: "REM-2024-002",
    projectName: "Project Beta",
    version: "v1.3.2",
    status: "scanning",
    priority: "medium",
    assignedTo: "Security Team B",
    createdAt: "2024-01-16T10:15:00Z",
    vulnerabilityCount: 0,
    criticalCount: 0,
    highCount: 0,
    mediumCount: 0,
    lowCount: 0,
    scanProgress: 65,
  },
  {
    id: "sec-003",
    ticketId: "REM-2024-003",
    projectName: "Project Gamma",
    version: "v3.0.1",
    status: "clean",
    priority: "low",
    assignedTo: "Security Team A",
    createdAt: "2024-01-14T16:45:00Z",
    lastScanAt: "2024-01-15T11:20:00Z",
    vulnerabilityCount: 0,
    criticalCount: 0,
    highCount: 0,
    mediumCount: 0,
    lowCount: 0,
  },
  {
    id: "sec-004",
    ticketId: "REM-2024-004",
    projectName: "Project Delta",
    version: "v1.0.5",
    status: "pending-scan",
    priority: "critical",
    assignedTo: "Security Team B",
    createdAt: "2024-01-16T15:30:00Z",
    vulnerabilityCount: 0,
    criticalCount: 0,
    highCount: 0,
    mediumCount: 0,
    lowCount: 0,
  },
]

export function SecurityDashboard() {
  const [tickets] = useState<SecurityTicket[]>(mockTickets)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")

  const getStatusIcon = (status: SecurityTicket["status"]) => {
    switch (status) {
      case "clean":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "vulnerabilities-found":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case "scanning":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "remediation-required":
        return <AlertTriangle className="h-4 w-4 text-orange-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: SecurityTicket["status"]) => {
    switch (status) {
      case "clean":
        return "bg-green-100 text-green-800"
      case "vulnerabilities-found":
        return "bg-red-100 text-red-800"
      case "scanning":
        return "bg-blue-100 text-blue-800"
      case "remediation-required":
        return "bg-orange-100 text-orange-800"
      case "pending-scan":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  const getPriorityColor = (priority: SecurityTicket["priority"]) => {
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.ticketId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.version.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter
    const matchesPriority = priorityFilter === "all" || ticket.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  const stats = {
    total: tickets.length,
    pending: tickets.filter((t) => t.status === "pending-scan").length,
    scanning: tickets.filter((t) => t.status === "scanning").length,
    vulnerabilities: tickets.filter((t) => t.status === "vulnerabilities-found").length,
    clean: tickets.filter((t) => t.status === "clean").length,
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Scan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Scanning</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.scanning}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Vulnerabilities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.vulnerabilities}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Clean</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.clean}</div>
          </CardContent>
        </Card>
      </div>

      {/* Security Tickets Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Assessment Queue
          </CardTitle>
          <CardDescription>Manage security scans and vulnerability assessments</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tickets..."
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
                <SelectItem value="pending-scan">Pending Scan</SelectItem>
                <SelectItem value="scanning">Scanning</SelectItem>
                <SelectItem value="vulnerabilities-found">Vulnerabilities Found</SelectItem>
                <SelectItem value="clean">Clean</SelectItem>
                <SelectItem value="remediation-required">Remediation Required</SelectItem>
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

          {/* Tickets Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket ID</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Vulnerabilities</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell className="font-mono text-sm">{ticket.ticketId}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{ticket.projectName}</p>
                        <p className="text-sm text-muted-foreground">{ticket.version}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Badge className={`${getStatusColor(ticket.status)} flex items-center gap-1 w-fit`}>
                          {getStatusIcon(ticket.status)}
                          {ticket.status.replace("-", " ")}
                        </Badge>
                        {ticket.status === "scanning" && ticket.scanProgress && (
                          <div className="flex items-center gap-2">
                            <Progress value={ticket.scanProgress} className="w-16 h-2" />
                            <span className="text-xs text-muted-foreground">{ticket.scanProgress}%</span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge>
                    </TableCell>
                    <TableCell>
                      {ticket.vulnerabilityCount > 0 ? (
                        <div className="space-y-1">
                          <div className="text-sm font-medium">{ticket.vulnerabilityCount} total</div>
                          <div className="flex gap-1 text-xs">
                            {ticket.criticalCount > 0 && (
                              <Badge variant="destructive" className="text-xs px-1">
                                {ticket.criticalCount} Critical
                              </Badge>
                            )}
                            {ticket.highCount > 0 && (
                              <Badge className="bg-orange-100 text-orange-800 text-xs px-1">
                                {ticket.highCount} High
                              </Badge>
                            )}
                            {ticket.mediumCount > 0 && (
                              <Badge className="bg-yellow-100 text-yellow-800 text-xs px-1">
                                {ticket.mediumCount} Med
                              </Badge>
                            )}
                          </div>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">None</span>
                      )}
                    </TableCell>
                    <TableCell>{ticket.assignedTo}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                        {ticket.status === "pending-scan" && <Button size="sm">Start Scan</Button>}
                        {ticket.status === "vulnerabilities-found" && (
                          <Button size="sm" variant="outline">
                            <Upload className="h-3 w-3 mr-1" />
                            Upload Report
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredTickets.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Shield className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No security tickets found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
