import { getFiados } from "@/lib/accounts-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FiadosStatusChart } from "@/components/fiados-status-chart"
import { FiadosTimelineChart } from "@/components/fiados-timeline-chart"
import { Users, DollarSign, Clock } from "lucide-react"

export async function FiadosReportSection() {
  const fiados = await getFiados()

  const totalFiados = fiados.length
  const totalAmount = fiados.reduce((sum, f) => sum + f.amount, 0)
  const totalPending = fiados.reduce((sum, f) => sum + f.amountPending, 0)

  // Fiados por estado
  const fiadosByStatus = fiados.reduce(
    (acc, fiado) => {
      acc[fiado.status] = (acc[fiado.status] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Clientes</CardTitle>
            <Users className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalFiados}</div>
            <p className="text-sm text-muted-foreground mt-1">Con fiados registrados</p>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Monto Total</CardTitle>
            <DollarSign className="h-5 w-5 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${totalAmount.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground mt-1">Total fiado</p>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pendiente</CardTitle>
            <Clock className="h-5 w-5 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive">${totalPending.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground mt-1">Por cobrar</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <FiadosStatusChart fiadosByStatus={fiadosByStatus} />
        <FiadosTimelineChart fiados={fiados} />
      </div>
    </div>
  )
}
