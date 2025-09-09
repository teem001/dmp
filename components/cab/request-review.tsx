"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  CheckCircle,
  XCircle,
  Clock,
  Download,
  FileText,
  Shield,
  TestTube,
  AlertTriangle,
  Calendar,
} from "lucide-react"

interface RequestReviewProps {
  requestId: string
  onApproval?: (decision: "approved" | "rejected" | "on-hold", comments: string) => void
}

interface SupportingDocument {
  id: string
  name: string
  type: "test-report" | "security-scan" | "technical-spec" | "rollback-plan"
  size: string
  uploadedAt: string
  status: "clean" | "issues" | "pending"
}

const mockDocuments: SupportingDocument[] = [
  {
    id: "doc-001",
    name: "Test Completion Report - Project Alpha v2.1.0",
    type: "test-report",
    size: "2.3 MB",
    uploadedAt: "2024-01-15T14:20:00Z",
    status: "clean",
  },
  {
    id: "doc-002",
    name: "Security Assessment Report - Project Alpha v2.1.0",
    type: "security-scan",
    size: "1.8 MB",
    uploadedAt: "2024-01-16T09:30:00Z",
    status: "clean",
  },
  {
    id: "doc-003",
    name: "Technical Specification Document",
    type: "technical-spec",
    size: "4.1 MB",
    uploadedAt: "2024-01-14T11:15:00Z",
    status: "clean",
  },
  {
    id: "doc-004",
    name: "Rollback and Recovery Plan",
    type: "rollback-plan",
    size: "1.2 MB",
    uploadedAt: "2024-01-15T16:45:00Z",
    status: "clean",
  },
]

export function RequestReview({ requestId, onApproval }: RequestReviewProps) {
  const [documents] = useState<SupportingDocument[]>(mockDocuments)
  const [decision, setDecision] = useState<string>("")
  const [comments, setComments] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const getDocumentIcon = (type: SupportingDocument["type"]) => {
    switch (type) {
      case "test-report":
        return <TestTube className="h-4 w-4 text-blue-600" />
      case "security-scan":
        return <Shield className="h-4 w-4 text-green-600" />
      case "technical-spec":
        return <FileText className="h-4 w-4 text-purple-600" />
      case "rollback-plan":
        return <AlertTriangle className="h-4 w-4 text-orange-600" />
      default:
        return <FileText className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusIcon = (status: SupportingDocument["status"]) => {
    switch (status) {
      case "clean":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "issues":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: SupportingDocument["status"]) => {
    switch (status) {
      case "clean":
        return "bg-green-100 text-green-800"
      case "issues":
        return "bg-red-100 text-red-800"
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

  const handleSubmitDecision = async () => {
    if (!decision || !comments.trim()) return

    setIsSubmitting(true)

    // Simulate decision submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    onApproval?.(decision as "approved" | "rejected" | "on-hold", comments)
    setIsSubmitting(false)
  }

  const mockRequestData = {
    requestId: "CAB-2024-001",
    projectName: "Project Alpha",
    version: "v2.1.0",
    changeType: "Major Feature Release",
    businessImpact: "High - New customer-facing features that will improve user engagement and retention",
    riskLevel: "medium",
    estimatedDowntime: "2 hours",
    rollbackTime: "30 minutes",
    submittedBy: "John Project Manager",
    submittedAt: "2024-01-16T14:30:00Z",
    priority: "high",
    description:
      "This release introduces new user dashboard features, enhanced reporting capabilities, and improved mobile responsiveness. The changes have been thoroughly tested and security scanned.",
    technicalSummary:
      "Frontend updates to React components, new API endpoints for dashboard data, database schema updates for enhanced reporting, mobile-first responsive design improvements.",
    businessJustification:
      "Customer feedback indicates strong demand for improved dashboard functionality. This release addresses the top 5 feature requests and is expected to increase user satisfaction scores by 15%.",
    testingSummary:
      "Comprehensive testing completed including unit tests (95% coverage), integration tests, performance testing, and user acceptance testing. All critical and high-priority bugs have been resolved.",
    securitySummary:
      "Security assessment completed with clean results. No critical or high-severity vulnerabilities found. All security best practices have been followed.",
    deploymentWindow: "2024-01-20T02:00:00Z to 2024-01-20T04:00:00Z",
    affectedSystems: ["Web Application", "Mobile API", "Reporting Database", "CDN"],
    dependencies: ["Database migration must complete first", "CDN cache invalidation required"],
    rollbackCriteria: ["Application errors > 5%", "Response time > 3 seconds", "Database connection issues"],
  }

  return (
    <div className="space-y-6">
      {/* Request Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                CAB Request Review
              </CardTitle>
              <CardDescription>
                {mockRequestData.requestId} | {mockRequestData.projectName} {mockRequestData.version}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Badge className="bg-orange-100 text-orange-800">{mockRequestData.priority}</Badge>
              <Badge className="bg-yellow-100 text-yellow-800">{mockRequestData.riskLevel} risk</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Change Type</p>
              <p className="text-sm">{mockRequestData.changeType}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Estimated Downtime</p>
              <p className="text-sm">{mockRequestData.estimatedDowntime}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Rollback Time</p>
              <p className="text-sm">{mockRequestData.rollbackTime}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Submitted By</p>
              <p className="text-sm">{mockRequestData.submittedBy}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="technical">Technical Details</TabsTrigger>
          <TabsTrigger value="documents">Supporting Documents</TabsTrigger>
          <TabsTrigger value="decision">Decision</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Business Impact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Impact Level</p>
                  <p className="text-sm">{mockRequestData.businessImpact}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Business Justification</p>
                  <p className="text-sm">{mockRequestData.businessJustification}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Deployment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Deployment Window</p>
                  <p className="text-sm">{formatDate(mockRequestData.deploymentWindow)}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Affected Systems</p>
                  <div className="flex flex-wrap gap-1">
                    {mockRequestData.affectedSystems.map((system, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {system}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Change Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{mockRequestData.description}</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="technical" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Technical Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{mockRequestData.technicalSummary}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Dependencies</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {mockRequestData.dependencies.map((dep, index) => (
                    <li key={index} className="text-sm flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                      {dep}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Rollback Criteria</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {mockRequestData.rollbackCriteria.map((criteria, index) => (
                  <li key={index} className="text-sm flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                    {criteria}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Supporting Documents</CardTitle>
              <CardDescription>Review all supporting documentation for this change request</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {getDocumentIcon(doc.type)}
                      <div>
                        <p className="text-sm font-medium">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {doc.size} • Uploaded {formatDate(doc.uploadedAt)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={`${getStatusColor(doc.status)} flex items-center gap-1`}>
                        {getStatusIcon(doc.status)}
                        {doc.status}
                      </Badge>
                      <Button size="sm" variant="outline">
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="decision" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>CAB Decision</CardTitle>
              <CardDescription>Record your decision and provide comments for this change request</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Decision</label>
                <Select value={decision} onValueChange={setDecision}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your decision" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="approved">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Approve - Proceed with deployment
                      </div>
                    </SelectItem>
                    <SelectItem value="rejected">
                      <div className="flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-red-600" />
                        Reject - Do not proceed
                      </div>
                    </SelectItem>
                    <SelectItem value="on-hold">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-yellow-600" />
                        On Hold - Requires additional information
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Comments and Rationale</label>
                <Textarea
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="Provide detailed comments about your decision, including any conditions, concerns, or recommendations..."
                  rows={6}
                />
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline">Save Draft</Button>
                <Button onClick={handleSubmitDecision} disabled={!decision || !comments.trim() || isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Decision"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
