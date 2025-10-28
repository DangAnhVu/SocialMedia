import User from "../models/User.js";
// Lấy thông tin người dùng theo ID
export const getUser = async (req, res) => {
    try {
        const { id } = req.params; // Lấy ID từ tham số URL
        const user = await User.findById(id); // Tìm người dùng trong cơ sở dữ liệu
        if (!user) {
            return res.status(404).json({ message: "User not found" }); // Trả về lỗi nếu không tìm thấy người dùng
        }
        res.status(200).json(user); // Trả về thông tin người dùng
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Lấy danh sách bạn bè của người dùng
export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params; // Lấy ID từ tham số URL
        const user = await User.findById(id); // Tìm người dùng trong cơ sở dữ liệu
        if (!user) {
            return res.status(404).json({ message: "User not found" }); // Trả về lỗi nếu không tìm thấy người dùng
        }
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id)) // Tìm tất cả bạn bè của người dùng
        ); // Sử dụng Promise.all để chờ tất cả các truy vấn hoàn thành

        const formattedFriends = friends.map(
            ({
                _id,
                firstName,
                lastName,
                occupation,
                location,
                picturePath,
            }) => {
                return {
                    _id,
                    firstName,
                    lastName,
                    occupation,
                    location,
                    picturePath,
                }; // Định dạng thông tin bạn bè
            }
        );
        res.status(200).json(formattedFriends); // Trả về danh sách bạn bè đã định dạng
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Thêm hoặc xóa bạn bè
export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params; // Lấy ID người dùng và ID bạn bè từ tham số URL
        const user = await User.findById(id); // Tìm người dùng trong cơ sở dữ liệu
        if (!user) {
            return res.status(404).json({ message: "User not found" }); // Trả về lỗi nếu không tìm thấy người dùng
        }
        const friend = await User.findById(friendId); // Tìm bạn bè trong cơ sở dữ liệu
        if (!friend) {
            return res.status(404).json({ message: "Friend not found" }); // Trả về lỗi nếu không tìm thấy bạn bè
        }
        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId); // Xóa bạn bè khỏi danh sách bạn bè
            friend.friends = friend.friends.filter((id) => id !== id); // Xóa người dùng khỏi danh sách bạn bè của bạn bè
        } else {
            user.friends.push(friendId); // Thêm bạn bè vào danh sách bạn bè
            friend.friends.push(id); // Thêm người dùng vào danh sách bạn bè của bạn bè
        }
        await user.save(); // Lưu thay đổi cho người dùng
        await friend.save(); // Lưu thay đổi cho bạn bè

        // Lấy lại danh sách bạn bè đã cập nhật
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id)) // Tìm tất cả bạn bè của người dùng
        ); // Sử dụng Promise.all để chờ tất cả các truy vấn hoàn thành

        const formattedFriends = friends.map(
            ({
                _id,
                firstName,
                lastName,
                occupation,
                location,
                picturePath,
            }) => {
                return {
                    _id,
                    firstName,
                    lastName,
                    occupation,
                    location,
                    picturePath,
                }; // Định dạng thông tin bạn bè
            }
        );
        res.status(200).json(formattedFriends); // Trả về danh sách bạn bè đã định dạng
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
