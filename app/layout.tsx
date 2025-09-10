import type { Metadata } from "next"
import "./globals.css"
import { Providers } from "./providers"// 👈 client wrapper

export const metadata: Metadata = {
    title: "My App",
    description: "Next.js App with Auth",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
        <Providers>
            {children}
        </Providers>
        </body>
        </html>
    )
}

