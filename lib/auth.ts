"use server"

import { cookies } from "next/headers"

export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "employee"
}

// Simulación de autenticación (reemplazar con base de datos real)
const MOCK_USER: User = {
  id: "1",
  email: "admin@lavecina.com",
  name: "Administrador",
  role: "admin",
}

export async function login(email: string, password: string) {
  // Simulación - reemplazar con validación real
  if (email === "admin@lavecina.com" && password === "admin123") {
    const cookieStore = await cookies()
    cookieStore.set("auth-token", "mock-token-123", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 días
    })
    return { success: true, user: MOCK_USER }
  }
  return { success: false, error: "Credenciales inválidas" }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete("auth-token")
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get("auth-token")

  if (token) {
    // Simulación - reemplazar con validación real del token
    return MOCK_USER
  }

  return null
}
