import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light", // chế độ giao diện sáng
    user: null, // thông tin người dùng hiện tại
    token: null, // mã thông báo xác thực
    posts: [], // danh sách bài viết
};

export const authSlice = createSlice({
    name: "auth", // tên của slice
    initialState, // trạng thái ban đầu
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light"; // chuyển đổi chế độ giao diện
        },
        setLogin: (state, action) => {
            state.user = action.payload.user; // cập nhật thông tin người dùng
            state.token = action.payload.token; // cập nhật mã thông báo xác thực
        },
        setLogout: (state) => {
            state.user = null; // xóa thông tin người dùng
            state.token = null; // xóa mã thông báo xác thực
        },
        setFiends: (state, action) => {
            if (state.user) {
                state.user.friends = action.payload.friends; // cập nhật danh sách bạn bè của người dùng
            } else {
                console.error("User friends non-existent :("); // thông báo lỗi nếu không có người dùng
            }
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts; // cập nhật danh sách bài viết
        },
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload.post._id) {
                    return action.payload.post; // cập nhật bài viết cụ thể
                }
                return post; // giữ nguyên các bài viết khác
            });
            state.posts = updatedPosts; // cập nhật lại danh sách bài viết
        },
    },
});

export const { setMode, setLogin, setLogout, setFiends, setPosts, setPost } =
    authSlice.actions;
export default authSlice.reducer;
