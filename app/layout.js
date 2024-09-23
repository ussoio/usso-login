import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";

import "./fonts.css";
import "./globals.css";

import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import theme from "@/theme/theme";

export default function RootLayout({ children }) {
    return (
        <html lang="fa-IR" dir="rtl">
            <AppRouterCacheProvider>
                <ThemeProvider theme={theme}>
                    <StyledEngineProvider injectFirst>
                        <body className={`antialiased`}>{children}</body>
                    </StyledEngineProvider>
                </ThemeProvider>
            </AppRouterCacheProvider>
        </html>
    );
}
