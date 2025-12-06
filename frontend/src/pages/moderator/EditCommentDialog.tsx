import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useEffect, useState } from "react";

interface EditCommentDialogProps {
    open: boolean;
    initialContent: string;
    isSaving: boolean;
    onClose: () => void;
    onSave: (newContent: string) => void;
}

export default function EditCommentDialog({ open, initialContent, isSaving, onClose, onSave }: EditCommentDialogProps) {
    const [localContent, setLocalContent] = useState(initialContent);

    useEffect(() => {
        setLocalContent(initialContent);
    }, [initialContent]);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>Edit Comment</DialogTitle>
            <DialogContent>
                <Box sx={{ mt: 1 }}>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Content"
                        value={localContent}
                        onChange={(e) => setLocalContent(e.target.value)}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    variant="contained"
                    onClick={() => onSave(localContent)}
                    disabled={isSaving || !localContent.trim()}
                >
                    {isSaving ? "Saving..." : "Save Changes"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}