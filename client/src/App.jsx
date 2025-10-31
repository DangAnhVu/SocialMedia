/* eslint-disable no-unused-vars */
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "@/screens/homepage";
import LoginPage from "@/screens/loginPage";
import Navbar from "@/screens/navbar";
import ProfilePage from "@/screens/profilePage";
import ErrorPage from "@/screens/errorPage";

import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

function App() {
    const mode = useSelector((state) => state.mode); // lấy giá trị mode từ Redux store
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]); // tạo theme dựa trên mode
    const isAuth = Boolean(useSelector((state) => state.token)); // kiểm tra xem người dùng đã đăng nhập hay chưa

    return (
        <div className="app">
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Navbar />
                    <Routes>
                        <Route
                            path="/"
                            element={
                                isAuth ? <HomePage /> : <Navigate to="/login" />
                            }
                        />
                        <Route path="/login" element={<LoginPage />} />
                        <Route
                            path="/profile/:userId"
                            element={
                                isAuth ? (
                                    <ProfilePage />
                                ) : (
                                    <Navigate to="/login" />
                                )
                            }
                        />
                        <Route path="*" element={<ErrorPage />} />
                    </Routes>
                </ThemeProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
