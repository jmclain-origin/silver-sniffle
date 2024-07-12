import express from 'express';
import { basicGetRequest } from '../controllers/system.controller';
const router = express.Router();

router.get('/', basicGetRequest);

export default router;
