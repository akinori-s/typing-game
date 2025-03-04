import express, { Application } from 'express';
import { connectDB } from './config/db';
import * as userController from './controllers/userController'; // Import controllers
import { authMiddleware } from './middlewares/authMiddleware'; // Import middleware
import { logger } from './utils/logger';
import * as dotenv from 'dotenv';

dotenv.config();

const app: Application = express();

// Middleware
app.use(express.json());

// Routes (moved from userRoutes.ts)
app.get('/api/users', userController.getAllUsers);
app.get('/api/users/:id', userController.getUserById);
app.post('/api/users', authMiddleware, userController.createUser);

// Start Server
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    logger(`Server running on port ${PORT}`);
  });
};

startServer();

export default app;
