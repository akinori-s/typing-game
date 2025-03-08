import express, { Application, Request, Response } from 'express';
import { createServer } from 'http';
import { setupWebSocket } from './controllers/wsController';
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

const server = createServer(app);
setupWebSocket(server);

// Start Server
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  server.listen(PORT, () => {
    logger(`Server running on port ${PORT}`);
  });
};

startServer();
