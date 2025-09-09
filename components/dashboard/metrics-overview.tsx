"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Minus, Activity, Clock, CheckCircle, AlertTriangle } from "lucide-react"

interface MetricCard {
  title: string
  value: string | number
  change: number
  trend: "up" | "down" | "neutral"
  description: string
  icon: React.ComponentType<{ className?: string }>
}

export function MetricsOverview() {
  const metrics: MetricCard[] = [
    {
      title: "Active Deployments",
      value: 12,
      change: 8.2,
      trend: "up",
      description: "Projects in pipeline",
      icon: Activity,
    },
    {
      title: "Avg. Deployment Time",
      value: "4.2 days",
      change: -12.5,
      trend: "down",
      description: "Time to production",
      icon: Clock,
    },
    {
      title: "Success Rate",
      value: "94.2%",
      change: 2.1,
      trend: "up",
      description: "Successful deployments",
      icon: CheckCircle,
    },
    {
      title: "Security Issues",
      value: 3,
      change: -25.0,
      trend: "down",
      description: "Critical vulnerabilities",
      icon: AlertTriangle,
    },
  ]

  const getTrendIcon = (trend: MetricCard["trend"]) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <Minus className="h-4 w-4 text-gray-400" />
    }
  }

  const getTrendColor = (trend: MetricCard["trend"]) => {
    switch (trend) {
      case "up":
        return "text-green-600"
      case "down":
        return "text-red-600"
      default:
        return "text-gray-400"
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => {
        const IconComponent = metric.icon
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <IconComponent className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                {getTrendIcon(metric.trend)}
                <span className={getTrendColor(metric.trend)}>{Math.abs(metric.change)}%</span>
                <span>from last month</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
