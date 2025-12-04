import { Box, Typography, TextField, Button } from "@mui/material";
// import ShowDetailsPage from "./ShowDetailsPage.tsx";

function RatingPage() {
    return (
        <Box>
            <Typography variant="h4">Rate this show</Typography>

            <Box sx={{ mt: 2 }}>
                <Typography>Your rating:</Typography>
                <Typography variant="h5">⭐⭐⭐⭐☆</Typography>
            </Box>

            <TextField label="Write your comment" multiline rows={4} fullWidth sx={{ mt: 2 }} />
            <Button variant="contained" sx={{ mt: 2 }}>Submit</Button>
        </Box>
    );
}

export default RatingPage;