"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Upload, File, X, CheckCircle, AlertCircle } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  status: "uploading" | "uploaded" | "error"
}

interface CodeUploadFormProps {
  onUploadComplete?: (data: any) => void
}

export function CodeUploadForm({ onUploadComplete }: CodeUploadFormProps) {
  const { user } = useAuth()
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const [formData, setFormData] = useState({
    projectName: "",
    version: "",
    description: "",
    priority: "",
    changeType: "",
    testingNotes: "",
  })

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFiles = Array.from(e.dataTransfer.files)
    handleFiles(droppedFiles)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      handleFiles(selectedFiles)
    }
  }

  const handleFiles = (fileList: File[]) => {
    const newFiles: UploadedFile[] = fileList.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      status: "uploading",
    }))

    setFiles((prev) => [...prev, ...newFiles])

    // Simulate upload process
    newFiles.forEach((file) => {
      setTimeout(
        () => {
          setFiles((prev) =>
            prev.map((f) => (f.id === file.id ? { ...f, status: Math.random() > 0.1 ? "uploaded" : "error" } : f)),
          )
        },
        1000 + Math.random() * 2000,
      )
    })
  }

  const removeFile = (fileId: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileId))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (files.length === 0 || !formData.projectName || !formData.version) return

    setIsUploading(true)

    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const uploadData = {
      ...formData,
      files: files.filter((f) => f.status === "uploaded"),
      uploadedBy: user?.name,
      uploadedAt: new Date().toISOString(),
      status: "pending-approval",
    }

    onUploadComplete?.(uploadData)
    setIsUploading(false)

    // Reset form
    setFormData({
      projectName: "",
      version: "",
      description: "",
      priority: "",
      changeType: "",
      testingNotes: "",
    })
    setFiles([])
  }

  const canSubmit =
    files.some((f) => f.status === "uploaded") && formData.projectName && formData.version && !isUploading

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Code Package</CardTitle>
        <CardDescription>Submit your tested code for deployment review</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Project Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="projectName">Project Name *</Label>
              <Input
                id="projectName"
                value={formData.projectName}
                onChange={(e) => setFormData((prev) => ({ ...prev, projectName: e.target.value }))}
                placeholder="Enter project name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="version">Version *</Label>
              <Input
                id="version"
                value={formData.version}
                onChange={(e) => setFormData((prev) => ({ ...prev, version: e.target.value }))}
                placeholder="e.g., v1.2.3"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, priority: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="changeType">Change Type</Label>
              <Select
                value={formData.changeType}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, changeType: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select change type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="feature">New Feature</SelectItem>
                  <SelectItem value="bugfix">Bug Fix</SelectItem>
                  <SelectItem value="hotfix">Hotfix</SelectItem>
                  <SelectItem value="enhancement">Enhancement</SelectItem>
                  <SelectItem value="security">Security Update</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Describe the changes and features in this release"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="testingNotes">Testing Notes</Label>
            <Textarea
              id="testingNotes"
              value={formData.testingNotes}
              onChange={(e) => setFormData((prev) => ({ ...prev, testingNotes: e.target.value }))}
              placeholder="Include testing results, coverage information, and any special considerations"
              rows={3}
            />
          </div>

          {/* File Upload Area */}
          <div className="space-y-4">
            <Label>Code Files *</Label>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <div className="space-y-2">
                <p className="text-lg font-medium">
                  Drop your files here, or{" "}
                  <label className="text-primary cursor-pointer hover:underline">
                    browse
                    <input
                      type="file"
                      multiple
                      onChange={handleFileSelect}
                      className="hidden"
                      accept=".zip,.tar,.tar.gz,.jar,.war"
                    />
                  </label>
                </p>
                <p className="text-sm text-muted-foreground">
                  Supported formats: ZIP, TAR, JAR, WAR (Max 100MB per file)
                </p>
              </div>
            </div>

            {/* Uploaded Files List */}
            {files.length > 0 && (
              <div className="space-y-2">
                <Label>Uploaded Files</Label>
                <div className="space-y-2">
                  {files.map((file) => (
                    <div key={file.id} className="flex items-center gap-3 p-3 border rounded-lg">
                      <File className="h-4 w-4 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {file.status === "uploading" && <Badge variant="outline">Uploading...</Badge>}
                        {file.status === "uploaded" && (
                          <Badge variant="secondary">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Uploaded
                          </Badge>
                        )}
                        {file.status === "error" && (
                          <Badge variant="destructive">
                            <AlertCircle className="mr-1 h-3 w-3" />
                            Error
                          </Badge>
                        )}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(file.id)}
                          className="h-6 w-6 p-0"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline">
              Save Draft
            </Button>
            <Button type="submit" disabled={!canSubmit}>
              {isUploading ? "Submitting..." : "Submit for Approval"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
