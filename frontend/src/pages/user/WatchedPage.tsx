import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box, Typography, Card, CardContent, CardMedia,
    CardActionArea, Button, Container
} from "@mui/material";
import Grid from "@mui/material/Grid";
import TvIcon from "@mui/icons-material/Tv";
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import type { Show } from "../../types/Show.tsx";

function WatchedPage() {
    const navigate = useNavigate();

    const [watchedShows] = useState<Show[]>(() => {
        try {
            const storedData = localStorage.getItem("watched");
            return storedData ? JSON.parse(storedData) : [];
        } catch (error) {
            console.error("Error parsing watched shows:", error);
            return [];
        }
    });

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={4}>
                <Box display="flex" alignItems="center">
                    <TvIcon color="primary" sx={{ mr: 2, fontSize: 32 }} />
                    <Typography variant="h4" fontWeight="bold">Watched Shows</Typography>
                </Box>
            </Box>

            {watchedShows.length === 0 ? (
                <Box sx={{ textAlign: 'center', mt: 10, opacity: 0.7 }}>
                    <SentimentDissatisfiedIcon sx={{ fontSize: 60, mb: 2 }} />
                    <Typography variant="h6">You haven't marked any shows as watched yet.</Typography>
                    <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate("/")}>
                        Browse Shows
                    </Button>
                </Box>
            ) : (
                <Grid container spacing={3}>
                    {watchedShows.map((show) => (
                        <Grid key={show.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: '0.3s', '&:hover': { transform: 'scale(1.02)' } }}>
                                <CardActionArea
                                    onClick={() => navigate(`/details/${show.id}`)}
                                    sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
                                >
                                    <CardMedia
                                        component="img"
                                        height="400"
                                        image={show.cover_url}
                                        alt={show.title}
                                        sx={{ objectFit: 'cover' }}
                                    />
                                    <CardContent sx={{ width: '100%' }}>
                                        <Typography variant="h6" component="div" noWrap fontWeight="bold">
                                            {show.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {show.release_year}
                                        </Typography>
                                        <Typography variant="caption" color="primary" sx={{ display: 'block', mt: 1 }}>
                                            {show.streaming_platforms.slice(0, 2).join(", ")}
                                            {show.streaming_platforms.length > 2 && " ..."}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
}

export default WatchedPage;