"use client";

import "./fonts.css";
import "./globals.css";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "react-toastify/dist/ReactToastify.css";
import ToastProvider from "@/providers/ToastProvider";

import { StyledEngineProvider } from "@mui/material/styles";
import EmotionCache from "@/theme/emotion-cache";

import AxiosProvider from "@/providers/AxiosProvoder";

const queryClient = new QueryClient();

export default function RootLayout({ children }) {
    return (
        <html lang="fa-IR" dir="rtl">
            <QueryClientProvider client={queryClient}>
                <AppRouterCacheProvider>
                    <StyledEngineProvider injectFirst>
                        <EmotionCache>
                            <body className={`antialiased`}>
                                <ToastProvider>
                                    <AxiosProvider>{children}</AxiosProvider>
                                </ToastProvider>
                            </body>
                        </EmotionCache>
                    </StyledEngineProvider>
                </AppRouterCacheProvider>
            </QueryClientProvider>
        </html>
    );
}
