import {Box, Typography, Card, CardContent, CardMedia} from "@mui/material";
import Grid from "@mui/material/Grid";
import FavoriteIcon from '@mui/icons-material/Favorite';

function FavoritesPage() {
    return (
        <Box>
            <Box display="flex" alignItems="center" mb={2}>
                <FavoriteIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h4">Favorites</Typography>
            </Box>

            <Grid container spacing={2}>
                {/* FIX this grid ugh */}
                {[1,2,3,4].map((i) => (
                    <Grid item xs={12} sm={3} key={i}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="full"
                                image="https://i.ebayimg.com/images/g/fA0AAOSwPixn-Yfn/s-l1200.png"
                                alt="Title poster"
                            />
                            <CardContent>
                                <Typography>Title (year)</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default FavoritesPage;
