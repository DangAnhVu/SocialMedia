import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "@/screens/homepage";
import LoginPage from "@/screens/loginPage";
import Navbar from "@/screens/navbar";
import ProfilePage from "@/screens/profilePage";

function App() {
    return (
        <div className="app">
            <p>Hello World</p>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/profile/:userId" element={<ProfilePage />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
