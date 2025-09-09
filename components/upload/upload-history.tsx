"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, Download, Eye, Clock, CheckCircle, XCircle, AlertTriangle } from "lucide-react"

interface Upload {
  id: string
  projectName: string
  version: string
  status: "pending-approval" | "approved" | "rejected" | "in-review" | "deployed"
  uploadedBy: string
  uploadedAt: string
  approvedBy?: string
  approvedAt?: string
  priority: "low" | "medium" | "high" | "critical"
  changeType: string
  fileCount: number
  fileSize: string
}

const mockUploads: Upload[] = [
  {
    id: "upload-001",
    projectName: "Project Alpha",
    version: "v2.1.0",
    status: "approved",
    uploadedBy: "John Developer",
    uploadedAt: "2024-01-15T10:30:00Z",
    approvedBy: "Sarah Lead",
    approvedAt: "2024-01-15T14:20:00Z",
    priority: "high",
    changeType: "feature",
    fileCount: 3,
    fileSize: "45.2 MB",
  },
  {
    id: "upload-002",
    projectName: "Project Beta",
    version: "v1.3.2",
    status: "pending-approval",
    uploadedBy: "Mike Developer",
    uploadedAt: "2024-01-16T09:15:00Z",
    priority: "medium",
    changeType: "bugfix",
    fileCount: 2,
    fileSize: "23.8 MB",
  },
  {
    id: "upload-003",
    projectName: "Project Gamma",
    version: "v3.0.1",
    status: "in-review",
    uploadedBy: "Lisa Developer",
    uploadedAt: "2024-01-16T11:45:00Z",
    priority: "low",
    changeType: "enhancement",
    fileCount: 5,
    fileSize: "67.3 MB",
  },
  {
    id: "upload-004",
    projectName: "Project Delta",
    version: "v1.0.5",
    status: "rejected",
    uploadedBy: "Tom Developer",
    uploadedAt: "2024-01-14T16:20:00Z",
    approvedBy: "Sarah Lead",
    approvedAt: "2024-01-15T08:30:00Z",
    priority: "critical",
    changeType: "hotfix",
    fileCount: 1,
    fileSize: "12.1 MB",
  },
]

export function UploadHistory() {
  const [uploads] = useState<Upload[]>(mockUploads)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")

  const getStatusIcon = (status: Upload["status"]) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "in-review":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "pending-approval":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: Upload["status"]) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "in-review":
        return "bg-blue-100 text-blue-800"
      case "pending-approval":
        return "bg-yellow-100 text-yellow-800"
      case "deployed":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  const getPriorityColor = (priority: Upload["priority"]) => {
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

  const filteredUploads = uploads.filter((upload) => {
    const matchesSearch =
      upload.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      upload.version.toLowerCase().includes(searchTerm.toLowerCase()) ||
      upload.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || upload.status === statusFilter
    const matchesPriority = priorityFilter === "all" || upload.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload History</CardTitle>
        <CardDescription>View and manage your code upload submissions</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search uploads..."
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
              <SelectItem value="pending-approval">Pending Approval</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="in-review">In Review</SelectItem>
              <SelectItem value="deployed">Deployed</SelectItem>
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

        {/* Upload Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Uploaded By</TableHead>
                <TableHead>Upload Date</TableHead>
                <TableHead>Files</TableHead>
                <TableHead className="w-[70px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUploads.map((upload) => (
                <TableRow key={upload.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{upload.projectName}</p>
                      <p className="text-sm text-muted-foreground">{upload.version}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(upload.status)} flex items-center gap-1 w-fit`}>
                      {getStatusIcon(upload.status)}
                      {upload.status.replace("-", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(upload.priority)}>{upload.priority}</Badge>
                  </TableCell>
                  <TableCell>{upload.uploadedBy}</TableCell>
                  <TableCell>{formatDate(upload.uploadedAt)}</TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">{upload.fileCount} files</p>
                      <p className="text-xs text-muted-foreground">{upload.fileSize}</p>
                    </div>
                  </TableCell>
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
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Download Files
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredUploads.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>No uploads found matching your criteria</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
