"use client"

import { useState } from "react"
import type { Fiado } from "@/lib/types"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FiadoDetailsDialog } from "@/components/fiado-details-dialog"
import { Search } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

interface FiadosTableProps {
  fiados: Fiado[]
}

export function FiadosTable({ fiados }: FiadosTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredFiados = fiados.filter((fiado) => {
    const matchesSearch = fiado.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || fiado.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: Fiado["status"]) => {
    switch (status) {
      case "pendiente":
        return <Badge variant="destructive">Pendiente</Badge>
      case "pagado-parcial":
        return <Badge className="bg-chart-4 text-white">Pago Parcial</Badge>
      case "pagado":
        return <Badge className="bg-secondary text-secondary-foreground">Pagado</Badge>
    }
  }

  const isOverdue = (fiado: Fiado) => {
    return fiado.status !== "pagado" && new Date(fiado.dueDate) < new Date()
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Buscar por cliente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-11"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px] h-11">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="pendiente">Pendiente</SelectItem>
            <SelectItem value="pagado-parcial">Pago Parcial</SelectItem>
            <SelectItem value="pagado">Pagado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Cliente</TableHead>
                <TableHead className="font-semibold">Teléfono</TableHead>
                <TableHead className="font-semibold">Monto Total</TableHead>
                <TableHead className="font-semibold">Pagado</TableHead>
                <TableHead className="font-semibold">Pendiente</TableHead>
                <TableHead className="font-semibold">Vencimiento</TableHead>
                <TableHead className="font-semibold">Estado</TableHead>
                <TableHead className="font-semibold text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFiados.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    No se encontraron fiados
                  </TableCell>
                </TableRow>
              ) : (
                filteredFiados.map((fiado) => (
                  <TableRow key={fiado.id} className={isOverdue(fiado) ? "bg-destructive/5" : "hover:bg-muted/30"}>
                    <TableCell className="font-medium">{fiado.customerName}</TableCell>
                    <TableCell>{fiado.customerPhone || "-"}</TableCell>
                    <TableCell>${fiado.amount.toLocaleString()}</TableCell>
                    <TableCell className="text-secondary font-semibold">${fiado.amountPaid.toLocaleString()}</TableCell>
                    <TableCell className="text-destructive font-semibold">
                      ${fiado.amountPending.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{format(new Date(fiado.dueDate), "dd/MM/yyyy", { locale: es })}</span>
                        {isOverdue(fiado) && <span className="text-xs text-destructive font-semibold">Vencido</span>}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(fiado.status)}</TableCell>
                    <TableCell className="text-right">
                      <FiadoDetailsDialog fiado={fiado} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
