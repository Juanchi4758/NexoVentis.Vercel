"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface SalesByMethodChartProps {
  salesByMethod: Record<string, number>
}

export function SalesByMethodChart({ salesByMethod }: SalesByMethodChartProps) {
  const chartData = Object.entries(salesByMethod).map(([method, total]) => ({
    method: method.charAt(0).toUpperCase() + method.slice(1),
    total,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ventas por Método de Pago</CardTitle>
        <CardDescription>Distribución de ventas según forma de pago</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            total: {
              label: "Total",
              color: "hsl(var(--primary))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="method" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="total" fill="var(--color-total)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
