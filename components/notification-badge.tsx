import { getUnreadNotifications } from "@/lib/notifications-data"
import { Badge } from "@/components/ui/badge"

export async function NotificationBadge() {
  const unreadNotifications = await getUnreadNotifications()
  const count = unreadNotifications.length

  if (count === 0) return null

  return (
    <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 min-w-5 flex items-center justify-center p-1">
      {count > 9 ? "9+" : count}
    </Badge>
  )
}
