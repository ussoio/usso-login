"use client";

import { Box, Divider, Typography, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";

import { useQuery } from "@tanstack/react-query";
import { getConfig } from "@/api/sso.api";
import Loading from "./loading";

import Steps from "@/components/steps";
import Branding from "@/components/branding";
import Providers from "@/components/providers";
import Legals from "@/components/legals";

export default function Page() {
    const configs = useQuery({
        queryFn: getConfig,
    });

    if (configs.isLoading) {
        return <Loading></Loading>;
    }

    const themeConfig = createTheme({
        cssVariables: true,
        direction: "rtl",
        typography: {
            ...configs.data.branding.typography,
        },
        shape: {
            ...configs.data.branding.shape,
        },
        palette: {
            ...configs.data.branding.palette,
        },
    });

    return (
        <ThemeProvider theme={themeConfig}>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
                <Box className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                    <Branding data={configs.data.branding} />

                    <Steps data={configs.data.methods.filter((method) => method.type == "credential")}></Steps>

                    <Divider className="my-6">یا</Divider>

                    <Providers providers={configs.data.methods.filter((method) => method.type == "provider")} />
                </Box>

                <Legals data={configs.data.legal}></Legals>
            </div>
        </ThemeProvider>
    );
}
