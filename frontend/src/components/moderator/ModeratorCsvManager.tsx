import { Box, Button, CircularProgress, Divider, Paper, Stack, Typography } from "@mui/material";
import { useState, type ChangeEvent } from "react";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useSnackbar } from "../snackbar/SnackbarContext.tsx";
import { API_BASE_URL } from "../../config";

export default function ModeratorCsvManager() {
    const { showMessage } = useSnackbar();
    const [isExporting, setIsExporting] = useState(false);
    const [isImporting, setIsImporting] = useState(false);

    const handleDownloadCsv = async () => {
        setIsExporting(true);
        try {
            const token = localStorage.getItem("auth_token");
            const response = await fetch(`${API_BASE_URL}/api/shows/csv`, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` },
            });

            if (!response.ok) {
                showMessage("Failed to download CSV", "error");
                return;
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `shows_export_${new Date().toISOString().slice(0, 10)}.csv`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);

            showMessage("CSV downloaded successfully", "success");
        } catch (error) {
            console.error(error);
            showMessage("Error downloading CSV", "error");
        } finally {
            setIsExporting(false);
        }
    };

    const handleUploadCsv = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setIsImporting(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const token = localStorage.getItem("auth_token");
            const response = await fetch(`${API_BASE_URL}/api/shows/csv`, {
                method: "POST",
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                showMessage(data.message || "Upload failed", "error");
                return;
            }

            showMessage(data.message || "Shows updated successfully", "success");
            event.target.value = "";
        } catch (error) {
            console.error(error);
            if (error instanceof Error) {
                showMessage(error.message, "error");
            } else {
                showMessage("An unexpected error occurred during upload", "error");
            }
        } finally {
            setIsImporting(false);
        }
    };

    return (
        <Paper sx={{ p: 6, textAlign: "center" }}>
            <Stack spacing={4} alignItems="center" maxWidth={600} mx="auto">
                <Box>
                    <Typography variant="h6" gutterBottom>1. Download Current Data</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Download the current list of shows and streaming platforms assignment.
                        You can edit the platforms in the CSV file.
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={isExporting ? <CircularProgress size={20} color="inherit" /> : <CloudDownloadIcon />}
                        onClick={handleDownloadCsv}
                        disabled={isExporting}
                    >
                        {isExporting ? "Downloading..." : "Download CSV"}
                    </Button>
                </Box>

                <Divider flexItem />

                <Box>
                    <Typography variant="h6" gutterBottom>2. Upload Edited Data</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Upload your edited CSV file to update the database.
                        Make sure not to remove used platforms from the header.
                    </Typography>
                    <Button
                        component="label"
                        variant="contained"
                        color="secondary"
                        startIcon={isImporting ? <CircularProgress size={20} color="inherit" /> : <CloudUploadIcon />}
                        disabled={isImporting}
                    >
                        {isImporting ? "Uploading..." : "Upload CSV"}
                        <input
                            hidden
                            type="file"
                            accept=".csv"
                            onChange={handleUploadCsv}
                            disabled={isImporting}
                        />
                    </Button>
                </Box>
            </Stack>
        </Paper>
    );
}