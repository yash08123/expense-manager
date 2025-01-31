# Expense Tracker with Analysis

A full-stack expense tracking application featuring user authentication, transaction management, and expense analysis visualization built with Node.js, TypeScript, and PostgreSQL.

## Features

- 🔐 JWT-based User Authentication
- 💰 Transaction Management
- 📊 Expense Analysis with Pie Charts
- 🎯 Category-based Expense Tracking
- 📱 Simple and Intuitive UI

## Tech Stack

### Backend
- Node.js
- TypeScript
- Express.js
- JWT for authentication
- PostgreSQL database

### Frontend
- HTML/CSS
- JavaScript
- Chart.js (for pie chart visualization)

## Project Setup

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn package manager

### Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/expense_tracker
JWT_SECRET=your_jwt_secret
PORT=5001
```

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd expense-tracker
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. For frontend:
```bash
cd UI
```


4. Start the development servers:
```bash
# Backend
npm run dev

# Frontend 
cd UI
python -m http.server 3000
```

## API Documentation

### Authentication Endpoints

#### Register User
- **POST** `/api/auth/register`
- **Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```
- **Response:**
```json
{
  "message": "User registered successfully",
  "userId": "123"
}
```

#### Login
- **POST** `/api/auth/login`
- **Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```
- **Response:**
```json
{
  "token": "jwt_token_here",
  "userId": "123"
}
```

### Transaction Endpoints

#### Add Transaction
- **POST** `/api/transactions`
- **Headers:** `Authorization: Bearer <jwt_token>`
- **Body:**
```json
{
  "amount": 50.00,
  "category": "groceries",
  "date": "2024-03-20"
}
```
- **Response:**
```json
{
  "id": "456",
  "amount": 50.00,
  "category": "groceries",
  "date": "2024-03-20"
}
```

#### Delete Transaction
- **DELETE** `/api/transactions/:id`
- **Headers:** `Authorization: Bearer <jwt_token>`
- **Response:**
```json
{
  "message": "Transaction deleted successfully"
}
```

#### Get Expense Analysis
- **GET** `/api/transactions/analysis`
- **Headers:** `Authorization: Bearer <jwt_token>`
- **Response:**
```json
{
  "categories": [
    {
      "category": "groceries",
      "total": 150.00
    },
    {
      "category": "transportation",
      "total": 75.00
    }
  ]
}
```

## Security Considerations

- All passwords are hashed before storage
- JWT tokens are required for authenticated endpoints
- Environment variables are used for sensitive data
- API requests are validated using middleware







