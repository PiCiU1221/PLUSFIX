import { useEffect, useState, useCallback } from "react";
import { Box, Typography, TextField, CircularProgress } from "@mui/material";

import ShowCard from "../../components/ShowCard";
import FilterSelect from "../../components/searchPage/FilterSelect";
import AsyncFilterSelect from "../../components/searchPage/AsyncFilterSelect";
import SortButton from "../../components/searchPage/SortButton";

import { API_BASE_URL } from "../../config";
import type { Show } from "../../types/Show";
import Grid from "@mui/material/Grid";
import type { Option } from "../../types/Option.tsx";

interface FiltersData {
    types: Option[];
    categories: Option[];
    countries: Option[];
    streaming_platforms: Option[];
}

const statusOptions: Option[] = [
    { id: 1, name: 'Running' },
    { id: 0, name: 'Ended' },
];

type FilterValue = Option | Option[] | null | string;

function SearchPage() {
    const [shows, setShows] = useState<Show[]>([]);
    const [loading, setLoading] = useState(false);
    const [staticOptions, setStaticOptions] = useState<FiltersData | null>(null);

    const [filters, setFilters] = useState({
        title: "",
        yearFrom: "",
        yearTo: "",
        type: null as Option | null,
        status: null as Option | null,
        tags: [] as Option[],
        persons: [] as Option[],
        categories: [] as Option[],
        countries: [] as Option[],
        platforms: [] as Option[],
    });

    const [sorting, setSorting] = useState({
        popularity: null as 'asc' | 'desc' | null,
        rating: null as 'asc' | 'desc' | null,
    });

    const [searchInputs, setSearchInputs] = useState({
        tags: "",
        persons: ""
    });

    const [dynamicOptions, setDynamicOptions] = useState({
        tags: [] as Option[],
        persons: [] as Option[]
    });

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/shows/filters`)
            .then(res => res.json())
            .then(setStaticOptions)
            .catch(console.error);
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            fetch(`${API_BASE_URL}/api/tags/search?query=${searchInputs.tags}`)
                .then(res => res.json())
                .then(data => setDynamicOptions(prev => ({ ...prev, tags: data })))
                .catch(console.error);
        }, 300);
        return () => clearTimeout(timeout);
    }, [searchInputs.tags]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            fetch(`${API_BASE_URL}/api/persons/search?q=${searchInputs.persons}`)
                .then(res => res.json())
                .then(data => setDynamicOptions(prev => ({ ...prev, persons: data })))
                .catch(console.error);
        }, 300);
        return () => clearTimeout(timeout);
    }, [searchInputs.persons]);

    const buildSearchParams = useCallback(() => {
        const params = new URLSearchParams();
        if (filters.title) params.append("title", filters.title);
        if (filters.yearFrom) params.append("release_year_from", filters.yearFrom);
        if (filters.yearTo) params.append("release_year_to", filters.yearTo);
        if (filters.type) params.append("type_id", filters.type.id.toString());
        if (filters.status) params.append("status", filters.status.id.toString());

        if (sorting.popularity) params.append("sort_popularity", sorting.popularity);
        if (sorting.rating) params.append("sort_rating", sorting.rating);

        filters.tags.forEach(t => params.append("tag_id[]", t.id.toString()));
        filters.persons.forEach(p => params.append("person_id[]", p.id.toString()));
        filters.categories.forEach(c => params.append("category_id[]", c.id.toString()));
        filters.countries.forEach(c => params.append("country_id[]", c.id.toString()));
        filters.platforms.forEach(p => params.append("streaming_platform_id[]", p.id.toString()));

        return params;
    }, [filters, sorting]);

    useEffect(() => {
        const fetchShows = async () => {
            setLoading(true);
            try {
                const params = buildSearchParams();
                const response = await fetch(`${API_BASE_URL}/api/shows?${params.toString()}`);
                const data = await response.json();
                setShows(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        const timeout = setTimeout(fetchShows, 500);
        return () => clearTimeout(timeout);
    }, [buildSearchParams]);

    const handleFilterChange = (key: keyof typeof filters, value: FilterValue) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleSortToggle = (key: keyof typeof sorting) => {
        setSorting(prev => {
            const current = prev[key];
            const next = current === null ? 'desc' : current === 'desc' ? 'asc' : null;
            return { ...prev, [key]: next };
        });
    };

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
                        onInputChange={(v) => setSearchInputs(prev => ({ ...prev, tags: v }))}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <AsyncFilterSelect
                        label="Actor/Director"
                        options={dynamicOptions.persons}
                        value={filters.persons}
                        onChange={(v) => handleFilterChange('persons', v)}
                        onInputChange={(v) => setSearchInputs(prev => ({ ...prev, persons: v }))}
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