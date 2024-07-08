import express from 'express';
import dotenv from 'dotenv';
import { requestLogger } from './utils/middleware/logger';
import errorHandler from './utils/middleware/errorHandler';
import router from '@/routes';
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

// TODO: declare env vars in global file for intellisense
const PORT = process.env.PORT ?? 8080;
const app = express();

// Body Parser
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false }));
// Middleware
app.use(requestLogger);
// Routes
app.use('/api', router);
// * Error Handler middleware must be called after routes and all other middleware
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log('Server is running on http://localhost:3000');
});
