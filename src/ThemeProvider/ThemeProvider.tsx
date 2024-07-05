"use client"
import React from 'react'
import { baselightTheme } from "@/utils/theme/DefaultColors";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const ThemeProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <ThemeProvider theme={baselightTheme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}

export default ThemeProviders
