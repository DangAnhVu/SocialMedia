/* eslint-disable no-unused-vars */
import {
    Box,
    Button,
    TextField,
    Typography,
    useTheme,
    useMediaQuery,
    IconButton,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik"; // Thư viện Formik để quản lý form và validation
import * as yup from "yup"; // Thư viện Yup để tạo schema validation
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "@/state/index";
import Dropzone from "react-dropzone"; // Thư viện Dropzone để xử lý việc tải lên tệp
import FlexBetween from "@/components/FlexBetween";
import { useState } from "react";

/* Validation Schema */
const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
    picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
});

const initValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture: "",
};

const initValuesLogin = {
    email: "",
    password: "",
};

const Form = () => {
    const [pageType, setPageType] = useState("register"); // trạng thái của trang hiện tại (login/register)
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";

    const login = async (values, onSubmitProps) => {
        // Gọi API đăng nhập ở đây
        const savedUserResponse = await fetch(
            "http://localhost:3001/auth/login",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            }
        );
        const loggedIn = await savedUserResponse.json();
        onSubmitProps.resetForm();
        if (loggedIn) {
            dispatch(
                setLogin({
                    user: loggedIn.user,
                    token: loggedIn.token,
                })
            );
            navigate("/"); // Chuyển hướng đến trang chủ sau khi đăng nhập thành công
        }
    };

    const register = async (values, onSubmitProps) => {
        // Gọi API đăng ký ở đây
        const formData = new FormData(); // Tạo một đối tượng FormData để gửi dữ liệu
        for (let value in values) {
            formData.append(value, values[value]);
        }
        formData.append("picturePath", values.picture.name);
        const savedUserResponse = await fetch(
            "http://localhost:3001/auth/register",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: formData,
            }
        );
        const savedUser = await savedUserResponse.json();
        onSubmitProps.resetForm();

        if (savedUser) {
            setPageType("login"); // Chuyển sang trang đăng nhập sau khi đăng ký thành công
        }
    };

    const handleFormSubmit = async (values, onSubmitProps) => {
        if (isLogin) await login(values, onSubmitProps); // Gọi hàm login nếu đang ở trang đăng nhập
        if (isRegister) await register(values, onSubmitProps); // Gọi hàm register nếu đang ở trang đăng ký
    };

    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={isLogin ? initValuesLogin : initValuesRegister}
            validationSchema={isLogin ? loginSchema : registerSchema}
        >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm,
            }) => (
                <form onSubmit={handleSubmit}>
                    <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                            "& > div": {
                                gridColumn: isNonMobile ? undefined : "span 4",
                            },
                        }}
                    >
                        {isRegister && (
                            <>
                                <TextField
                                    label="First Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.firstName}
                                    name="firstName"
                                    error={Boolean(
                                        touched.firstName && errors.firstName
                                    )} // Hiển thị lỗi nếu có
                                    helperText={
                                        touched.firstName && errors.firstName
                                    } // Hiển thị thông báo lỗi
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    label="Last Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.lastName}
                                    name="lastName"
                                    error={Boolean(
                                        touched.lastName && errors.lastName
                                    )} // Hiển thị lỗi nếu có
                                    helperText={
                                        touched.lastName && errors.lastName
                                    } // Hiển thị thông báo lỗi
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    label="Location"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.location}
                                    name="location"
                                    error={Boolean(
                                        touched.location && errors.location
                                    )} // Hiển thị lỗi nếu có
                                    helperText={
                                        touched.location && errors.location
                                    } // Hiển thị thông báo lỗi
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    label="Occupation"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.occupation}
                                    name="occupation"
                                    error={Boolean(
                                        touched.occupation && errors.occupation
                                    )} // Hiển thị lỗi nếu có
                                    helperText={
                                        touched.occupation && errors.occupation
                                    } // Hiển thị thông báo lỗi
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <Box
                                    gridColumn="span 4"
                                    border={`1px solid ${palette.neutral.medium}`}
                                >
                                    <Dropzone
                                        acceptedFiles=".jpg,.jpeg,.png"
                                        multiple={false}
                                        onDrop={(acceptedFiles) => {
                                            // Cập nhật giá trị của trường "picture" trong Formik
                                            setFieldValue(
                                                "picture",
                                                acceptedFiles[0]
                                            );
                                        }}
                                    >
                                        {({ getRootProps, getInputProps }) => (
                                            <Box
                                                {...getRootProps()}
                                                border={`2px dashed ${palette.primary.main}`}
                                                p="1rem"
                                                sx={{
                                                    "&:hover": {
                                                        cursor: "pointer",
                                                    },
                                                }}
                                            >
                                                <input {...getInputProps()} />
                                                {!values.picture ? (
                                                    <p>
                                                        Không có hình ảnh nào
                                                        được chọn
                                                    </p>
                                                ) : (
                                                    <FlexBetween>
                                                        <Typography>
                                                            {
                                                                values.picture
                                                                    .name
                                                            }
                                                        </Typography>
                                                        <IconButton
                                                            onClick={() => {
                                                                setFieldValue(
                                                                    "picture",
                                                                    null
                                                                );
                                                            }}
                                                        >
                                                            <EditOutlinedIcon />
                                                        </IconButton>
                                                    </FlexBetween>
                                                )}
                                            </Box>
                                        )}
                                    </Dropzone>
                                </Box>
                            </>
                        )}

                        <TextField
                            label="Email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            name="email"
                            error={Boolean(touched.email && errors.email)} // Hiển thị lỗi nếu có
                            helperText={touched.email && errors.email} // Hiển thị thông báo lỗi
                            sx={{ gridColumn: "span 4" }}
                        ></TextField>
                        <TextField
                            label="Password"
                            type="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            name="password"
                            error={Boolean(touched.password && errors.password)} // Hiển thị lỗi nếu có
                            helperText={touched.password && errors.password} // Hiển thị thông báo lỗi
                            sx={{ gridColumn: "span 4" }}
                        ></TextField>

                        {/* BUTTON SUBMIT */}
                        <Box>
                            <Button
                                fullWidth
                                type="submit"
                                sx={{
                                    m: "2rem 0",
                                    p: "1rem",
                                    backgroundColor: palette.primary.main,
                                    color: palette.background.alt,
                                    "&:hover": {
                                        color: palette.primary.main,
                                    },
                                }}
                            >
                                {isLogin ? "LOGIN" : "REGISTER"}
                            </Button>
                            <Typography
                                sx={{
                                    cursor: "pointer",
                                }}
                                onClick={() => {
                                    setPageType(isLogin ? "register" : "login");
                                }}
                            >
                                {isLogin
                                    ? "Don't have an account? Sign up"
                                    : "Already have an account? Log in"}
                            </Typography>
                        </Box>
                    </Box>
                </form>
            )}
        </Formik>
    );
};

export default Form;
