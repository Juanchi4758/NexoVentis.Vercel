"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Receipt, AlertCircle, BarChart3, FileText, DollarSign } from "lucide-react"
import Link from "next/link"

const actions = [
  {
    title: "Agregar Producto",
    description: "Registra nuevos productos en el inventario",
    icon: Package,
    href: "/dashboard/inventario",
    color: "text-primary",
    hoverColor: "hover:border-primary",
  },
  {
    title: "Registrar Venta",
    description: "Registra una nueva venta",
    icon: DollarSign,
    href: "/dashboard/cuentas?tab=ventas",
    color: "text-secondary",
    hoverColor: "hover:border-secondary",
  },
  {
    title: "Nuevo Fiado",
    description: "Registra una cuenta por cobrar",
    icon: Receipt,
    href: "/dashboard/cuentas?tab=fiados",
    color: "text-chart-3",
    hoverColor: "hover:border-chart-3",
  },
  {
    title: "Ver Alertas",
    description: "Revisa notificaciones pendientes",
    icon: AlertCircle,
    href: "/dashboard/notificaciones",
    color: "text-destructive",
    hoverColor: "hover:border-destructive",
  },
  {
    title: "Ver Reportes",
    description: "Analiza estadísticas detalladas",
    icon: BarChart3,
    href: "/dashboard/reportes",
    color: "text-chart-4",
    hoverColor: "hover:border-chart-4",
  },
  {
    title: "Flujo de Caja",
    description: "Consulta ingresos y egresos",
    icon: FileText,
    href: "/dashboard/cuentas?tab=flujo",
    color: "text-chart-5",
    hoverColor: "hover:border-chart-5",
  },
]

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Acceso Rápido</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {actions.map((action) => (
            <Link key={action.title} href={action.href}>
              <div
                className={`p-6 border-2 border-border rounded-lg hover:shadow-md transition-all cursor-pointer ${action.hoverColor}`}
              >
                <action.icon className={`h-8 w-8 ${action.color} mb-3`} />
                <h3 className="font-semibold text-lg mb-1">{action.title}</h3>
                <p className="text-sm text-muted-foreground">{action.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
