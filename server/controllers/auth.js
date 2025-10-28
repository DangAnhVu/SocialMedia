import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Đăng ký người dùng
export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
        } = req.body;
        const salt = await bcrypt.genSalt(); // tạo salt để băm mật khẩu
        const passwordHash = await bcrypt.hash(password, salt); // băm mật khẩu với salt
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash, // lưu mật khẩu đã băm
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000), // khởi tạo số lần xem profile ngẫu nhiên
            impressions: Math.floor(Math.random() * 10000), // khởi tạo số lần hiển thị bài viết ngẫu nhiên
        });
        const savedUser = await newUser.save();
        res.status(201).json({ success: true, user: savedUser }); // trả về người dùng đã lưu
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Đăng nhập người dùng
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email }); // tìm người dùng theo email
        if (!user)
            return res.status(400).json({ message: "User does not exist. " });
        const isMatch = await bcrypt.compare(password, user.password); // so sánh mật khẩu nhập vào với mật khẩu đã băm
        if (!isMatch)
            return res.status(400).json({ message: "Invalid credentials. " });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET); // tạo token với id người dùng và secret key
        delete user.password; // xóa trường password trước khi trả về
        res.status(200).json({ token, user }); // trả về token và thông tin người dùng
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
