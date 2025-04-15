export interface Payment {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export interface User {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export interface Role {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}