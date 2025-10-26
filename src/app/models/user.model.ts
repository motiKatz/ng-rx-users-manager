export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
}

export interface Order {
  id: number;
  userId: number;
  amount: number;
  date: string;
  description: string;
}

export interface UserSummary {
  userName: string;
  totalOrdersAmount: number;
}
