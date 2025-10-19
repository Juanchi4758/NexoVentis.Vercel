import { getProducts, getCategories } from "@/lib/inventory-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { InventoryCategoryChart } from "@/components/inventory-category-chart"
import { InventoryValueChart } from "@/components/inventory-value-chart"
import { Package, DollarSign, Layers } from "lucide-react"

export async function InventoryReportSection() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()])

  const totalProducts = products.length
  const totalValue = products.reduce((sum, p) => sum + p.price * p.quantity, 0)
  const totalCategories = categories.length

  // Productos por categoría
  const productsByCategory = products.reduce(
    (acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  // Valor por categoría
  const valueByCategory = products.reduce(
    (acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + product.price * product.quantity
      return acc
    },
    {} as Record<string, number>,
  )

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Productos</CardTitle>
            <Package className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalProducts}</div>
            <p className="text-sm text-muted-foreground mt-1">En inventario</p>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Valor Total</CardTitle>
            <DollarSign className="h-5 w-5 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${totalValue.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground mt-1">Valor del inventario</p>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Categorías</CardTitle>
            <Layers className="h-5 w-5 text-chart-3" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalCategories}</div>
            <p className="text-sm text-muted-foreground mt-1">Categorías activas</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <InventoryCategoryChart productsByCategory={productsByCategory} />
        <InventoryValueChart valueByCategory={valueByCategory} />
      </div>
    </div>
  )
}
