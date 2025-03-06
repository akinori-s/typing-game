import express, { Application } from 'express';
import morgan from 'morgan';
import * as userController from './controllers/userController'; // Import controllers
import { authMiddleware } from './middlewares/authMiddleware'; // Import middleware
import { logger } from './utils/logger';

const app: Application = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/users', userController.getAllUsers);
// app.get('/api/users/:id', userController.getUserById);
app.post('/api/users', userController.createUser);

// Start Server
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  app.listen(PORT, () => {
    logger(`Server running on port ${PORT}`);
  });
};

startServer();

export default app;
