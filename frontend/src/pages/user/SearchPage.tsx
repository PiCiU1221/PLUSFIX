import { Box, Typography, TextField, CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid";

import ShowCard from "../../components/ShowCard";
import FilterSelect from "../../components/searchPage/FilterSelect";
import AsyncFilterSelect from "../../components/searchPage/AsyncFilterSelect";
import SortButton from "../../components/searchPage/SortButton";

import { useShowSearch } from "../../hooks/useShowSearch";
import type { Option } from "../../types/Option";

const statusOptions: Option[] = [
    { id: 1, name: 'Running' },
    { id: 0, name: 'Ended' },
];

function SearchPage() {
    const {
        shows,
        loading,
        staticOptions,
        dynamicOptions,
        filters,
        sorting,
        handleFilterChange,
        handleSortToggle,
        handleSearchInputChange
    } = useShowSearch();

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom fontWeight="bold">Search</Typography>

            <TextField
                fullWidth
                label="Search by title"
                sx={{ mb: 3 }}
                value={filters.title}
                onChange={(e) => handleFilterChange('title', e.target.value)}
            />

            <Grid container spacing={2} sx={{ mb: 4 }}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <AsyncFilterSelect
                        label="Tags"
                        options={dynamicOptions.tags}
                        value={filters.tags}
                        onChange={(v) => handleFilterChange('tags', v)}
                        onInputChange={(v) => handleSearchInputChange('tags', v)}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <AsyncFilterSelect
                        label="Actor/Director"
                        options={dynamicOptions.persons}
                        value={filters.persons}
                        onChange={(v) => handleFilterChange('persons', v)}
                        onInputChange={(v) => handleSearchInputChange('persons', v)}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    <FilterSelect
                        label="Type"
                        options={staticOptions?.types}
                        value={filters.type}
                        onChange={(v) => handleFilterChange('type', v)}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 3 }}>
                    <FilterSelect
                        label="Category"
                        multiple
                        options={staticOptions?.categories}
                        value={filters.categories}
                        onChange={(v) => handleFilterChange('categories', v)}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 3 }}>
                    <FilterSelect
                        label="Country"
                        multiple
                        options={staticOptions?.countries}
                        value={filters.countries}
                        onChange={(v) => handleFilterChange('countries', v)}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 3 }}>
                    <FilterSelect
                        label="Streaming"
                        multiple
                        options={staticOptions?.streaming_platforms}
                        value={filters.platforms}
                        onChange={(v) => handleFilterChange('platforms', v)}
                    />
                </Grid>

                <Grid size={{ xs: 6, md: 2 }}>
                    <TextField
                        label="Year From"
                        type="number"
                        fullWidth
                        value={filters.yearFrom}
                        onChange={(e) => handleFilterChange('yearFrom', e.target.value)}
                    />
                </Grid>
                <Grid size={{ xs: 6, md: 2 }}>
                    <TextField
                        label="Year To"
                        type="number"
                        fullWidth
                        value={filters.yearTo}
                        onChange={(e) => handleFilterChange('yearTo', e.target.value)}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 2 }}>
                    <FilterSelect
                        label="Status"
                        options={statusOptions}
                        value={filters.status}
                        onChange={(v) => handleFilterChange('status', v)}
                    />
                </Grid>

                <Grid size={{ xs: 6, md: 3 }}>
                    <SortButton
                        label="Popularity"
                        state={sorting.popularity}
                        onClick={() => handleSortToggle('popularity')}
                    />
                </Grid>
                <Grid size={{ xs: 6, md: 3 }}>
                    <SortButton
                        label="Rating"
                        state={sorting.rating}
                        onClick={() => handleSortToggle('rating')}
                    />
                </Grid>
            </Grid>

            <Typography variant="h6" gutterBottom sx={{ mb: 2, color: 'text.secondary' }}>
                Results: {shows.length}
            </Typography>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 16 }}><CircularProgress /></Box>
            ) : (
                <Grid container spacing={3}>
                    {shows.map((show) => (
                        <ShowCard key={show.id} show={show} />
                    ))}
                </Grid>
            )}
        </Box>
    );
}

export default SearchPage;