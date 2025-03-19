// firewall-module-backend/src/routes/authRoutes.js
import express from "express";
import { signUp, signIn } from "../controllers/authController.js";

const router = express.Router();

// Sign-up route
router.post("/auth/signup", signUp);

// Sign-in (Login) route
router.post("/auth/login", signIn);

export default router;
