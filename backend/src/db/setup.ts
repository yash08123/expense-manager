import { Pool } from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';

dotenv.config({ path: path.join(__dirname, '../../.env') });

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set');
}

// Create connection configuration
const config = {
    connectionString: process.env.DATABASE_URL,
    ssl: true,
    statement_timeout: 0,
    query_timeout: 0,
    connectionTimeoutMillis: 10000,
    max: 1
};

console.log('Initializing connection with config:', {
    ...config,
    connectionString: config.connectionString.replace(/:[^:@]*@/, ':****@')
});

const pool = new Pool(config);

async function setupDatabase() {
    let client;
    try {
        console.log('Attempting to connect to database...');
        
        // Try to connect with retries
        for (let i = 0; i < 3; i++) {
            try {
                client = await pool.connect();
                console.log('Connected to database successfully');
                break;
            } catch (err) {
                if (i === 2) throw err;
                console.log(`Connection attempt ${i + 1} failed, retrying...`);
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
        }

        if (!client) {
            throw new Error('Failed to connect to database after 3 attempts');
        }

        // Read and execute the init.sql file
        console.log('Reading init.sql file...');
        const initSql = fs.readFileSync(path.join(__dirname, 'init.sql'), 'utf8');
        console.log('Executing database schema...');
        await client.query(initSql);
        console.log('Database schema created successfully');

        // Create a test user with properly hashed password
        console.log('Creating test user...');
        const hashedPassword = await bcrypt.hash('test123', 10);
        const testUser = {
            email: 'test@example.com',
            password: hashedPassword
        };

        const result = await client.query(
            'INSERT INTO users (email, password) VALUES ($1, $2) ON CONFLICT (email) DO NOTHING RETURNING id',
            [testUser.email, testUser.password]
        );

        if (result.rows.length > 0) {
            console.log('Test user created successfully with ID:', result.rows[0].id);
        } else {
            console.log('Test user already exists');
        }

        // Test database queries
        const users = await client.query('SELECT * FROM users');
        console.log('Current users in database:', users.rows);

    } catch (error) {
        console.error('Error setting up database:', error);
        throw error;
    } finally {
        if (client) {
            try {
                console.log('Releasing database client...');
                await client.release(true); // Force release
            } catch (err) {
                console.error('Error releasing client:', err);
            }
        }
        try {
            console.log('Closing database pool...');
            await pool.end();
        } catch (err) {
            console.error('Error closing pool:', err);
        }
    }
}

// Handle process termination
process.on('SIGINT', async () => {
    try {
        await pool.end();
    } catch (err) {
        console.error('Error during cleanup:', err);
    }
    process.exit(0);
});

setupDatabase()
    .then(() => {
        console.log('Database setup completed successfully');
        process.exit(0);
    })
    .catch(error => {
        console.error('Failed to setup database:', error);
        process.exit(1);
    }); 