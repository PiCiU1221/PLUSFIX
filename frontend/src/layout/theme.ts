import { createTheme } from '@mui/material/styles';

export const getTheme = (mode: "light" | "dark") =>
    createTheme({
    palette: {
        mode,

        background: {
            default: mode === "light" ? "#f5f5f5" : "#121212",
            paper: mode === "light" ? "#ffffff" : "#1e1e1e",
        },

        primary: {
            main: "#f58b00",
            contrastText: "#fff",
        },

        secondary: {
            main: "#3B3B3B",
            light: "#4B4B4B",
            contrastText: "#fff",
        },

        success: {
            main: "#2e7d32",
        },

        warning: {
            main: "#ed6c02",
        },

        error: {
            main: "#d32f2f",
        },

        info: {
            main: "#0288d1",
        },
    },
});

export default getTheme;
