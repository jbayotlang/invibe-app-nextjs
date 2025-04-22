import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"
import { AuthLayout } from "@/components/layouts/auth-layout"

export default function ForgotPasswordPage() {
  return (
    <AuthLayout title="Forgot password" description="Enter your email and we'll send you a reset link">
      <ForgotPasswordForm />
    </AuthLayout>
  )
}
