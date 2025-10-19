import { getProducts, getCategories, getLowStockProducts, getOutOfStockProducts } from "@/lib/inventory-data"
import { InventoryTable } from "@/components/inventory-table"
import { InventoryStats } from "@/components/inventory-stats"
import { AddProductDialog } from "@/components/add-product-dialog"
import { ExportInventoryButton } from "@/components/export-inventory-button"

export default async function InventarioPage() {
  const [products, categories, lowStockProducts, outOfStockProducts] = await Promise.all([
    getProducts(),
    getCategories(),
    getLowStockProducts(),
    getOutOfStockProducts(),
  ])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground">Inventario</h1>
          <p className="text-base lg:text-lg text-muted-foreground mt-1">Gestiona tus productos y stock</p>
        </div>
        <div className="flex gap-3">
          <ExportInventoryButton products={products} />
          <AddProductDialog categories={categories} />
        </div>
      </div>

      <InventoryStats
        totalProducts={products.length}
        lowStockCount={lowStockProducts.length}
        outOfStockCount={outOfStockProducts.length}
        totalValue={products.reduce((sum, p) => sum + p.price * p.quantity, 0)}
      />

      <InventoryTable products={products} categories={categories} />
    </div>
  )
}
