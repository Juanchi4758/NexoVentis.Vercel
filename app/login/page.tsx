import { LoginForm } from "@/components/login-form"
import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function LoginPage() {
  const user = await getCurrentUser()

  if (user) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">NexoVentis</h1>
          <p className="text-lg text-muted-foreground">Sistema de Gestión Integral</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
