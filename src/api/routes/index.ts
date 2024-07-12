import express from 'express';
import systemController from '../controllers/system.controller';
import { getLogs } from '../controllers/logs.controller';

const router = express.Router();

router.get('/health-check', systemController.getHealthCheck);
router.get('/logs', getLogs);

export default router;
