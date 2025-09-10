"use client"

import { AuthProvider } from "@/components/auth/auth-provider"
import { Header } from "@/components/layout/header"

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
        <AuthProvider>
            <Header />
            {children}
        </AuthProvider>
        </body>
        </html>
    )
}
