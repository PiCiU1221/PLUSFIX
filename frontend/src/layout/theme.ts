import { createTheme } from "@mui/material/styles";

export const getTheme = (mode: "light" | "dark") =>
    createTheme({
        palette: {
            mode,

            background: {
                default: mode === "light" ? "#f7f7f7" : "#232222",
                paper: mode === "light" ? "#ffffff" : "#262626",
            },

            primary: {
                main: "#f58b00",
                dark: "#c46f00",
                light: "#ffad33",
                contrastText: "#fff",
            },

            secondary: {
                main: mode === "light" ? "#3B3B3B" : "#cfcfcf",
                dark: mode === "light" ? "#2a2a2a" : "#a0a0a0",
                light: mode === "light" ? "#4B4B4B" : "#e6e6e6",
                contrastText: mode === "light" ? "#fff" : "#111",
            },

            success: {
                main: "#2e7d32",
                light: "#4caf50",
                dark: "#1b5e20",
            },

            warning: {
                main: "#ed6c02",
                dark: "#c25400",
                light: "#ff9800",
            },

            error: {
                main: "#d32f2f",
                dark: "#9a0007",
                light: "#e57373",
            },

            info: {
                main: "#0288d1",
                dark: "#015f9a",
                light: "#03a9f4",
            },

            text: {
                primary: mode === "light" ? "#111" : "#f2f2f2",
                secondary: mode === "light" ? "#555" : "#bfbfbf",
                disabled: mode === "light" ? "#9e9e9e" : "#6b6b6b",
            },
        },

        shape: {
            borderRadius: 10,
        },

    });

export default getTheme;
