"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CheckCircle,
  Clock,
  AlertTriangle,
  Upload,
  FileCheck,
  Shield,
  Users,
  Rocket,
  Activity,
  TrendingUp,
  Calendar,
} from "lucide-react"

interface WorkflowStatus {
  id: string
  projectName: string
  version: string
  currentStage: number
  totalStages: number
  progress: number
  status: "active" | "completed" | "blocked" | "on-hold"
  priority: "low" | "medium" | "high" | "critical"
  startedAt: string
  estimatedCompletion?: string
  lastActivity: string
  stages: {
    id: number
    name: string
    status: "completed" | "in-progress" | "pending" | "blocked"
    startedAt?: string
    completedAt?: string
    assignee?: string
    duration?: string
    issues?: number
  }[]
  metrics: {
    totalTime: string
    avgStageTime: string
    blockedTime: string
    efficiency: number
  }
}

const mockWorkflowStatuses: WorkflowStatus[] = [
  {
    id: "wf-001",
    projectName: "Project Alpha",
    version: "v2.1.0",
    currentStage: 3,
    totalStages: 5,
    progress: 60,
    status: "active",
    priority: "high",
    startedAt: "2024-01-15T10:30:00Z",
    estimatedCompletion: "2024-01-20T16:00:00Z",
    lastActivity: "2024-01-16T14:20:00Z",
    stages: [
      {
        id: 1,
        name: "Code Upload & Approval",
        status: "completed",
        startedAt: "2024-01-15T10:30:00Z",
        completedAt: "2024-01-15T14:20:00Z",
        assignee: "John Developer",
        duration: "3h 50m",
      },
      {
        id: 2,
        name: "QA Testing & TCR",
        status: "completed",
        startedAt: "2024-01-15T14:20:00Z",
        completedAt: "2024-01-16T09:15:00Z",
        assignee: "QA Team",
        duration: "18h 55m",
      },
      {
        id: 3,
        name: "Security Assessment",
        status: "in-progress",
        startedAt: "2024-01-16T09:15:00Z",
        assignee: "Security Team A",
        issues: 2,
      },
      {
        id: 4,
        name: "CAB Approval",
        status: "pending",
        assignee: "CAB Board",
      },
      {
        id: 5,
        name: "Deployment",
        status: "pending",
        assignee: "Support Team",
      },
    ],
    metrics: {
      totalTime: "2d 3h 50m",
      avgStageTime: "12h 30m",
      blockedTime: "0h",
      efficiency: 85,
    },
  },
  {
    id: "wf-002",
    projectName: "Project Beta",
    version: "v1.3.2",
    currentStage: 4,
    totalStages: 5,
    progress: 80,
    status: "active",
    priority: "medium",
    startedAt: "2024-01-14T09:00:00Z",
    estimatedCompletion: "2024-01-18T14:00:00Z",
    lastActivity: "2024-01-16T11:30:00Z",
    stages: [
      {
        id: 1,
        name: "Code Upload & Approval",
        status: "completed",
        startedAt: "2024-01-14T09:00:00Z",
        completedAt: "2024-01-14T12:30:00Z",
        assignee: "Mike Developer",
        duration: "3h 30m",
      },
      {
        id: 2,
        name: "QA Testing & TCR",
        status: "completed",
        startedAt: "2024-01-14T12:30:00Z",
        completedAt: "2024-01-15T10:15:00Z",
        assignee: "QA Team",
        duration: "21h 45m",
      },
      {
        id: 3,
        name: "Security Assessment",
        status: "completed",
        startedAt: "2024-01-15T10:15:00Z",
        completedAt: "2024-01-15T16:20:00Z",
        assignee: "Security Team B",
        duration: "6h 5m",
      },
      {
        id: 4,
        name: "CAB Approval",
        status: "in-progress",
        startedAt: "2024-01-15T16:20:00Z",
        assignee: "CAB Board",
      },
      {
        id: 5,
        name: "Deployment",
        status: "pending",
        assignee: "Support Team",
      },
    ],
    metrics: {
      totalTime: "2d 2h 30m",
      avgStageTime: "10h 20m",
      blockedTime: "0h",
      efficiency: 92,
    },
  },
]

export function WorkflowStatus() {
  const [workflows] = useState<WorkflowStatus[]>(mockWorkflowStatuses)
  const [selectedWorkflow, setSelectedWorkflow] = useState<string>(workflows[0]?.id || "")

  const getStageIcon = (stageId: number) => {
    const icons = [Upload, FileCheck, Shield, Users, Rocket]
    const IconComponent = icons[stageId - 1] || Activity
    return IconComponent
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "blocked":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "blocked":
        return "bg-red-100 text-red-800"
      case "on-hold":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  const getPriorityColor = (priority: string) => {
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
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const selectedWorkflowData = workflows.find((w) => w.id === selectedWorkflow)

  return (
    <div className="space-y-6">
      {/* Workflow Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Workflow Status Tracking
          </CardTitle>
          <CardDescription>Monitor deployment pipeline progress and performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {workflows.map((workflow) => (
              <Card
                key={workflow.id}
                className={`cursor-pointer transition-all ${
                  selectedWorkflow === workflow.id ? "ring-2 ring-primary" : "hover:shadow-md"
                }`}
                onClick={() => setSelectedWorkflow(workflow.id)}
              >
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{workflow.projectName}</h3>
                        <p className="text-sm text-muted-foreground">{workflow.version}</p>
                      </div>
                      <div className="flex gap-1">
                        <Badge className={getStatusColor(workflow.status)}>{workflow.status}</Badge>
                        <Badge className={getPriorityColor(workflow.priority)}>{workflow.priority}</Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress</span>
                        <span>{workflow.progress}%</span>
                      </div>
                      <Progress value={workflow.progress} className="h-2" />
                      <div className="text-xs text-muted-foreground">
                        Stage {workflow.currentStage} of {workflow.totalStages}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Status */}
      {selectedWorkflowData && (
        <Tabs defaultValue="timeline" className="space-y-4">
          <TabsList>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="timeline" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>
                  {selectedWorkflowData.projectName} {selectedWorkflowData.version}
                </CardTitle>
                <CardDescription>
                  Started {formatDate(selectedWorkflowData.startedAt)} •
                  {selectedWorkflowData.estimatedCompletion &&
                    ` Est. completion ${formatDate(selectedWorkflowData.estimatedCompletion)}`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {selectedWorkflowData.stages.map((stage, index) => {
                    const StageIcon = getStageIcon(stage.id)
                    const isActive = stage.status === "in-progress"
                    const isCompleted = stage.status === "completed"

                    return (
                      <div key={stage.id} className="flex items-start gap-4">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                            isCompleted
                              ? "border-green-500 bg-green-50"
                              : isActive
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-300 bg-gray-50"
                          }`}
                        >
                          <StageIcon
                            className={`h-5 w-5 ${
                              isCompleted ? "text-green-600" : isActive ? "text-blue-600" : "text-gray-400"
                            }`}
                          />
                        </div>

                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">{stage.name}</h3>
                            <div className="flex items-center gap-2">
                              <Badge className={`${getStatusColor(stage.status)} flex items-center gap-1`}>
                                {getStatusIcon(stage.status)}
                                {stage.status.replace("-", " ")}
                              </Badge>
                              {stage.issues && stage.issues > 0 && (
                                <Badge variant="destructive" className="text-xs">
                                  {stage.issues} issues
                                </Badge>
                              )}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                            <div>
                              <span className="font-medium">Assignee:</span> {stage.assignee}
                            </div>
                            {stage.duration && (
                              <div>
                                <span className="font-medium">Duration:</span> {stage.duration}
                              </div>
                            )}
                            {stage.completedAt && (
                              <div>
                                <span className="font-medium">Completed:</span> {formatDate(stage.completedAt)}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="metrics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{selectedWorkflowData.metrics.totalTime}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Avg Stage Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{selectedWorkflowData.metrics.avgStageTime}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Blocked Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{selectedWorkflowData.metrics.blockedTime}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Efficiency</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <div className="text-2xl font-bold text-green-600">{selectedWorkflowData.metrics.efficiency}%</div>
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Activity History</CardTitle>
                <CardDescription>Detailed log of all workflow activities and changes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>Activity history coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
