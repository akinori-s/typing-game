import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import userRoutes from './routes/userRoutes';
import { logger } from './utils/logger';

const app: Application = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/users', userRoutes);
// Fallback route for unmatched endpoints
app.use('*', (req: Request, res: Response) => {
	res.status(404).json({
	  error: 'Not Found',
	  message: `The requested endpoint ${req.originalUrl} does not exist`,
	});
  });
  
// Start Server
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  app.listen(PORT, () => {
    logger(`Server running on port ${PORT}`);
  });
};

startServer();

export default app;
