/* eslint-disable no-unused-vars */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import authReducer from "./state/index.js";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
/*
1. Bạn khởi động app → Redux store được tạo với dữ liệu rỗng.
2. Redux Persist kiểm tra localStorage → nếu có dữ liệu cũ → phục hồi lại (rehydrate).
3. Khi user đăng nhập → state Redux thay đổi → Redux Persist lưu lại vào localStorage.
4. Khi reload trang → app tự động load lại state từ localStorage → không bị đăng xuất.
*/
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist"; // Thư viện để duy trì trạng thái Redux, ghi nhớ trạng thái vào localStorage khi tải lại trang web
// Các hằng số như FLUSH, REHYDRATE,... dùng để bỏ qua kiểm tra tuần tự hóa (serialization) trong Redux middleware — tránh cảnh báo lỗi
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import { PersistGate } from "redux-persist/integration/react"; // PersistGate để duy trì trạng thái

const persistConfig = {
    key: "root", // tên root key khi lưu vào localStorage
    version: 1, // phiên bản của cấu hình persist
    storage, // phương thức lưu trữ, ở đây sử dụng localStorage
};
const persistedReducer = persistReducer(persistConfig, authReducer); // persistReducer là wrapper quanh reducer gốc (authReducer), giúp Redux Persist quản lý việc lưu / phục hồi (persist & rehydrate) dữ liệu tự động.
export const store = configureStore({
    reducer: persistedReducer, // sử dụng persistedReducer (đã bọc persist)
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistStore(store)}>
                {/* PersistGate để trì hoãn việc render ứng dụng cho đến khi trạng thái được phục hồi từ localStorage */}
                <App />
            </PersistGate>
        </Provider>
    </StrictMode>
);
