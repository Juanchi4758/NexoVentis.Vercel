import { getNotifications, getNotificationStats } from "@/lib/notifications-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { NotificationsList } from "@/components/notifications-list"
import { NotificationFilters } from "@/components/notification-filters"
import { Bell, AlertCircle, Info } from "lucide-react"

export default async function NotificacionesPage() {
  const [notifications, stats] = await Promise.all([getNotifications(), getNotificationStats()])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl lg:text-4xl font-bold text-foreground">Notificaciones</h1>
        <p className="text-base lg:text-lg text-muted-foreground mt-1">Alertas y recordatorios del sistema</p>
      </div>

      {/* Estadísticas */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total</CardTitle>
            <Bell className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.total}</div>
            <p className="text-sm text-muted-foreground mt-1">Notificaciones</p>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Sin Leer</CardTitle>
            <Bell className="h-5 w-5 text-chart-3" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-chart-3">{stats.unread}</div>
            <p className="text-sm text-muted-foreground mt-1">Pendientes</p>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Prioridad Alta</CardTitle>
            <AlertCircle className="h-5 w-5 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive">{stats.high}</div>
            <p className="text-sm text-muted-foreground mt-1">Urgentes</p>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Prioridad Media</CardTitle>
            <Info className="h-5 w-5 text-chart-4" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.medium}</div>
            <p className="text-sm text-muted-foreground mt-1">Importantes</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros y lista */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="text-xl">Todas las Notificaciones</CardTitle>
            <NotificationFilters />
          </div>
        </CardHeader>
        <CardContent>
          <NotificationsList notifications={notifications} />
        </CardContent>
      </Card>
    </div>
  )
}
