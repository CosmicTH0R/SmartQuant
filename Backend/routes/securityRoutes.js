import { Router } from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import { changePassword, setup2FA, verify2FA, disable2FA, signOutAllDevices } from '../controllers/securityController.js';

const router = Router();

// Apply the authenticate middleware to the routes that need authentication
router.post('/change-password', authenticate, changePassword);
router.post('/setup-2fa', authenticate, setup2FA);
router.post('/verify-2fa', authenticate, verify2FA);
router.post('/disable-2fa', authenticate, disable2FA);
router.post('/signout-all', authenticate, signOutAllDevices);

export default router;
