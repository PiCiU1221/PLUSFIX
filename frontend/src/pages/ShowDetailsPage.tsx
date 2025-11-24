import { Box, Typography, Button } from "@mui/material";

function ShowDetailsPage() {
    return (
        <Box>
            <Typography variant="h4">Title (year)</Typography>
            <Typography variant="h6">⭐⭐⭐⭐☆ (rating count)</Typography>

            <Box sx={{ mt: 2, mb: 2 }}>
                <Button variant="contained" sx={{ mr: 2 }}>
                    Add to Favorite
                </Button>
                <Button variant="outlined">Watched</Button>
            </Box>

            <Typography variant="h5" sx={{ mt: 3 }}>
                About
            </Typography>
            <Typography>Description of the title...</Typography>
        </Box>
    );
}

export default ShowDetailsPage;
