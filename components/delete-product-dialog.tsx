"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Trash2, Loader2 } from "lucide-react"
import { deleteProduct } from "@/lib/inventory-data"

interface DeleteProductDialogProps {
  productId: string
  productName: string
}

export function DeleteProductDialog({ productId, productName }: DeleteProductDialogProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    setLoading(true)
    try {
      await deleteProduct(productId)
      setOpen(false)
      router.refresh()
    } catch (error) {
      console.error("Error al eliminar producto:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 text-destructive hover:text-destructive">
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl">¿Eliminar producto?</AlertDialogTitle>
          <AlertDialogDescription className="text-base">
            Estás a punto de eliminar <span className="font-semibold text-foreground">{productName}</span>. Esta acción
            no se puede deshacer.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex gap-3 mt-4">
          <Button variant="outline" onClick={() => setOpen(false)} className="flex-1 h-11">
            Cancelar
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={loading} className="flex-1 h-11">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Eliminando...
              </>
            ) : (
              "Eliminar"
            )}
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}
