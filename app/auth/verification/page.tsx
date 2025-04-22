import { VerificationMessage } from "@/components/auth/verification-message"
import { AuthLayout } from "@/components/layouts/auth-layout"

export default function VerificationPage() {
  return (
    <AuthLayout title="Check your email" description="We've sent you a verification link">
      <VerificationMessage />
    </AuthLayout>
  )
}
