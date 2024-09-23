"use client";

import { TextField, Typography, Box, Divider } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { useFormik } from "formik";

import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import MicrosoftIcon from "@mui/icons-material/Window";

export default function LoginPage() {
    const formik = useFormik({
        initialValues: {
            email: "",
        },
    });

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <Box className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                <Typography variant="h4" className="text-center mb-6">
                    خوش آمدید
                </Typography>
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <TextField fullWidth label="آدرس ایمیل" variant="outlined" required />
                    <LoadingButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        className="bg-teal-500 hover:bg-teal-600"
                    >
                        ادامه
                    </LoadingButton>
                </form>
                <Typography variant="body2" className="text-center !mt-4">
                    حساب کاربری ندارید؟{" "}
                    <a href="#" className="text-teal-500 hover:underline">
                        ثبت نام
                    </a>
                </Typography>
                <Divider className="my-6">یا</Divider>
                <div className="space-y-3">
                    <LoadingButton
                        fullWidth
                        variant="outlined"
                        endIcon={<GoogleIcon />}
                        className="justify-center gap-4 normal-case py-2 text-base font-normal"
                    >
                        ادامه با گوگل
                    </LoadingButton>
                    <LoadingButton
                        fullWidth
                        variant="outlined"
                        endIcon={<MicrosoftIcon />}
                        className="justify-center gap-4 normal-case py-2 text-base font-normal"
                    >
                        ادامه با حساب مایکروسافت
                    </LoadingButton>
                    <LoadingButton
                        fullWidth
                        variant="outlined"
                        endIcon={<AppleIcon />}
                        className="justify-center gap-4 normal-case py-2 text-base font-normal"
                    >
                        ادامه با اپل
                    </LoadingButton>
                </div>
            </Box>
            <Typography variant="body2" className="mt-8 text-gray-600">
                <a href="#" className="hover:underline mr-4">
                    شرایط استفاده
                </a>
                {" | "}
                <a href="#" className="hover:underline">
                    سیاست حفظ حریم خصوصی
                </a>
            </Typography>
        </div>
    );
}
