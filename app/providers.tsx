"use client"

import { AuthProvider } from "@/components/auth/auth-provider"
import { Header } from "@/components/layout/header"

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider children={children}>
            <Header />
            {children}
        </AuthProvider>
    )
}
