import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/post.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts); // Lấy tất cả bài đăng cho feed
router.get("/:userId/posts", verifyToken, getUserPosts); // Lấy bài đăng của một người dùng cụ thể

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost); // Thích hoặc bỏ thích một bài đăng

export default router;
