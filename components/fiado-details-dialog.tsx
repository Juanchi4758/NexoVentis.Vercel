"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { Fiado } from "@/lib/types"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, Loader2 } from "lucide-react"
import { addPaymentToFiado } from "@/lib/accounts-data"
import { format } from "date-fns"
import { es } from "date-fns/locale"

interface FiadoDetailsDialogProps {
  fiado: Fiado
}

export function FiadoDetailsDialog({ fiado }: FiadoDetailsDialogProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [paymentAmount, setPaymentAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState<"efectivo" | "tarjeta" | "transferencia">("efectivo")

  async function handleAddPayment(e: React.FormEvent) {
    e.preventDefault()
    if (!paymentAmount || Number(paymentAmount) <= 0) return

    setLoading(true)
    try {
      await addPaymentToFiado(fiado.id, Number(paymentAmount), paymentMethod)
      setPaymentAmount("")
      router.refresh()
    } catch (error) {
      console.error("Error al registrar pago:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Detalles del Fiado</DialogTitle>
          <DialogDescription className="text-base">{fiado.customerName}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Información del fiado */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
            <div>
              <p className="text-sm text-muted-foreground">Monto Total</p>
              <p className="text-xl font-bold">${fiado.amount.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pagado</p>
              <p className="text-xl font-bold text-secondary">${fiado.amountPaid.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pendiente</p>
              <p className="text-xl font-bold text-destructive">${fiado.amountPending.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Vencimiento</p>
              <p className="text-lg font-semibold">{format(new Date(fiado.dueDate), "dd/MM/yyyy", { locale: es })}</p>
            </div>
          </div>

          {fiado.notes && (
            <div>
              <p className="text-sm text-muted-foreground mb-1">Notas</p>
              <p className="text-base">{fiado.notes}</p>
            </div>
          )}

          {/* Registrar pago */}
          {fiado.status !== "pagado" && (
            <form onSubmit={handleAddPayment} className="space-y-4 border-t pt-4">
              <h3 className="font-semibold text-lg">Registrar Pago</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="paymentAmount" className="text-base">
                    Monto
                  </Label>
                  <Input
                    id="paymentAmount"
                    type="number"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    placeholder="0"
                    min="0"
                    max={fiado.amountPending}
                    step="0.01"
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paymentMethod" className="text-base">
                    Método
                  </Label>
                  <Select value={paymentMethod} onValueChange={(value: any) => setPaymentMethod(value)}>
                    <SelectTrigger className="h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="efectivo">Efectivo</SelectItem>
                      <SelectItem value="tarjeta">Tarjeta</SelectItem>
                      <SelectItem value="transferencia">Transferencia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button type="submit" disabled={loading || !paymentAmount} className="w-full h-11">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Registrando...
                  </>
                ) : (
                  "Registrar Pago"
                )}
              </Button>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
