"use server"

import type { Sale, Expense, Fiado, Payment } from "./types"

// Simulación de datos - reemplazar con base de datos real
const mockSales: Sale[] = [
  {
    id: "1",
    productId: "1",
    productName: "Arroz Diana 500g",
    quantity: 2,
    unitPrice: 2500,
    total: 5000,
    paymentMethod: "efectivo",
    date: new Date("2024-01-22T10:30:00"),
  },
  {
    id: "2",
    productId: "2",
    productName: "Aceite Girasol 1L",
    quantity: 1,
    unitPrice: 8500,
    total: 8500,
    paymentMethod: "tarjeta",
    date: new Date("2024-01-22T14:15:00"),
  },
  {
    id: "3",
    productId: "4",
    productName: "Pan Tajado",
    quantity: 3,
    unitPrice: 4500,
    total: 13500,
    paymentMethod: "fiado",
    customerId: "c1",
    customerName: "María González",
    date: new Date("2024-01-22T16:45:00"),
  },
]

const mockExpenses: Expense[] = [
  {
    id: "1",
    description: "Pago de arriendo local",
    category: "Arriendo",
    amount: 800000,
    date: new Date("2024-01-01"),
    paymentMethod: "transferencia",
  },
  {
    id: "2",
    description: "Servicios públicos",
    category: "Servicios",
    amount: 150000,
    date: new Date("2024-01-05"),
    paymentMethod: "efectivo",
  },
  {
    id: "3",
    description: "Compra de mercancía",
    category: "Inventario",
    amount: 2500000,
    date: new Date("2024-01-10"),
    paymentMethod: "transferencia",
  },
]

const mockFiados: Fiado[] = [
  {
    id: "1",
    customerId: "c1",
    customerName: "María González",
    customerPhone: "3001234567",
    amount: 45000,
    amountPaid: 20000,
    amountPending: 25000,
    status: "pagado-parcial",
    dueDate: new Date("2024-02-01"),
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-20"),
    notes: "Cliente frecuente",
  },
  {
    id: "2",
    customerId: "c2",
    customerName: "Carlos Ramírez",
    customerPhone: "3109876543",
    amount: 30000,
    amountPaid: 0,
    amountPending: 30000,
    status: "pendiente",
    dueDate: new Date("2024-01-25"),
    createdAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-01-18"),
  },
  {
    id: "3",
    customerId: "c3",
    customerName: "Ana Martínez",
    amount: 15000,
    amountPaid: 15000,
    amountPending: 0,
    status: "pagado",
    dueDate: new Date("2024-01-20"),
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-19"),
  },
]

const mockPayments: Payment[] = [
  {
    id: "1",
    fiadoId: "1",
    amount: 20000,
    date: new Date("2024-01-20"),
    paymentMethod: "efectivo",
  },
  {
    id: "2",
    fiadoId: "3",
    amount: 15000,
    date: new Date("2024-01-19"),
    paymentMethod: "efectivo",
  },
]

// Sales
export async function getSales(): Promise<Sale[]> {
  return mockSales.sort((a, b) => b.date.getTime() - a.date.getTime())
}

export async function createSale(data: Omit<Sale, "id">) {
  const newSale: Sale = {
    ...data,
    id: Date.now().toString(),
  }
  mockSales.push(newSale)
  return { success: true, sale: newSale }
}

// Expenses
export async function getExpenses(): Promise<Expense[]> {
  return mockExpenses.sort((a, b) => b.date.getTime() - a.date.getTime())
}

export async function createExpense(data: Omit<Expense, "id">) {
  const newExpense: Expense = {
    ...data,
    id: Date.now().toString(),
  }
  mockExpenses.push(newExpense)
  return { success: true, expense: newExpense }
}

export async function deleteExpense(id: string) {
  const index = mockExpenses.findIndex((e) => e.id === id)
  if (index === -1) {
    return { success: false, error: "Gasto no encontrado" }
  }
  mockExpenses.splice(index, 1)
  return { success: true }
}

// Fiados
export async function getFiados(): Promise<Fiado[]> {
  return mockFiados.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
}

export async function getFiado(id: string): Promise<Fiado | null> {
  return mockFiados.find((f) => f.id === id) || null
}

export async function getPendingFiados(): Promise<Fiado[]> {
  return mockFiados.filter((f) => f.status !== "pagado")
}

export async function getOverdueFiados(): Promise<Fiado[]> {
  const now = new Date()
  return mockFiados.filter((f) => f.status !== "pagado" && f.dueDate < now)
}

export async function createFiado(
  data: Omit<Fiado, "id" | "createdAt" | "updatedAt" | "amountPaid" | "amountPending" | "status">,
) {
  const newFiado: Fiado = {
    ...data,
    id: Date.now().toString(),
    amountPaid: 0,
    amountPending: data.amount,
    status: "pendiente",
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  mockFiados.push(newFiado)
  return { success: true, fiado: newFiado }
}

export async function addPaymentToFiado(fiadoId: string, amount: number, paymentMethod: Payment["paymentMethod"]) {
  const fiado = mockFiados.find((f) => f.id === fiadoId)
  if (!fiado) {
    return { success: false, error: "Fiado no encontrado" }
  }

  const newPayment: Payment = {
    id: Date.now().toString(),
    fiadoId,
    amount,
    date: new Date(),
    paymentMethod,
  }
  mockPayments.push(newPayment)

  fiado.amountPaid += amount
  fiado.amountPending = fiado.amount - fiado.amountPaid

  if (fiado.amountPending === 0) {
    fiado.status = "pagado"
  } else if (fiado.amountPaid > 0) {
    fiado.status = "pagado-parcial"
  }

  fiado.updatedAt = new Date()

  return { success: true, payment: newPayment, fiado }
}

export async function getPaymentsByFiado(fiadoId: string): Promise<Payment[]> {
  return mockPayments.filter((p) => p.fiadoId === fiadoId).sort((a, b) => b.date.getTime() - a.date.getTime())
}

// Cash Flow
export async function getCashFlow(startDate: Date, endDate: Date) {
  const sales = mockSales.filter((s) => s.date >= startDate && s.date <= endDate && s.paymentMethod !== "fiado")
  const expenses = mockExpenses.filter((e) => e.date >= startDate && e.date <= endDate)
  const payments = mockPayments.filter((p) => p.date >= startDate && p.date <= endDate)

  const totalIncome = sales.reduce((sum, s) => sum + s.total, 0) + payments.reduce((sum, p) => sum + p.amount, 0)
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0)
  const balance = totalIncome - totalExpenses

  return {
    totalIncome,
    totalExpenses,
    balance,
    sales: sales.length,
    expenses: expenses.length,
    payments: payments.length,
  }
}
