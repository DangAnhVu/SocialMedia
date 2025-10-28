/* eslint-disable no-unused-vars */
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "@/screens/homepage";
import LoginPage from "@/screens/loginPage";
import Navbar from "@/screens/navbar";
import ProfilePage from "@/screens/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

function App() {
    const mode = useSelector((state) => state.mode); // Lấy giá trị chế độ từ Redux store
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]); // Tạo chủ đề MUI dựa trên chế độ

    return (
        <div className="app">
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route
                            path="/profile/:userId"
                            element={<ProfilePage />}
                        />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </ThemeProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
