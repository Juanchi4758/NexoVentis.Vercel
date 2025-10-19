import { getSales } from "@/lib/accounts-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SalesByMethodChart } from "@/components/sales-by-method-chart"
import { SalesByProductChart } from "@/components/sales-by-product-chart"
import { TrendingUp, ShoppingCart, CreditCard } from "lucide-react"

export async function SalesReportSection() {
  const sales = await getSales()

  const totalSales = sales.reduce((sum, s) => sum + s.total, 0)
  const averageSale = totalSales / sales.length
  const totalTransactions = sales.length

  // Ventas por método de pago
  const salesByMethod = sales.reduce(
    (acc, sale) => {
      acc[sale.paymentMethod] = (acc[sale.paymentMethod] || 0) + sale.total
      return acc
    },
    {} as Record<string, number>,
  )

  // Productos más vendidos
  const productSales = sales.reduce(
    (acc, sale) => {
      if (!acc[sale.productName]) {
        acc[sale.productName] = { quantity: 0, total: 0 }
      }
      acc[sale.productName].quantity += sale.quantity
      acc[sale.productName].total += sale.total
      return acc
    },
    {} as Record<string, { quantity: number; total: number }>,
  )

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Ventas</CardTitle>
            <TrendingUp className="h-5 w-5 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${totalSales.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground mt-1">Histórico completo</p>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Promedio por Venta</CardTitle>
            <CreditCard className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${Math.round(averageSale).toLocaleString()}</div>
            <p className="text-sm text-muted-foreground mt-1">Ticket promedio</p>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Transacciones</CardTitle>
            <ShoppingCart className="h-5 w-5 text-chart-3" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalTransactions}</div>
            <p className="text-sm text-muted-foreground mt-1">Total de ventas</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SalesByMethodChart salesByMethod={salesByMethod} />
        <SalesByProductChart productSales={productSales} />
      </div>
    </div>
  )
}
