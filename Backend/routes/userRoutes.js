import express from "express";
import { getMe,updateProfilePhoto,updateUserProfile } from "../controllers/userController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.put("/profile-photo", authenticate, updateProfilePhoto);
router.get("/me", authenticate, getMe);
router.put("/profile-update", authenticate, updateUserProfile);

export default router;

