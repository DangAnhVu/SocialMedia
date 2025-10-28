import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    try {
        let token = req.header("Authorization");
        // Kiểm tra xem token có tồn tại không
        if (!token) return res.status(403).send({ message: "Access Denied" }); // Không có quyền truy cập
        // Loại bỏ "Bearer " khỏi token
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft(); // Cắt bỏ "Bearer " và khoảng trắng
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET); // Xác minh token
        req.user = verified; // Gán thông tin người dùng vào req.user
        next(); // Chuyển sang middleware tiếp theo
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
