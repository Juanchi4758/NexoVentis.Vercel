import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Receipt, AlertCircle, TrendingUp } from "lucide-react"
import { getProducts, getLowStockProducts, getOutOfStockProducts } from "@/lib/inventory-data"
import { getSales, getFiados, getPendingFiados } from "@/lib/accounts-data"
import { RecentSalesChart } from "@/components/recent-sales-chart"
import { InventoryStatusChart } from "@/components/inventory-status-chart"
import { QuickActions } from "@/components/quick-actions"
import Link from "next/link"

export default async function DashboardPage() {
  const [products, lowStockProducts, outOfStockProducts, sales, fiados, pendingFiados] = await Promise.all([
    getProducts(),
    getLowStockProducts(),
    getOutOfStockProducts(),
    getSales(),
    getFiados(),
    getPendingFiados(),
  ])

  // Calcular ventas del día
  const today = new Date()
  const todaySales = sales.filter((s) => {
    const saleDate = new Date(s.date)
    return saleDate.toDateString() === today.toDateString()
  })
  const todayTotal = todaySales.reduce((sum, s) => sum + s.total, 0)

  // Calcular total de fiados pendientes
  const totalPendingFiados = pendingFiados.reduce((sum, f) => sum + f.amountPending, 0)

  // Total de alertas
  const totalAlerts = lowStockProducts.length + outOfStockProducts.length + pendingFiados.length

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-base lg:text-lg text-muted-foreground">Bienvenido al sistema de gestión integral</p>
      </div>

      {/* Tarjetas de métricas principales */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/dashboard/inventario">
          <Card className="border-2 hover:shadow-lg transition-all cursor-pointer hover:border-primary">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-medium text-muted-foreground">Productos en Stock</CardTitle>
              <Package className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{products.length}</div>
              <p className="text-sm text-muted-foreground mt-1">
                {lowStockProducts.length} bajo stock, {outOfStockProducts.length} agotados
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/cuentas?tab=ventas">
          <Card className="border-2 hover:shadow-lg transition-all cursor-pointer hover:border-secondary">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-medium text-muted-foreground">Ventas del Día</CardTitle>
              <TrendingUp className="h-5 w-5 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">${todayTotal.toLocaleString()}</div>
              <p className="text-sm text-muted-foreground mt-1">{todaySales.length} transacciones</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/cuentas?tab=fiados">
          <Card className="border-2 hover:shadow-lg transition-all cursor-pointer hover:border-chart-3">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-medium text-muted-foreground">Fiados Pendientes</CardTitle>
              <Receipt className="h-5 w-5 text-chart-3" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">${totalPendingFiados.toLocaleString()}</div>
              <p className="text-sm text-muted-foreground mt-1">{pendingFiados.length} clientes</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/notificaciones">
          <Card className="border-2 hover:shadow-lg transition-all cursor-pointer hover:border-destructive">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-medium text-muted-foreground">Alertas Activas</CardTitle>
              <AlertCircle className="h-5 w-5 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{totalAlerts}</div>
              <p className="text-sm text-muted-foreground mt-1">Requieren atención</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Gráficos */}
      <div className="grid gap-6 lg:grid-cols-2">
        <RecentSalesChart sales={sales} />
        <InventoryStatusChart
          available={products.filter((p) => p.status === "disponible").length}
          lowStock={lowStockProducts.length}
          outOfStock={outOfStockProducts.length}
        />
      </div>

      {/* Acciones rápidas */}
      <QuickActions />
    </div>
  )
}
