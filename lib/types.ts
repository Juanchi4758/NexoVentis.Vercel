export interface Product {
  id: string
  name: string
  category: string
  price: number
  quantity: number
  minStock: number
  status: "disponible" | "bajo-stock" | "agotado"
  createdAt: Date
  updatedAt: Date
}

export interface Category {
  id: string
  name: string
  color: string
}

export interface Sale {
  id: string
  productId: string
  productName: string
  quantity: number
  unitPrice: number
  total: number
  paymentMethod: "efectivo" | "tarjeta" | "transferencia" | "fiado"
  date: Date
  customerId?: string
  customerName?: string
}

export interface Expense {
  id: string
  description: string
  category: string
  amount: number
  date: Date
  paymentMethod: "efectivo" | "tarjeta" | "transferencia"
}

export interface Fiado {
  id: string
  customerId: string
  customerName: string
  customerPhone?: string
  amount: number
  amountPaid: number
  amountPending: number
  status: "pendiente" | "pagado-parcial" | "pagado"
  dueDate: Date
  createdAt: Date
  updatedAt: Date
  notes?: string
}

export interface Payment {
  id: string
  fiadoId: string
  amount: number
  date: Date
  paymentMethod: "efectivo" | "tarjeta" | "transferencia"
}

export interface Notification {
  id: string
  type: "bajo-stock" | "agotado" | "fiado-vencido" | "fiado-proximo" | "info"
  title: string
  message: string
  priority: "alta" | "media" | "baja"
  read: boolean
  createdAt: Date
  relatedId?: string
  relatedType?: "product" | "fiado"
}
