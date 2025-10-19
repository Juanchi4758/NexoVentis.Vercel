"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { Sale } from "@/lib/types"
import { format, subDays } from "date-fns"
import { es } from "date-fns/locale"

interface RecentSalesChartProps {
  sales: Sale[]
}

export function RecentSalesChart({ sales }: RecentSalesChartProps) {
  // Agrupar ventas por día (últimos 7 días)
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), 6 - i)
    return {
      date,
      dateStr: format(date, "yyyy-MM-dd"),
      label: format(date, "EEE", { locale: es }),
    }
  })

  const chartData = last7Days.map((day) => {
    const daySales = sales.filter((s) => {
      const saleDate = format(new Date(s.date), "yyyy-MM-dd")
      return saleDate === day.dateStr
    })
    const total = daySales.reduce((sum, s) => sum + s.total, 0)
    return {
      day: day.label,
      ventas: total,
    }
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ventas de los Últimos 7 Días</CardTitle>
        <CardDescription>Evolución diaria de las ventas</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            ventas: {
              label: "Ventas",
              color: "hsl(var(--secondary))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="ventas" fill="var(--color-ventas)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
