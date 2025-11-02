/* eslint-disable react/prop-types */
import { Box } from "@mui/material";

// UserImage component sử dụng styled từ MUI để tạo một hình ảnh người dùng với các kiểu dáng cụ thể
const UserImage = ({ image, size = "60px" }) => {
    return (
        <Box>
            <img
                src={`http://localhost:3001/assets/${image}`}
                alt="user"
                style={{
                    borderRadius: "50%",
                    objectFit: "cover",
                }}
                width={size}
                height={size}
            />
        </Box>
    );
};

export default UserImage;
