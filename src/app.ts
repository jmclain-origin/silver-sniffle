import express from 'express';
import dotenv from 'dotenv';
import { requestLogger } from '@/middleware/logger';
import errorHandler from '@/middleware/errorHandler';
import routes from '@/routes/index';
import publicRoutes from '@/routes/public';
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
app.use('/', publicRoutes);
app.use('/api', routes);
// * Error Handler middleware must be called after routes and all other middleware
app.use(errorHandler);

app.get('/', (_req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(
    'Server is running on port ' +
      PORT +
      ' in ' +
      process.env.NODE_ENV +
      ' mode on ' +
      process.env.DEPLOY_ENV +
      ' environment',
  );
});

export default app;
