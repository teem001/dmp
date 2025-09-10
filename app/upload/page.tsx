"use client"

export const dynamic = "force-dynamic"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { CodeUploadForm } from "@/components/upload/code-upload-form"
import { UploadHistory } from "@/components/upload/upload-history"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, History, CheckCircle } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"

export default function UploadPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("upload")
  const [showSuccess, setShowSuccess] = useState(false)

  const handleUploadComplete = (data: any) => {
    console.log("Upload completed:", data)
    setShowSuccess(true)
    setActiveTab("history")

    // Hide success message after 5 seconds
    setTimeout(() => setShowSuccess(false), 5000)
  }

  if (!user) {
    return <div>Please log in to access this page.</div>
  }

  // Only show upload page for developers
  if (user.role !== "developer") {
    return (
        <div className="min-h-screen bg-background">
          <Header />
          <main className="p-6">
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Access Restricted</CardTitle>
                  <CardDescription>
                    This page is only available to developers. Your current role is: {user.role}
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </main>
        </div>
    )
  }

  return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Page Header */}
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-balance">Code Upload & Management</h2>
              <p className="text-muted-foreground text-pretty">
                Submit your tested code packages for deployment review and approval
              </p>
            </div>

            {/* Success Message */}
            {showSuccess && (
                <Card className="border-green-200 bg-green-50">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-800">Upload Successful!</p>
                        <p className="text-sm text-green-700">
                          Your code package has been submitted for team lead approval.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
            )}

            {/* Main Content */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="upload" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Upload Code
                </TabsTrigger>
                <TabsTrigger value="history" className="flex items-center gap-2">
                  <History className="h-4 w-4" />
                  Upload History
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upload" className="space-y-6">
                <CodeUploadForm onUploadComplete={handleUploadComplete} />
              </TabsContent>

              <TabsContent value="history" className="space-y-6">
                <UploadHistory />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
  )
}
