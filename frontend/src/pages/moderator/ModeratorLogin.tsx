import { useState } from "react";
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
} from "@mui/material";

export default function ModeratorLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = () => {
        if (password === "moderator123" && email.length > 0) {
            window.location.href = "/moderator";
        } else {
            setError("Invalid moderator password");
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 10 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                <Typography variant="h5" gutterBottom>
                    Moderator Login
                </Typography>

                <TextField
                    fullWidth
                    type="email"
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ mb: 2 }}
                />

                <TextField
                    fullWidth
                    type="password"
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ mb: 2 }}
                />

                {error && (
                    <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                        {error}
                    </Typography>
                )}

                <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={handleLogin}
                >
                    Login
                </Button>
            </Paper>
        </Container>
    );
}
