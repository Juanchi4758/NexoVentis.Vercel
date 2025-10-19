"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface SalesByProductChartProps {
  productSales: Record<string, { quantity: number; total: number }>
}

export function SalesByProductChart({ productSales }: SalesByProductChartProps) {
  const chartData = Object.entries(productSales)
    .sort((a, b) => b[1].total - a[1].total)
    .slice(0, 5)
    .map(([product, data]) => ({
      product: product.length > 20 ? product.substring(0, 20) + "..." : product,
      cantidad: data.quantity,
    }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Productos Más Vendidos</CardTitle>
        <CardDescription>Top 5 productos por cantidad vendida</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            cantidad: {
              label: "Cantidad",
              color: "hsl(var(--secondary))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="product" type="category" width={150} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="cantidad" fill="var(--color-cantidad)" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
