import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './db/config'; 
import authRoutes from './routes/auth';
import transactionRoutes from './routes/transactions';

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
