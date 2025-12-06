import { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import ShowCard from "../../components/ShowCard";
import { API_BASE_URL } from "../../config";
import type { Show } from "../../types/Show";
import Grid from "@mui/material/Grid";

function LandingPage() {
    const [shows, setShows] = useState<Show[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/shows`)
            .then((response) => response.json())
            .then((data) => setShows(data))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
                Welcome to PLUSFLIX
            </Typography>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 32 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Grid container spacing={3}>
                    {shows.map((show) => (
                        <ShowCard key={show.id} show={show} />
                    ))}
                </Grid>
            )}
        </Box>
    );
}

export default LandingPage;