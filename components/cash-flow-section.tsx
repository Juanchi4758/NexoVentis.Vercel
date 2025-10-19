"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, DollarSign, Loader2 } from "lucide-react"
import { getCashFlow } from "@/lib/accounts-data"

export function CashFlowSection() {
  const [loading, setLoading] = useState(false)
  const [startDate, setStartDate] = useState(() => {
    const date = new Date()
    date.setDate(1)
    return date.toISOString().split("T")[0]
  })
  const [endDate, setEndDate] = useState(() => new Date().toISOString().split("T")[0])
  const [cashFlow, setCashFlow] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
    sales: 0,
    expenses: 0,
    payments: 0,
  })

  async function loadCashFlow() {
    setLoading(true)
    try {
      const data = await getCashFlow(new Date(startDate), new Date(endDate))
      setCashFlow(data)
    } catch (error) {
      console.error("Error al cargar flujo de caja:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCashFlow()
  }, [])

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Flujo de Caja</h2>

      <Card>
        <CardHeader>
          <CardTitle>Filtrar por Fecha</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="startDate">Fecha Inicio</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="h-11"
              />
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="endDate">Fecha Fin</Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="h-11"
              />
            </div>
            <div className="flex items-end">
              <Button onClick={loadCashFlow} disabled={loading} className="h-11 px-8">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Consultar"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Ingresos</CardTitle>
            <TrendingUp className="h-5 w-5 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-secondary">${cashFlow.totalIncome.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground mt-1">
              {cashFlow.sales} ventas + {cashFlow.payments} pagos
            </p>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Egresos</CardTitle>
            <TrendingDown className="h-5 w-5 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive">${cashFlow.totalExpenses.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground mt-1">{cashFlow.expenses} gastos</p>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Balance</CardTitle>
            <DollarSign className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${cashFlow.balance >= 0 ? "text-secondary" : "text-destructive"}`}>
              ${cashFlow.balance.toLocaleString()}
            </div>
            <p className="text-sm text-muted-foreground mt-1">{cashFlow.balance >= 0 ? "Positivo" : "Negativo"}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
