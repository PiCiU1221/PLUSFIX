import { StrictMode, useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { getTheme } from "./layout/theme";
import "./index.css";
import App from "./App";

function Main() {
    // loading the saved mode type or using light as the default
    const [mode, setMode] = useState<"light" | "dark">(
        (localStorage.getItem("themeMode") as "light" | "dark") || "light"
    );

    useEffect(() => {
        localStorage.setItem("themeMode", mode);
    }, [mode]);

    const theme = useMemo(() => getTheme(mode), [mode]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <App mode={mode} setMode={setMode} />
        </ThemeProvider>
    );
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Main />
    </StrictMode>
);

export default Main;
