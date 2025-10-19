import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, AlertTriangle, XCircle, DollarSign } from "lucide-react"

interface InventoryStatsProps {
  totalProducts: number
  lowStockCount: number
  outOfStockCount: number
  totalValue: number
}

export function InventoryStats({ totalProducts, lowStockCount, outOfStockCount, totalValue }: InventoryStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="border-2">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Productos</CardTitle>
          <Package className="h-5 w-5 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{totalProducts}</div>
        </CardContent>
      </Card>

      <Card className="border-2">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Bajo Stock</CardTitle>
          <AlertTriangle className="h-5 w-5 text-chart-4" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-chart-4">{lowStockCount}</div>
        </CardContent>
      </Card>

      <Card className="border-2">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Agotados</CardTitle>
          <XCircle className="h-5 w-5 text-destructive" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-destructive">{outOfStockCount}</div>
        </CardContent>
      </Card>

      <Card className="border-2">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Valor Total</CardTitle>
          <DollarSign className="h-5 w-5 text-secondary" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">${totalValue.toLocaleString()}</div>
        </CardContent>
      </Card>
    </div>
  )
}
