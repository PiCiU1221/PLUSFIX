import { Box, Container } from "@mui/material";
import Header from "../components/Header.tsx";
import { useState } from "react";
import SideDrawer from "../components/SideDrawer.tsx";
import {SnackbarProvider} from "../components/snackbar/SnackbarProvider.tsx";

function Layout({ children }: { children: React.ReactNode }) {
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <SnackbarProvider>
            <Box>
                <Header onMenuClick={() => setDrawerOpen(true)} />

                <SideDrawer
                    open={drawerOpen}
                    onClose={() => setDrawerOpen(false)}
                />

                <Container sx={{ mt: 3 }}>{children}</Container>
            </Box>
        </SnackbarProvider>
    );
}

export default Layout;
