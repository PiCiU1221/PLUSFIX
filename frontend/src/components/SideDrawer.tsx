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
            </List>
        </Drawer>
    );
}
