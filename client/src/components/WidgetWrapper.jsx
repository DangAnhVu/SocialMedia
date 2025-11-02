import { styled } from "@mui/system";
import { Box } from "@mui/material";

// WidgetWrapper component sử dụng styled từ MUI để tạo một hộp với các kiểu dáng cụ thể
const WidgetWrapper = styled(Box)(({ theme }) => ({
    padding: "1.5rem 1.5rem 0.75rem 1.5rem",
    borderRadius: "0.75rem",
    backgroundColor: theme.palette.background.alt,
}));

export default WidgetWrapper;
