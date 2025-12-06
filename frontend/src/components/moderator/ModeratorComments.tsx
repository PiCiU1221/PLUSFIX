import { Box, TextField, MenuItem, Paper, Typography, Stack, IconButton, CircularProgress, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { API_BASE_URL } from "../../config";
import { useSnackbar } from "../snackbar/SnackbarContext.tsx";
import type { Comment } from "../../types/Comment.tsx";
import EditCommentDialog from "../../pages/moderator/EditCommentDialog.tsx";

export default function ModeratorComments() {
    const { showMessage } = useSnackbar();

    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(false);

    const [filters, setFilters] = useState({
        sort: 'latest',
        dateFrom: '',
        dateTo: ''
    });

    const [editingComment, setEditingComment] = useState<Comment | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchComments = useCallback(async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("auth_token");
            const params = new URLSearchParams();

            params.append("sort", filters.sort);
            if (filters.dateFrom) params.append("date_from", filters.dateFrom);
            if (filters.dateTo) params.append("date_to", filters.dateTo);

            const response = await fetch(`${API_BASE_URL}/api/moderator/comments?${params.toString()}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) throw new Error("Failed to fetch comments");

            const data = await response.json();
            setComments(data);
        } catch (error) {
            console.error(error);
            showMessage("Error loading comments", "error");
        } finally {
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        fetchComments();
    }, [fetchComments]);

    const handleFilterChange = (key: keyof typeof filters, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleUpdate = async (newContent: string) => {
        if (!editingComment) return;

        setIsSaving(true);
        try {
            const token = localStorage.getItem("auth_token");
            const response = await fetch(`${API_BASE_URL}/api/moderator/comments/${editingComment.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ content: newContent })
            });

            if (!response.ok) throw new Error("Failed to update comment");

            setComments(prev => prev.map(c =>
                c.id === editingComment.id ? { ...c, content: newContent } : c
            ));

            showMessage("Comment updated successfully", "success");
            setEditingComment(null);
        } catch (error) {
            console.error(error);
            showMessage("Error updating comment", "error");
        } finally {
            setIsSaving(false);
        }
    };

    const confirmDelete = async () => {
        if (!deleteId) return;

        setIsDeleting(true);
        try {
            const token = localStorage.getItem("auth_token");
            const response = await fetch(`${API_BASE_URL}/api/moderator/comments/${deleteId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) throw new Error("Failed to delete comment");

            setComments(prev => prev.filter(c => c.id !== deleteId));
            showMessage("Comment deleted successfully", "success");
        } catch (error) {
            console.error(error);
            showMessage("Error deleting comment", "error");
        } finally {
            setIsDeleting(false);
            setDeleteId(null);
        }
    };

    return (
        <Box>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 3 }}>
                <TextField
                    label="Sort by"
                    select
                    value={filters.sort}
                    onChange={(e) => handleFilterChange('sort', e.target.value)}
                    sx={{ minWidth: 200 }}
                >
                    <MenuItem value="latest">Latest</MenuItem>
                    <MenuItem value="oldest">Oldest</MenuItem>
                </TextField>

                <TextField
                    label="Date From"
                    type="date"
                    value={filters.dateFrom}
                    onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                    slotProps={{ inputLabel: { shrink: true } }}
                />

                <TextField
                    label="Date To"
                    type="date"
                    value={filters.dateTo}
                    onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                    slotProps={{ inputLabel: { shrink: true } }}
                />
            </Stack>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 16, p: 4 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Stack spacing={2}>
                    {comments.map((c) => (
                        <Paper key={c.id} sx={{ p: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                                <Box>
                                    <Typography variant="subtitle2" color="primary">
                                        Show: {c.show || "Unknown Show"}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {c.created_at}
                                    </Typography>
                                </Box>
                                <Box>
                                    <IconButton
                                        color="primary"
                                        onClick={() => setEditingComment(c)}
                                        size="small"
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        color="error"
                                        onClick={() => setDeleteId(c.id)}
                                        size="small"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            </Box>

                            <Typography variant="body1" sx={{ mb: 1, whiteSpace: 'pre-wrap' }}>
                                {c.content}
                            </Typography>
                        </Paper>
                    ))}

                    {!loading && comments.length === 0 && (
                        <Typography align="center" color="text.secondary" sx={{ py: 4 }}>
                            No comments found matching your filters.
                        </Typography>
                    )}
                </Stack>
            )}

            <EditCommentDialog
                open={!!editingComment}
                initialContent={editingComment?.content || ""}
                isSaving={isSaving}
                onClose={() => setEditingComment(null)}
                onSave={handleUpdate}
            />

            <Dialog
                open={!!deleteId}
                onClose={() => setDeleteId(null)}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this comment? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteId(null)} disabled={isDeleting}>
                        Cancel
                    </Button>
                    <Button
                        onClick={confirmDelete}
                        color="error"
                        variant="contained"
                        autoFocus
                        disabled={isDeleting}
                    >
                        {isDeleting ? "Deleting..." : "Delete"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}