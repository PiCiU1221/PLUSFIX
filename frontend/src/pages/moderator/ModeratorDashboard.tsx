import { Box, Button, Container, Typography, TextField, MenuItem, Paper, Rating, Dialog, DialogContent, DialogTitle, DialogActions } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { CommentData } from "../../types/CommentData";
import { useAuth } from "../../hooks/useAuth";

const mockComments: CommentData[] = [
    { id: 1, text: "I love it!", rating: 5 },
    { id: 2, text: "Not bad.", rating: 3 },
    { id: 3, text: "It was funny, but there were a lot of plot holes.", rating: 4 }
];

export default function ModeratorDashboard() {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();

    const isAuthenticated = isLoggedIn();

    const [tab, setTab] = useState<'comments' | 'upload'>('comments');
    const [editingComment, setEditingComment] = useState<CommentData | null>(null);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/moderator-login", { replace: true });
        }
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) {
        return null;
    }

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Moderator's Dashboard
            </Typography>

            <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                <Button
                    variant={tab === "comments" ? "contained" : "outlined"}
                    onClick={() => setTab("comments")}
                >
                    View comments
                </Button>

                <Button
                    variant={tab === "upload" ? "contained" : "outlined"}
                    onClick={() => setTab("upload")}
                >
                    Upload .CSV
                </Button>
            </Box>

            {tab === "comments" && (
                <>
                    <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                        <TextField label="Sort by" select defaultValue="latest" sx={{ width: 200 }}>
                            <MenuItem value="latest">Latest</MenuItem>
                            <MenuItem value="oldest">Oldest</MenuItem>
                        </TextField>

                        <TextField type="date" label="Date" InputLabelProps={{ shrink: true }} />
                    </Box>

                    {mockComments.map((c) => (
                        <Paper key={c.id} sx={{ p: 2, mb: 2 }}>
                            <Typography variant="subtitle2">User</Typography>
                            <Typography variant="body2" sx={{ opacity: 0.7 }}>
                                {c.text}
                            </Typography>

                            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                                <Rating value={c.rating} readOnly size="small" />
                                <Button variant="outlined" onClick={() => setEditingComment(c)}>
                                    Edit
                                </Button>
                            </Box>
                        </Paper>
                    ))}
                </>
            )}

            {tab === "upload" && (
                <Paper sx={{ p: 4, textAlign: "center" }}>
                    <Button variant="outlined" component="label">
                        Choose a file to upload…
                        <input hidden type="file" accept=".csv" />
                    </Button>
                </Paper>
            )}

            {editingComment && (
                <Dialog open onClose={() => setEditingComment(null)} fullWidth maxWidth="sm">
                    <DialogTitle>Edit comment body</DialogTitle>

                    <DialogContent>
                        <Typography variant="subtitle2">User</Typography>

                        <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
                            <Rating value={editingComment.rating} readOnly size="small" />
                        </Box>

                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            defaultValue={editingComment.text}
                            sx={{ mt: 2 }}
                        />
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={() => setEditingComment(null)}>Cancel</Button>
                        <Button variant="contained">Submit</Button>
                    </DialogActions>
                </Dialog>
            )}
        </Container>
    );
}