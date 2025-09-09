"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, AlertTriangle, Upload, FileCheck, Shield, Users, Rocket } from "lucide-react"

interface WorkflowStep {
  id: string
  title: string
  description: string
  status: "completed" | "in-progress" | "pending" | "blocked"
  icon: React.ComponentType<{ className?: string }>
  assignee?: string
  dueDate?: string
}

interface Project {
  id: string
  name: string
  version: string
  currentStep: number
  progress: number
  priority: "high" | "medium" | "low"
  steps: WorkflowStep[]
}

const mockProjects: Project[] = [
  {
    id: "proj-001",
    name: "Project Alpha",
    version: "v2.1.0",
    currentStep: 3,
    progress: 60,
    priority: "high",
    steps: [
      {
        id: "1",
        title: "Code Upload",
        description: "Developer uploads tested code",
        status: "completed",
        icon: Upload,
      },
      {
        id: "2",
        title: "QA Testing",
        description: "Generate Test Completion Report",
        status: "completed",
        icon: FileCheck,
      },
      {
        id: "3",
        title: "Security Scan",
        description: "IT Security assessment",
        status: "in-progress",
        icon: Shield,
        assignee: "Security Team",
      },
      { id: "4", title: "CAB Approval", description: "Change Advisory Board review", status: "pending", icon: Users },
      { id: "5", title: "Deployment", description: "Support team deployment", status: "pending", icon: Rocket },
    ],
  },
  {
    id: "proj-002",
    name: "Project Beta",
    version: "v1.3.2",
    currentStep: 4,
    progress: 80,
    priority: "medium",
    steps: [
      {
        id: "1",
        title: "Code Upload",
        description: "Developer uploads tested code",
        status: "completed",
        icon: Upload,
      },
      {
        id: "2",
        title: "QA Testing",
        description: "Generate Test Completion Report",
        status: "completed",
        icon: FileCheck,
      },
      { id: "3", title: "Security Scan", description: "IT Security assessment", status: "completed", icon: Shield },
      {
        id: "4",
        title: "CAB Approval",
        description: "Change Advisory Board review",
        status: "in-progress",
        icon: Users,
        assignee: "CAB Team",
      },
      { id: "5", title: "Deployment", description: "Support team deployment", status: "pending", icon: Rocket },
    ],
  },
  {
    id: "proj-003",
    name: "Project Gamma",
    version: "v3.0.1",
    currentStep: 2,
    progress: 40,
    priority: "low",
    steps: [
      {
        id: "1",
        title: "Code Upload",
        description: "Developer uploads tested code",
        status: "completed",
        icon: Upload,
      },
      {
        id: "2",
        title: "QA Testing",
        description: "Generate Test Completion Report",
        status: "blocked",
        icon: FileCheck,
        assignee: "QA Team",
      },
      { id: "3", title: "Security Scan", description: "IT Security assessment", status: "pending", icon: Shield },
      { id: "4", title: "CAB Approval", description: "Change Advisory Board review", status: "pending", icon: Users },
      { id: "5", title: "Deployment", description: "Support team deployment", status: "pending", icon: Rocket },
    ],
  },
]

export function WorkflowPipeline() {
  const getStatusIcon = (status: WorkflowStep["status"]) => {
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

  const getStatusColor = (status: WorkflowStep["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "blocked":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  const getPriorityColor = (priority: Project["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Deployment Pipeline</CardTitle>
        <CardDescription>Track projects through the deployment workflow</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {mockProjects.map((project) => (
          <div key={project.id} className="space-y-4 p-4 border rounded-lg">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{project.name}</h3>
                  <Badge variant="outline">{project.version}</Badge>
                  <Badge className={getPriorityColor(project.priority)}>{project.priority}</Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Progress: {project.progress}%</span>
                  <Progress value={project.progress} className="w-24 h-2" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
              {project.steps.map((step, index) => {
                const StepIcon = step.icon
                return (
                  <div
                    key={step.id}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      index <= project.currentStep - 1 ? "border-primary bg-primary/5" : "border-border bg-card"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <StepIcon className="h-4 w-4" />
                      <span className="text-sm font-medium">{step.title}</span>
                      {getStatusIcon(step.status)}
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{step.description}</p>
                    <Badge variant="secondary" className={`text-xs ${getStatusColor(step.status)}`}>
                      {step.status.replace("-", " ")}
                    </Badge>
                    {step.assignee && <p className="text-xs text-muted-foreground mt-1">Assigned: {step.assignee}</p>}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
