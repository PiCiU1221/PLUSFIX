import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
// import App from "../App.tsx";

function Header() {
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>PLUSFLIX</Typography>
                <IconButton color="inherit" component={Link} to="/search">
                    <SearchIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

export default Header;