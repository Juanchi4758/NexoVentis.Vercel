"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Download, FileText, FileSpreadsheet } from "lucide-react"
import type { Product } from "@/lib/types"

interface ExportInventoryButtonProps {
  products: Product[]
}

export function ExportInventoryButton({ products }: ExportInventoryButtonProps) {
  function exportToCSV() {
    const headers = ["Nombre", "Categoría", "Precio", "Cantidad", "Stock Mínimo", "Estado"]
    const rows = products.map((p) => [p.name, p.category, p.price, p.quantity, p.minStock, p.status])

    const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = `inventario_${new Date().toISOString().split("T")[0]}.csv`
    link.click()
  }

  function exportToPDF() {
    // Simulación - en producción usar una librería como jsPDF
    alert("Exportación a PDF - Implementar con jsPDF en producción")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="lg" className="gap-2 bg-transparent">
          <Download className="h-5 w-5" />
          Exportar
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={exportToCSV} className="cursor-pointer">
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          Exportar como CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToPDF} className="cursor-pointer">
          <FileText className="mr-2 h-4 w-4" />
          Exportar como PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
