import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './db/config'; // This will initialize the database connection
import authRoutes from './routes/auth';
import transactionRoutes from './routes/transactions';

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
