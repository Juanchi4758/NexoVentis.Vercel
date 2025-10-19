"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { markAllNotificationsAsRead } from "@/lib/notifications-data"

export function NotificationFilters() {
  const router = useRouter()

  async function handleMarkAllAsRead() {
    await markAllNotificationsAsRead()
    router.refresh()
  }

  return (
    <div className="flex gap-2">
      <Button variant="outline" onClick={handleMarkAllAsRead} className="h-10 bg-transparent">
        Marcar todas como leídas
      </Button>
    </div>
  )
}
