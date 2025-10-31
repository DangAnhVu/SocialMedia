/* eslint-disable no-unused-vars */
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Form from "./Form";

const LoginPage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const theme = useTheme(); // Lấy theme từ MUI
    return (
        <Box>
            <Box
                width={isNonMobileScreens ? "50%" : "93%"} // Điều chỉnh chiều rộng dựa trên kích thước màn hình
                p="2rem"
                margin="2rem auto"
                borderRadius="1.5rem"
                backgroundColor={theme.palette.background.alt}
            >
                <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
                    Welcome To SocialMedia!
                </Typography>
                <Form />
            </Box>
        </Box>
    );
};

export default LoginPage;
