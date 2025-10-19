"use server"

import type { Product, Category } from "./types"

// Simulación de datos - reemplazar con base de datos real
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Arroz Diana 500g",
    category: "Granos",
    price: 2500,
    quantity: 45,
    minStock: 10,
    status: "disponible",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    name: "Aceite Girasol 1L",
    category: "Aceites",
    price: 8500,
    quantity: 3,
    minStock: 5,
    status: "bajo-stock",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    id: "3",
    name: "Leche Entera 1L",
    category: "Lácteos",
    price: 3200,
    quantity: 0,
    minStock: 8,
    status: "agotado",
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-22"),
  },
  {
    id: "4",
    name: "Pan Tajado",
    category: "Panadería",
    price: 4500,
    quantity: 12,
    minStock: 5,
    status: "disponible",
    createdAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-01-18"),
  },
  {
    id: "5",
    name: "Azúcar 1kg",
    category: "Granos",
    price: 3800,
    quantity: 28,
    minStock: 10,
    status: "disponible",
    createdAt: new Date("2024-01-14"),
    updatedAt: new Date("2024-01-14"),
  },
]

const mockCategories: Category[] = [
  { id: "1", name: "Granos", color: "#3b82f6" },
  { id: "2", name: "Aceites", color: "#10b981" },
  { id: "3", name: "Lácteos", color: "#8b5cf6" },
  { id: "4", name: "Panadería", color: "#f59e0b" },
  { id: "5", name: "Bebidas", color: "#ec4899" },
  { id: "6", name: "Aseo", color: "#06b6d4" },
]

export async function getProducts(): Promise<Product[]> {
  return mockProducts
}

export async function getProduct(id: string): Promise<Product | null> {
  return mockProducts.find((p) => p.id === id) || null
}

export async function getCategories(): Promise<Category[]> {
  return mockCategories
}

export async function getLowStockProducts(): Promise<Product[]> {
  return mockProducts.filter((p) => p.quantity <= p.minStock && p.quantity > 0)
}

export async function getOutOfStockProducts(): Promise<Product[]> {
  return mockProducts.filter((p) => p.quantity === 0)
}

function determineStatus(quantity: number, minStock: number): Product["status"] {
  if (quantity === 0) return "agotado"
  if (quantity <= minStock) return "bajo-stock"
  return "disponible"
}

export async function createProduct(data: Omit<Product, "id" | "createdAt" | "updatedAt" | "status">) {
  const newProduct: Product = {
    ...data,
    id: Date.now().toString(),
    status: determineStatus(data.quantity, data.minStock),
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  mockProducts.push(newProduct)
  return { success: true, product: newProduct }
}

export async function updateProduct(id: string, data: Partial<Omit<Product, "id" | "createdAt" | "updatedAt">>) {
  const index = mockProducts.findIndex((p) => p.id === id)
  if (index === -1) {
    return { success: false, error: "Producto no encontrado" }
  }

  const updatedProduct = {
    ...mockProducts[index],
    ...data,
    status: determineStatus(
      data.quantity ?? mockProducts[index].quantity,
      data.minStock ?? mockProducts[index].minStock,
    ),
    updatedAt: new Date(),
  }

  mockProducts[index] = updatedProduct
  return { success: true, product: updatedProduct }
}

export async function deleteProduct(id: string) {
  const index = mockProducts.findIndex((p) => p.id === id)
  if (index === -1) {
    return { success: false, error: "Producto no encontrado" }
  }

  mockProducts.splice(index, 1)
  return { success: true }
}

export async function updateStock(id: string, quantityChange: number) {
  const product = mockProducts.find((p) => p.id === id)
  if (!product) {
    return { success: false, error: "Producto no encontrado" }
  }

  const newQuantity = Math.max(0, product.quantity + quantityChange)
  return updateProduct(id, { quantity: newQuantity })
}
