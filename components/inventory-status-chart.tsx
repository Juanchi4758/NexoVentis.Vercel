"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Pie, PieChart, Cell, ResponsiveContainer, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface InventoryStatusChartProps {
  available: number
  lowStock: number
  outOfStock: number
}

export function InventoryStatusChart({ available, lowStock, outOfStock }: InventoryStatusChartProps) {
  const chartData = [
    { name: "Disponible", value: available, fill: "hsl(var(--secondary))" },
    { name: "Bajo Stock", value: lowStock, fill: "hsl(var(--chart-4))" },
    { name: "Agotado", value: outOfStock, fill: "hsl(var(--destructive))" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Estado del Inventario</CardTitle>
        <CardDescription>Distribución de productos por estado</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            disponible: {
              label: "Disponible",
              color: "hsl(var(--secondary))",
            },
            bajoStock: {
              label: "Bajo Stock",
              color: "hsl(var(--chart-4))",
            },
            agotado: {
              label: "Agotado",
              color: "hsl(var(--destructive))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
