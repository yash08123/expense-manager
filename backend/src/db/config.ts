import { Pool } from 'pg';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../.env') });

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set');
}

// Create a single pool instance
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 1
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
});

export default pool; 