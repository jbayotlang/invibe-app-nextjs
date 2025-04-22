import type React from "react"
import Image from "next/image"
import Link from "next/link"

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  description: string
}

export function AuthLayout({ children, title, description }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-primary/5 to-background">
      <div className="w-full max-w-md bg-background rounded-lg shadow-lg p-6 md:p-8">
        <div className="text-center mb-6">
          <Link href="/" className="inline-block">
            <div className="flex flex-col items-center">
              <Image
                src="/placeholder.svg?height=60&width=60"
                alt="InVibe App"
                width={60}
                height={60}
                className="mx-auto"
              />
              <h1 className="text-xl font-bold mt-2 text-primary">InVibe</h1>
            </div>
          </Link>
          <h2 className="text-2xl font-bold mt-6">{title}</h2>
          <p className="text-muted-foreground mt-2">{description}</p>
        </div>
        {children}
      </div>
      <p className="text-center text-sm text-muted-foreground mt-8">
        &copy; {new Date().getFullYear()} InVibe. All rights reserved.
      </p>
    </div>
  )
}
