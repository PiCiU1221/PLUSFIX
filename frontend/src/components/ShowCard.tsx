import { Link } from "react-router-dom";
import { Card, CardActionArea, CardMedia, CardContent, Typography, Stack, Chip } from "@mui/material";
import type { Show } from "../types/Show";
import Grid from "@mui/material/Grid";

interface ShowCardProps {
    show: Show;
}

function ShowCard({ show }: ShowCardProps) {
    return (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <CardActionArea
                    component={Link}
                    to={`/details/${show.id}`}
                    sx={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start" }}
                >
                    <CardMedia
                        component="img"
                        height="350"
                        image={show.cover_url}
                        alt={show.title}
                        sx={{ objectFit: "cover" }}
                    />
                    <CardContent sx={{ width: '100%' }}>
                        <Typography variant="h6" component="div" noWrap>
                            {show.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            {show.release_year}
                        </Typography>
                        <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap sx={{ mt: 1 }}>
                            {show.streaming_platforms.slice(0, 3).map((platform) => (
                                <Chip
                                    key={platform}
                                    label={platform}
                                    size="small"
                                    color="primary"
                                    variant="outlined"
                                    sx={{ fontSize: '0.7rem' }}
                                />
                            ))}
                        </Stack>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    );
}

export default ShowCard;