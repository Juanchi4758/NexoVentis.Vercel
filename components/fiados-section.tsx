import { getFiados, getPendingFiados, getOverdueFiados } from "@/lib/accounts-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FiadosTable } from "@/components/fiados-table"
import { AddFiadoDialog } from "@/components/add-fiado-dialog"
import { AlertCircle, Clock, DollarSign } from "lucide-react"

export async function FiadosSection() {
  const [allFiados, pendingFiados, overdueFiados] = await Promise.all([
    getFiados(),
    getPendingFiados(),
    getOverdueFiados(),
  ])

  const totalPending = pendingFiados.reduce((sum, f) => sum + f.amountPending, 0)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Fiados</h2>
        <AddFiadoDialog />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Pendiente</CardTitle>
            <DollarSign className="h-5 w-5 text-chart-3" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${totalPending.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground mt-1">{pendingFiados.length} clientes</p>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Vencidos</CardTitle>
            <AlertCircle className="h-5 w-5 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive">{overdueFiados.length}</div>
            <p className="text-sm text-muted-foreground mt-1">Requieren atención</p>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Fiados</CardTitle>
            <Clock className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{allFiados.length}</div>
            <p className="text-sm text-muted-foreground mt-1">Histórico completo</p>
          </CardContent>
        </Card>
      </div>

      <FiadosTable fiados={allFiados} />
    </div>
  )
}
