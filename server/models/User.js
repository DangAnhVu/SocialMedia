import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        lastName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 5,
        },
        picturePath: {
            // đường dẫn ảnh đại diện
            type: String,
            default: "",
        },
        friends: {
            // danh sách bạn bè
            type: Array,
            default: [],
        },
        location: String, // trường địa điểm
        occupation: String, // trường nghề nghiệp
        viewedProfile: Number, // số lần xem profile
        impressions: Number, // số lần hiển thị bài viết
    },
    { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
