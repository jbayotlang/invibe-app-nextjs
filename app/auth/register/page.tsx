import { RegisterForm } from "@/components/auth/register-form"
import { AuthLayout } from "@/components/layouts/auth-layout"

export default function RegisterPage() {
  return (
    <AuthLayout title="Create an account" description="Enter your information to get started with Gather">
      <RegisterForm />
    </AuthLayout>
  )
}
