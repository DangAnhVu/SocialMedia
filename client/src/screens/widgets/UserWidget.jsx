/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined,
} from "@mui/icons-material";

import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "@/components/UserImage";
import FlexBetween from "@/components/FlexBetween";
import WidgetWrapper from "@/components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
const UserWidget = ({ userId, picturePath }) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const token = useSelector((state) => state.token);
    const dark = theme.palette.neutral.dark;
    const medium = theme.palette.neutral.medium;
    const main = theme.palette.neutral.main;
    const [user, setUser] = useState(null);

    // Hàm lấy dữ liệu người dùng từ API
    const getUserData = async () => {
        const response = await fetch(`http://localhost:3001/users/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }, // Thêm token vào header để xác thực
        });
        const data = await response.json(); // Chuyển đổi phản hồi thành JSON
        setUser(data); // Cập nhật trạng thái user với dữ liệu nhận được
    };

    // Sử dụng useEffect để gọi hàm getUserData khi component được gắn kết
    useEffect(() => {
        getUserData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (!user) {
        return null; // Nếu chưa có dữ liệu người dùng, không hiển thị gì
    }

    const {
        firstName,
        lastName,
        location,
        occupation,
        viewedProfile,
        impressions,
        friends,
    } = user;

    return (
        <WidgetWrapper>
            {/* FIRST ROW */}
            <FlexBetween
                gap="0.5rem"
                pb="1.1rem"
                onClick={() => navigate(`/profile/${userId}`)}
            >
                <FlexBetween gap="1rem">
                    <UserImage image={picturePath} />
                    <Box>
                        <Typography
                            variant="h4"
                            color={dark}
                            fontWeight="500"
                            sx={{
                                "&:hover": {
                                    color: main,
                                    cursor: "pointer",
                                },
                            }}
                        >
                            {firstName} {lastName}
                        </Typography>
                        <Typography color={medium}>
                            {friends.length} friends
                        </Typography>
                    </Box>
                </FlexBetween>
            </FlexBetween>
            <ManageAccountsOutlined />
            <Divider />
            {/* SECOND ROW */}
            <Box p="1rem 0">
                <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                    <LocationOnOutlined fontSize="large" sx={{ color: main }} />
                    <Typography color={medium}>{location}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                    <WorkOutlineOutlined
                        fontSize="large"
                        sx={{ color: main }}
                    />
                    <Typography color={medium}>{occupation}</Typography>
                </Box>
            </Box>
            <Divider />
            {/* THIRD ROW */}
            <Box p="1rem 0">
                <FlexBetween mb="0.5rem">
                    <Typography color={medium}>Profile Views</Typography>
                    <Typography color={main} fontWeight="500">
                        {viewedProfile}
                    </Typography>
                </FlexBetween>
                <FlexBetween mb="0.5rem">
                    <Typography color={medium}>Impressions</Typography>
                    <Typography color={main} fontWeight="500">
                        {impressions}
                    </Typography>
                </FlexBetween>
            </Box>
            <Divider />
            {/* FOURTH ROW */}
            <Box p="1rem 0">
                <Typography
                    fontSize="1rem"
                    color={main}
                    fontWeight="500"
                    mb="1rem"
                >
                    Social Profiles
                </Typography>
                <FlexBetween gap="1rem" mb="0.5rem">
                    <FlexBetween gap="1rem">
                        <img src="../assets/twitter.png" alt="twitter" />
                        <Box>
                            <Typography color={main} fontWeight="500">
                                Twitter
                            </Typography>
                            <Typography color={medium}>
                                Network Platform
                            </Typography>
                        </Box>
                    </FlexBetween>
                    <EditOutlinedIcon sx={{ color: main, cursor: "pointer" }} />
                </FlexBetween>
                <FlexBetween gap="1rem" mb="0.5rem">
                    <FlexBetween gap="1rem">
                        <img src="../assets/linkedin.png" alt="linkedin" />
                        <Box>
                            <Typography color={main} fontWeight="500">
                                Linked In
                            </Typography>
                            <Typography color={medium}>
                                Network Platform
                            </Typography>
                        </Box>
                    </FlexBetween>
                    <EditOutlinedIcon
                        sx={{ color: main, cursor: "pointer" }}
                        onClick={() => {}}
                    />
                </FlexBetween>
            </Box>
        </WidgetWrapper>
    );
};

export default UserWidget;
