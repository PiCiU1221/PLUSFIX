import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    Box, Typography, Button, CircularProgress, CardMedia, Chip,
    Stack, Divider, Accordion, AccordionSummary, AccordionDetails,
    List, ListItem, ListItemText, Avatar, TextField, Rating,
    Grid
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { API_BASE_URL } from "../../config.ts";
import type { ShowDetails } from "../../types/ShowDetails.ts";
import {useSnackbar} from "../../components/snackbar/SnackbarContext.tsx";

function ShowDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const { showMessage } = useSnackbar();

    const [show, setShow] = useState<ShowDetails | null>(null);
    const [loading, setLoading] = useState(true);

    const [commentContent, setCommentContent] = useState("");
    const [submittingComment, setSubmittingComment] = useState(false);

    const [userRating, setUserRating] = useState<number | null>(null);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/shows/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setShow(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                showMessage("Failed to load show details", "error");
                setLoading(false);
            });
    }, [id, showMessage]);

    const handleCommentSubmit = async () => {
        if (!commentContent.trim()) return;

        setSubmittingComment(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/shows/${id}/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: commentContent }),
            });

            if (response.ok) {
                const newComment = await response.json();
                setShow((prev) => prev ? { ...prev, comments: [newComment, ...prev.comments] } : null);
                setCommentContent("");
                showMessage("Comment added successfully!", "success");
            } else {
                showMessage("Failed to add comment", "error");
            }
        } catch (error) {
            console.error(error);
            showMessage("An error occurred while adding comment", "error");
        } finally {
            setSubmittingComment(false);
        }
    };

    const handleRate = async (newValue: number | null) => {
        if (!newValue) return;

        setUserRating(newValue);

        try {
            const response = await fetch(`${API_BASE_URL}/api/shows/${id}/ratings`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ value: newValue }),
            });

            if (response.ok) {
                showMessage("Rating saved successfully!", "success");
            } else {
                showMessage("Failed to save rating", "error");
            }
        } catch (error) {
            console.error(error);
            showMessage("Network error while saving rating", "error");
        }
    };

    if (loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;
    }

    if (!show) {
        return <Typography variant="h5" sx={{ mt: 10, textAlign: 'center' }}>Show not found</Typography>;
    }

    return (
        <Box sx={{ p: 4, maxWidth: 1200, mx: "auto" }}>
            <Grid container spacing={4}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <CardMedia
                        component="img"
                        image={show.cover_url}
                        alt={show.title}
                        sx={{ borderRadius: 2, width: '100%', maxHeight: 600, objectFit: 'cover' }}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 8 }}>
                    <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
                        <Typography variant="h3" component="h1" fontWeight="bold">
                            {show.title}
                        </Typography>
                        <Chip label={show.type} color="secondary" variant="outlined" />
                    </Stack>

                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        {show.release_year} • {show.countries.join(", ")} • Avg Rating: {show.rating}
                    </Typography>

                    <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
                        {show.categories.map(cat => <Chip key={cat} label={cat} size="small" />)}
                    </Stack>

                    <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography component="legend">Your Rating:</Typography>
                        <Rating
                            name="user-rating"
                            value={userRating}
                            onChange={(_, newValue) => handleRate(newValue)}
                        />
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Button variant="contained" size="large" sx={{ mr: 2 }}>
                            Add to Favorite
                        </Button>
                        <Button variant="outlined" size="large">Watched</Button>
                    </Box>

                    <Typography variant="h5" gutterBottom fontWeight="bold">About</Typography>
                    <Typography>{show.description}</Typography>

                    <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>Streaming</Typography>
                    <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
                        {show.streaming_platforms.map(p => (
                            <Chip key={p} label={p} color="primary" variant="outlined" />
                        ))}
                    </Stack>

                    <Typography variant="h6" gutterBottom>Cast & Crew</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                        {show.persons.map((person, index) => (
                            <Chip
                                key={index}
                                avatar={<Avatar>{person.name[0]}</Avatar>}
                                label={`${person.name} (${person.role})`}
                            />
                        ))}
                    </Box>
                </Grid>

                {show.type === 'Serial' && show.series_meta && (
                    <Grid size={{ xs: 12 }}>
                        <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>Seasons</Typography>
                        {show.series_meta.seasons.map((season) => (
                            <Accordion key={season.season_number}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography>Season {season.season_number}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <List dense>
                                        {season.episodes.map((ep) => (
                                            <ListItem key={ep.episode_number}>
                                                <ListItemText primary={`${ep.episode_number}. ${ep.title}`} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </Grid>
                )}

                <Grid size={{ xs: 12 }}>
                    <Divider sx={{ my: 4 }} />
                    <Typography variant="h4" gutterBottom>Comments</Typography>

                    <Box sx={{ mb: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            label="Add a comment"
                            multiline
                            rows={3}
                            variant="outlined"
                            fullWidth
                            value={commentContent}
                            onChange={(e) => setCommentContent(e.target.value)}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                                variant="contained"
                                onClick={handleCommentSubmit}
                                disabled={submittingComment || !commentContent.trim()}
                            >
                                {submittingComment ? 'Posting...' : 'Post Comment'}
                            </Button>
                        </Box>
                    </Box>

                    <List>
                        {show.comments.map((comment) => (
                            <ListItem key={comment.id} alignItems="flex-start" sx={{ bgcolor: 'background.paper', mb: 2, borderRadius: 1, boxShadow: 1 }}>
                                <ListItemText
                                    primary={
                                        <Typography variant="body1" component="div" sx={{ mb: 1 }}>
                                            {comment.content}
                                        </Typography>
                                    }
                                    slotProps={{
                                        secondary: { component: "div" }
                                    }}
                                    secondary={
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                            <Typography variant="caption" color="text.secondary">
                                                Created: {comment.created_at}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                Updated: {comment.updated_at}
                                            </Typography>
                                        </Box>
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                </Grid>
            </Grid>
        </Box>
    );
}

export default ShowDetailsPage;