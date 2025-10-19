"use server"

import type { Notification } from "./types"
import { getLowStockProducts, getOutOfStockProducts } from "./inventory-data"
import { getOverdueFiados, getPendingFiados } from "./accounts-data"

// Simulación de notificaciones - reemplazar con base de datos real
let mockNotifications: Notification[] = []

export async function generateAutomaticNotifications(): Promise<Notification[]> {
  const notifications: Notification[] = []

  // Notificaciones de bajo stock
  const lowStockProducts = await getLowStockProducts()
  for (const product of lowStockProducts) {
    notifications.push({
      id: `low-stock-${product.id}`,
      type: "bajo-stock",
      title: "Producto con bajo stock",
      message: `${product.name} tiene solo ${product.quantity} unidades disponibles`,
      priority: "media",
      read: false,
      createdAt: new Date(),
      relatedId: product.id,
      relatedType: "product",
    })
  }

  // Notificaciones de productos agotados
  const outOfStockProducts = await getOutOfStockProducts()
  for (const product of outOfStockProducts) {
    notifications.push({
      id: `out-stock-${product.id}`,
      type: "agotado",
      title: "Producto agotado",
      message: `${product.name} está agotado. Necesita reabastecimiento urgente`,
      priority: "alta",
      read: false,
      createdAt: new Date(),
      relatedId: product.id,
      relatedType: "product",
    })
  }

  // Notificaciones de fiados vencidos
  const overdueFiados = await getOverdueFiados()
  for (const fiado of overdueFiados) {
    notifications.push({
      id: `overdue-${fiado.id}`,
      type: "fiado-vencido",
      title: "Fiado vencido",
      message: `${fiado.customerName} tiene un pago vencido de $${fiado.amountPending.toLocaleString()}`,
      priority: "alta",
      read: false,
      createdAt: new Date(),
      relatedId: fiado.id,
      relatedType: "fiado",
    })
  }

  // Notificaciones de fiados próximos a vencer (3 días)
  const pendingFiados = await getPendingFiados()
  const threeDaysFromNow = new Date()
  threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3)

  for (const fiado of pendingFiados) {
    const dueDate = new Date(fiado.dueDate)
    if (dueDate <= threeDaysFromNow && dueDate > new Date()) {
      notifications.push({
        id: `upcoming-${fiado.id}`,
        type: "fiado-proximo",
        title: "Fiado próximo a vencer",
        message: `${fiado.customerName} tiene un pago pendiente de $${fiado.amountPending.toLocaleString()} que vence pronto`,
        priority: "media",
        read: false,
        createdAt: new Date(),
        relatedId: fiado.id,
        relatedType: "fiado",
      })
    }
  }

  return notifications
}

export async function getNotifications(): Promise<Notification[]> {
  // Generar notificaciones automáticas
  const autoNotifications = await generateAutomaticNotifications()

  // Combinar con notificaciones existentes (evitar duplicados)
  const existingIds = new Set(mockNotifications.map((n) => n.id))
  const newNotifications = autoNotifications.filter((n) => !existingIds.has(n.id))

  mockNotifications = [...newNotifications, ...mockNotifications].sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
  )

  return mockNotifications
}

export async function getUnreadNotifications(): Promise<Notification[]> {
  const notifications = await getNotifications()
  return notifications.filter((n) => !n.read)
}

export async function getNotificationsByPriority(priority: Notification["priority"]): Promise<Notification[]> {
  const notifications = await getNotifications()
  return notifications.filter((n) => n.priority === priority)
}

export async function markNotificationAsRead(id: string) {
  const notification = mockNotifications.find((n) => n.id === id)
  if (notification) {
    notification.read = true
    return { success: true }
  }
  return { success: false, error: "Notificación no encontrada" }
}

export async function markAllNotificationsAsRead() {
  mockNotifications.forEach((n) => {
    n.read = true
  })
  return { success: true }
}

export async function deleteNotification(id: string) {
  const index = mockNotifications.findIndex((n) => n.id === id)
  if (index === -1) {
    return { success: false, error: "Notificación no encontrada" }
  }
  mockNotifications.splice(index, 1)
  return { success: true }
}

export async function getNotificationStats() {
  const notifications = await getNotifications()
  const unread = notifications.filter((n) => !n.read).length
  const high = notifications.filter((n) => n.priority === "alta").length
  const medium = notifications.filter((n) => n.priority === "media").length
  const low = notifications.filter((n) => n.priority === "baja").length

  return {
    total: notifications.length,
    unread,
    high,
    medium,
    low,
  }
}
