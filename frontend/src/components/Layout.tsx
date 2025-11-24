import { Box, Container } from "@mui/material";
import Header from "./Header";
import { useState } from "react";
import SideDrawer from "./SideDrawer";

function Layout({ children }: { children: React.ReactNode }) {
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <Box>
            <Header onMenuClick={() => setDrawerOpen(true)} />

            <SideDrawer
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            />

            <Container sx={{ mt: 3 }}>{children}</Container>
        </Box>
    );
}

export default Layout;
