"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { Notification } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertCircle, Package, Receipt, Info, Check, Trash2 } from "lucide-react"
import { markNotificationAsRead, deleteNotification } from "@/lib/notifications-data"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import Link from "next/link"

interface NotificationsListProps {
  notifications: Notification[]
}

export function NotificationsList({ notifications }: NotificationsListProps) {
  const router = useRouter()
  const [filter, setFilter] = useState<"all" | "unread" | "alta" | "media">("all")

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "all") return true
    if (filter === "unread") return !n.read
    return n.priority === filter
  })

  async function handleMarkAsRead(id: string) {
    await markNotificationAsRead(id)
    router.refresh()
  }

  async function handleDelete(id: string) {
    await deleteNotification(id)
    router.refresh()
  }

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "bajo-stock":
      case "agotado":
        return <Package className="h-5 w-5" />
      case "fiado-vencido":
      case "fiado-proximo":
        return <Receipt className="h-5 w-5" />
      default:
        return <Info className="h-5 w-5" />
    }
  }

  const getPriorityBadge = (priority: Notification["priority"]) => {
    switch (priority) {
      case "alta":
        return <Badge variant="destructive">Alta</Badge>
      case "media":
        return <Badge className="bg-chart-4 text-white">Media</Badge>
      case "baja":
        return <Badge variant="outline">Baja</Badge>
    }
  }

  const getNotificationLink = (notification: Notification) => {
    if (notification.relatedType === "product") {
      return "/dashboard/inventario"
    }
    if (notification.relatedType === "fiado") {
      return "/dashboard/cuentas?tab=fiados"
    }
    return "#"
  }

  if (filteredNotifications.length === 0) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-lg text-muted-foreground">No hay notificaciones</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {filteredNotifications.map((notification) => (
        <div
          key={notification.id}
          className={`flex items-start gap-4 p-4 rounded-lg border-2 transition-all ${
            notification.read ? "bg-background border-border" : "bg-accent/50 border-primary/30"
          }`}
        >
          <div
            className={`p-3 rounded-lg ${
              notification.priority === "alta"
                ? "bg-destructive/10 text-destructive"
                : notification.priority === "media"
                  ? "bg-chart-4/10 text-chart-4"
                  : "bg-muted text-muted-foreground"
            }`}
          >
            {getIcon(notification.type)}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="font-semibold text-base">{notification.title}</h3>
              {getPriorityBadge(notification.priority)}
            </div>
            <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>{format(new Date(notification.createdAt), "dd/MM/yyyy HH:mm", { locale: es })}</span>
              {notification.relatedType && (
                <Link href={getNotificationLink(notification)} className="text-primary hover:underline">
                  Ver detalles
                </Link>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            {!notification.read && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleMarkAsRead(notification.id)}
                className="h-9 w-9"
                title="Marcar como leída"
              >
                <Check className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDelete(notification.id)}
              className="h-9 w-9 text-destructive hover:text-destructive"
              title="Eliminar"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
