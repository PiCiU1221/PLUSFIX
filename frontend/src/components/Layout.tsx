import { Box, Container } from "@mui/material";
import Header from "./Header";
// import App from "../App.tsx";

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <Box>
            <Header />
            <Container sx={{ mt: 3 }}>{children}</Container>
        </Box>
    );
}

export default Layout;