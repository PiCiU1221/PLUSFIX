import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";
import Grid from "@mui/material/Grid";
import TvIcon from '@mui/icons-material/Tv';

function WatchedPage() {
    return (
        <Box>
            <Box display="flex" alignItems="center" mb={2}>
                <TvIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h4">Watched</Typography>
            </Box>

            <Grid container spacing={{ xs: 12, sm: 3 }}>
                {[1, 2, 3, 4].map((i) => (
                    <Grid key={i}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="500"
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

export default WatchedPage;
