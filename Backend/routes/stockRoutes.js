import express from 'express';
import { getStockSlides } from '../controllers/stockController.js';

const router = express.Router();

router.get('/slides', getStockSlides);

export default router;
