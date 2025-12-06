import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BadgeIcon from '@mui/icons-material/Badge';
import SettingsIcon from '@mui/icons-material/Settings';
import TvIcon from '@mui/icons-material/Tv';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.tsx";

interface SideDrawerProps {
    open: boolean;
    onClose: () => void;
}

export default function SideDrawer({ open, onClose }: SideDrawerProps) {
    const { logout, isLoggedIn } = useAuth();

    const handleLogoutClick = () => {
        logout();
        onClose();
    };

    return (
        <Drawer anchor="left" open={open} onClose={onClose}>
            <Box sx={{ width: 250, display: "flex", flexDirection: "column", height: "100%" }}>
                <List>
                    <ListItemButton component={Link} to="/" onClick={onClose}>
                        <ListItemIcon><HomeIcon /></ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItemButton>

                    <ListItemButton component={Link} to="/favorites" onClick={onClose}>
                        <ListItemIcon><FavoriteIcon /></ListItemIcon>
                        <ListItemText primary="Favorites" />
                    </ListItemButton>

                    <ListItemButton component={Link} to="/watched" onClick={onClose}>
                        <ListItemIcon><TvIcon /></ListItemIcon>
                        <ListItemText primary="Watched" />
                    </ListItemButton>

                    <ListItemButton component={Link} to="/moderator-dashboard" onClick={onClose}>
                        <ListItemIcon><BadgeIcon /></ListItemIcon>
                        <ListItemText primary="Moderator Dashboard" />
                    </ListItemButton>
                </List>

                <Box sx={{ mt: "auto" }}>
                    <List>
                        <ListItemButton component={Link} to="/settings" onClick={onClose}>
                            <ListItemIcon><SettingsIcon /></ListItemIcon>
                            <ListItemText primary="Settings" />
                        </ListItemButton>

                        {isLoggedIn() && (
                            <ListItemButton onClick={handleLogoutClick}>
                                <ListItemIcon><LogoutIcon /></ListItemIcon>
                                <ListItemText primary="Logout" />
                            </ListItemButton>
                        )}
                    </List>
                </Box>
            </Box>
        </Drawer>
    );
}
