import { Box, Typography, Paper, Switch, FormControlLabel } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';

type SettingsPageProps = {
    mode: "light" | "dark";
    setMode: React.Dispatch<React.SetStateAction<"light" | "dark">>;
};

export default function SettingsPage({ mode, setMode }: SettingsPageProps) {
    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ maxWidth: 600, mx: "auto" }}>

                <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <SettingsIcon color="primary" sx={{ mr: 1 }} />
                    Settings
                </Typography>

                <Paper sx={{ p: 3, width: "100%" }}>
                    <Typography variant="h6" gutterBottom>
                        Preferences
                    </Typography>

                    <FormControlLabel
                        control={
                            <Switch
                                checked={mode === "dark"}
                                onChange={() => setMode(mode === "light" ? "dark" : "light")}
                            />
                        }
                        label="Dark mode"
                    />
                </Paper>

            </Box>
        </Box>
    );
}