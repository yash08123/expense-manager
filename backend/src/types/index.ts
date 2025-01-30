export interface User {
  id: number;
  email: string;
  password: string;
  created_at: Date;
}

export interface Transaction {
  id: number;
  user_id: number;
  amount: number;
  category: string;
  date: Date;
  created_at: Date;
}

export interface RegisterUserDto {
  email: string;
  password: string;
}

export interface LoginUserDto {
  email: string;
  password: string;
}

export interface CreateTransactionDto {
  amount: number;
  category: string;
  date: string;
}

export interface JwtPayload {
  userId: number;
  email: string;
} 