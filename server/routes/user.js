import express from "express";
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
} from "../controllers/users.js";
import { veriryToken } from "../middleware/auth.js";

const router = express.Router();

// Lấy thông tin người dùng
router.get("/:id", veriryToken, getUser);

// Lấy danh sách bạn bè của người dùng
router.get("/:id/friends", veriryToken, getUserFriends);

// Thêm hoặc xóa bạn bè
router.patch("/:id/:friendId", veriryToken, addRemoveFriend);
