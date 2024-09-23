"use client";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
    cssVariables: true,
    direction: "rtl",
    typography: {
        fontFamily: "Vazir, Arial, sans-serif",
    },
    // Customize your theme here
});

export default function MUIProvider({ children }) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}
