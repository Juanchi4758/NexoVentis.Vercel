"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface InventoryValueChartProps {
  valueByCategory: Record<string, number>
}

export function InventoryValueChart({ valueByCategory }: InventoryValueChartProps) {
  const chartData = Object.entries(valueByCategory)
    .sort((a, b) => b[1] - a[1])
    .map(([category, value]) => ({
      category,
      valor: value,
    }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Valor por Categoría</CardTitle>
        <CardDescription>Valor monetario del inventario por categoría</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            valor: {
              label: "Valor",
              color: "hsl(var(--primary))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="valor" fill="var(--color-valor)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
