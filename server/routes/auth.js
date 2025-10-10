import express from "express";
import { login } from "../controllers/auth.js";

const router = express.Router();

// Route đăng nhập người dùng
router.post("/login", login);

export default router;
