import { getSales } from "@/lib/accounts-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, CreditCard, Banknote } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

export async function SalesSection() {
  const sales = await getSales()
  const totalSales = sales.reduce((sum, s) => sum + s.total, 0)
  const todaySales = sales.filter((s) => {
    const today = new Date()
    const saleDate = new Date(s.date)
    return saleDate.toDateString() === today.toDateString()
  })
  const todayTotal = todaySales.reduce((sum, s) => sum + s.total, 0)

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Ventas</h2>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Ventas de Hoy</CardTitle>
            <TrendingUp className="h-5 w-5 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${todayTotal.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground mt-1">{todaySales.length} transacciones</p>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Ventas</CardTitle>
            <Banknote className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${totalSales.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground mt-1">{sales.length} transacciones</p>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Promedio por Venta</CardTitle>
            <CreditCard className="h-5 w-5 text-chart-3" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${Math.round(totalSales / sales.length).toLocaleString()}</div>
            <p className="text-sm text-muted-foreground mt-1">Valor promedio</p>
          </CardContent>
        </Card>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Fecha</TableHead>
                <TableHead className="font-semibold">Producto</TableHead>
                <TableHead className="font-semibold">Cantidad</TableHead>
                <TableHead className="font-semibold">Precio Unit.</TableHead>
                <TableHead className="font-semibold">Total</TableHead>
                <TableHead className="font-semibold">Método de Pago</TableHead>
                <TableHead className="font-semibold">Cliente</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sales.map((sale) => (
                <TableRow key={sale.id} className="hover:bg-muted/30">
                  <TableCell>{format(new Date(sale.date), "dd/MM/yyyy HH:mm", { locale: es })}</TableCell>
                  <TableCell className="font-medium">{sale.productName}</TableCell>
                  <TableCell>{sale.quantity}</TableCell>
                  <TableCell>${sale.unitPrice.toLocaleString()}</TableCell>
                  <TableCell className="font-bold">${sale.total.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {sale.paymentMethod}
                    </Badge>
                  </TableCell>
                  <TableCell>{sale.customerName || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
