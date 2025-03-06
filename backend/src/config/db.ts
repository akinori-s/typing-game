import { Pool } from 'pg';
import * as dotenv from 'dotenv';

export const pool = new Pool({
    host: process.env.DATABASE_HOST || 'localhost',
    port: 5432,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
});
