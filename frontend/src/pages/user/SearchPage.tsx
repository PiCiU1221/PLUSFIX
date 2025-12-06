import { Box, Typography, TextField, Grid, Button } from "@mui/material";
import ShowCard from "../../components/ShowCard.tsx";

function SearchPage() {
    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                Search
            </Typography>
            <TextField
                fullWidth
                label="Search by title or keywords"
                sx={{ mb: 2 }}
            />

            <Grid container spacing={{ xs: 2, md: 3 }}>
                <Grid>
                    <Button fullWidth variant="outlined">
                        Type
                    </Button>
                </Grid>
                <Grid>
                    <Button fullWidth variant="outlined">
                        Year
                    </Button>
                </Grid>
                <Grid>
                    <Button fullWidth variant="outlined">
                        Category
                    </Button>
                </Grid>
                <Grid>
                    <Button fullWidth variant="outlined">
                        Tags
                    </Button>
                </Grid>
                <Grid>
                    <Button fullWidth variant="outlined">
                        Country
                    </Button>
                </Grid>
                <Grid>
                    <Button fullWidth variant="outlined">
                        Streaming
                    </Button>
                </Grid>
                <Grid>
                    <Button fullWidth variant="outlined">
                        Popularity
                    </Button>
                </Grid>
                <Grid>
                    <Button fullWidth variant="outlined">
                        Rating
                    </Button>
                </Grid>
                <Grid>
                    <Button fullWidth variant="outlined">
                        Actor/Director
                    </Button>
                </Grid>
                <Grid>
                    <Button fullWidth variant="outlined">
                        Status
                    </Button>
                </Grid>
            </Grid>

            <Box sx={{ mt: 4 }}>
                {[1, 2, 3].map((i) => (
                    <ShowCard key={i} title="Title" year="year" />
                ))}
            </Box>
        </Box>
    );
}

export default SearchPage;
