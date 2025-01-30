import express from 'express';
import { auth } from '../middleware/auth';
import pool from '../db/config';
import { CreateTransactionDto } from '../types';

const router = express.Router();

// Get all transactions for a user
router.get('/', auth, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM transactions WHERE user_id = $1 ORDER BY date DESC',
      [req.user!.userId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Error fetching transactions' });
  }
});

// Add a new transaction
router.post('/', auth, async (req, res) => {
  try {
    const { amount, category, date }: CreateTransactionDto = req.body;

    // Input validation
    if (!amount || !category || !date) {
      return res.status(400).json({ error: 'Amount, category, and date are required' });
    }

    const result = await pool.query(
      'INSERT INTO transactions (user_id, amount, category, date) VALUES ($1, $2, $3, $4) RETURNING *',
      [req.user!.userId, amount, category, date]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({ error: 'Error creating transaction' });
  }
});

// Delete a transaction
router.delete('/:id', auth, async (req, res) => {
  try {
    const result = await pool.query(
      'DELETE FROM transactions WHERE id = $1 AND user_id = $2 RETURNING *',
      [req.params.id, req.user!.userId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    
    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    res.status(500).json({ error: 'Error deleting transaction' });
  }
});

// Get expense summary by category
router.get('/summary', auth, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT category, SUM(amount) as total
       FROM transactions 
       WHERE user_id = $1 
       GROUP BY category 
       ORDER BY total DESC`,
      [req.user!.userId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching expense summary:', error);
    res.status(500).json({ error: 'Error fetching expense summary' });
  }
});

export default router; 