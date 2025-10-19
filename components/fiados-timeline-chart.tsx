"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { Fiado } from "@/lib/types"
import { format, startOfMonth, endOfMonth, eachMonthOfInterval, subMonths } from "date-fns"
import { es } from "date-fns/locale"

interface FiadosTimelineChartProps {
  fiados: Fiado[]
}

export function FiadosTimelineChart({ fiados }: FiadosTimelineChartProps) {
  // Últimos 6 meses
  const months = eachMonthOfInterval({
    start: subMonths(new Date(), 5),
    end: new Date(),
  })

  const chartData = months.map((month) => {
    const monthStart = startOfMonth(month)
    const monthEnd = endOfMonth(month)

    const monthFiados = fiados.filter((f) => {
      const fiadoDate = new Date(f.createdAt)
      return fiadoDate >= monthStart && fiadoDate <= monthEnd
    })

    const totalAmount = monthFiados.reduce((sum, f) => sum + f.amount, 0)

    return {
      month: format(month, "MMM", { locale: es }),
      monto: totalAmount,
    }
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Evolución de Fiados</CardTitle>
        <CardDescription>Monto total de fiados por mes (últimos 6 meses)</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            monto: {
              label: "Monto",
              color: "hsl(var(--chart-3))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="monto" fill="var(--color-monto)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
