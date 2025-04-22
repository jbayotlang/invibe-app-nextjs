"use client"

import Link from "next/link"
import { Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function VerificationMessage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <div className="rounded-full bg-primary/10 p-6">
          <Mail className="h-12 w-12 text-primary" />
        </div>
      </div>

      <Alert className="border-primary/50 bg-primary/10">
        <AlertDescription>
          We've sent a verification link to your email address. Please check your inbox and click the link to verify
          your account.
        </AlertDescription>
      </Alert>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Didn't receive the email?{" "}
          <Button variant="link" className="p-0 h-auto font-medium">
            Resend verification email
          </Button>
        </p>
      </div>

      <Button className="w-full" variant="outline" asChild>
        <Link href="/auth/login">Back to login</Link>
      </Button>
    </div>
  )
}
