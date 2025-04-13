import express from 'express';
import { getStockDetails } from '../controllers/stockDetailController.js'; // Import the controller function

const router = express.Router();

router.get('/:symbol', getStockDetails); // ✅ match this with frontend call

export default router;