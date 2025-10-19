"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Pie, PieChart, Cell, ResponsiveContainer, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface FiadosStatusChartProps {
  fiadosByStatus: Record<string, number>
}

const STATUS_COLORS = {
  pendiente: "hsl(var(--destructive))",
  "pagado-parcial": "hsl(var(--chart-4))",
  pagado: "hsl(var(--secondary))",
}

const STATUS_LABELS = {
  pendiente: "Pendiente",
  "pagado-parcial": "Pago Parcial",
  pagado: "Pagado",
}

export function FiadosStatusChart({ fiadosByStatus }: FiadosStatusChartProps) {
  const chartData = Object.entries(fiadosByStatus).map(([status, count]) => ({
    name: STATUS_LABELS[status as keyof typeof STATUS_LABELS] || status,
    value: count,
    fill: STATUS_COLORS[status as keyof typeof STATUS_COLORS] || "hsl(var(--primary))",
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fiados por Estado</CardTitle>
        <CardDescription>Distribución de fiados según su estado de pago</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            fiados: {
              label: "Fiados",
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
