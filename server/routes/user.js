import express from "express";
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
} from "../controllers/user.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Lấy thông tin người dùng
router.get("/:id", verifyToken, getUser);

// Lấy danh sách bạn bè của người dùng
router.get("/:id/friends", verifyToken, getUserFriends);

// Thêm hoặc xóa bạn bè
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;
