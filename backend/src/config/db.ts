import { DataSource } from 'typeorm';
import 'reflect-metadata';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false, // Disable schema synchronization
  logging: true,
  // entities: [], // Optional: Remove if not using entities for ORM
  // migrations: [], // Uncomment and use if you switch to migrations later
});

export const connectDB = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Database connected');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};
