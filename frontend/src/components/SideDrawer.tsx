import {
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BadgeIcon from '@mui/icons-material/Badge';
import SettingsIcon from '@mui/icons-material/Settings';
import TvIcon from '@mui/icons-material/Tv';

interface SideDrawerProps {
    open: boolean;
    onClose: () => void;
}

export default function SideDrawer({ open, onClose }: SideDrawerProps) {
    return (
        <Drawer anchor="left" open={open} onClose={onClose}>
            <List sx={{ width: 250 }}>
                <ListItemButton component={Link} to="/" onClick={onClose}>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItemButton>

                <ListItemButton
                    component={Link}
                    to="/favorites"
                    onClick={onClose}
                >
                    <ListItemIcon>
                        <FavoriteIcon />
                    </ListItemIcon>
                    <ListItemText primary="Favorites" />
                </ListItemButton>

                <ListItemButton
                    component={Link}
                    to="/watched"
                    onClick={onClose}
                >
                    <ListItemIcon>
                        <TvIcon />
                    </ListItemIcon>
                    <ListItemText primary="Watched" />
                </ListItemButton>

                <ListItemButton
                    component={Link}
                    to="/moderator-login"
                    onClick={onClose}
                >
                    <ListItemIcon>
                        <BadgeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Moderator login" />
                </ListItemButton>

                <ListItemButton
                    component={Link}
                    to="/settings"
                    onClick={onClose}
                >
                    <ListItemIcon>
                        <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Settings" />
                </ListItemButton>
            </List>
        </Drawer>
    );
}
