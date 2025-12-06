import { Box, Typography, Paper, Divider, Switch, FormControlLabel } from "@mui/material";

type SettingsPageProps = {
    mode: "light" | "dark";
    setMode: React.Dispatch<React.SetStateAction<"light" | "dark">>;
};

export default function SettingsPage({ mode, setMode }: SettingsPageProps) {
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                ⚙️ Settings
            </Typography>

            <Paper sx={{ p: 3, maxWidth: 600 }}>
                <Typography variant="h6" gutterBottom>
                    Account
                </Typography>

                <Typography variant="body2" sx={{ mb: 2 }}>
                    This is a placeholder settings page. Future options such as profile editing,
                    notifications, themes, and privacy settings will appear here.
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography variant="h6" gutterBottom>
                    Preferences
                </Typography>

                <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Enable notifications"
                />

                <FormControlLabel
                    control={
                        <Switch
                            checked={mode === "dark"}
                            onChange={() => setMode(mode === "light" ? "dark" : "light")}
                        />
                    }
                    label="Dark mode"
                />

                <FormControlLabel
                    control={<Switch />}
                    label="Auto-play trailers"
                />
            </Paper>
        </Box>
    );
}
