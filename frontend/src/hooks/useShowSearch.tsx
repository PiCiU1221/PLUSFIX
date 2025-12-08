import { useState, useEffect, useCallback } from "react";
import {API_BASE_URL} from "../config.ts";
import type {Option} from "../types/Option.tsx";
import type {Show} from "../types/Show.tsx";

interface FiltersData {
    types: Option[];
    categories: Option[];
    countries: Option[];
    streaming_platforms: Option[];
}

type FilterValue = Option | Option[] | null | string;

export function useShowSearch() {
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

    const handleSearchInputChange = (key: keyof typeof searchInputs, value: string) => {
        setSearchInputs(prev => ({ ...prev, [key]: value }));
    };

    return {
        shows,
        loading,
        staticOptions,
        dynamicOptions,
        filters,
        sorting,
        handleFilterChange,
        handleSortToggle,
        handleSearchInputChange
    };
}