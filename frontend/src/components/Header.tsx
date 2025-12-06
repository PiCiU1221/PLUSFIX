import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";

interface HeaderProps {
    onMenuClick: () => void;
}

function Header({ onMenuClick }: HeaderProps) {
    const navigate = useNavigate();

    return (
        <AppBar position="sticky">
            <Toolbar>
                <IconButton edge="start" color="inherit" onClick={onMenuClick}>
                    <MenuIcon />
                </IconButton>

                <Typography
                    variant="h6"
                    sx={{ flexGrow: 1, marginLeft: 2, cursor: "pointer" }}
                    onClick={() => navigate("/")}
                >
                    PLUSFIX ᐅ
                </Typography>

                <IconButton color="inherit" component={Link} to="/search">
                    <SearchIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
