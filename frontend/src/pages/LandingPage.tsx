import { Box, Typography } from "@mui/material";

function LandingPage() {
    return (
        <Box>
            <Typography variant="h4" gutterBottom>Welcome to PLUSFLIX</Typography>
            <Box sx={{ height: 300, bgcolor: "grey.800" }} />
        </Box>
    );
}

export default LandingPage;