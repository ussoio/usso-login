"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./fonts.css";
import "./globals.css";

import { StyledEngineProvider } from "@mui/material/styles";
import EmotionCache from "@/theme/emotion-cache";

const queryClient = new QueryClient();

export default function RootLayout({ children }) {
    return (
        <html lang="fa-IR" dir="rtl">
            <QueryClientProvider client={queryClient}>
                <AppRouterCacheProvider>
                    <StyledEngineProvider injectFirst>
                        <EmotionCache>
                            <body className={`antialiased`}>{children}</body>
                        </EmotionCache>
                    </StyledEngineProvider>
                </AppRouterCacheProvider>
            </QueryClientProvider>
        </html>
    );
}
