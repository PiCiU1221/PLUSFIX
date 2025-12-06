export interface Person {
    name: string;
    role: string;
}

export interface Comment {
    id: number;
    content: string;
    created_at: string;
    updated_at: string;
}

export interface Episode {
    episode_number: number;
    title: string;
}

export interface Season {
    season_number: number;
    episodes: Episode[];
}

export interface SeriesMeta {
    is_running: number;
    seasons: Season[];
}

export interface ShowDetails {
    id: number;
    title: string;
    type: "Movie" | "Serial";
    rating: number;
    release_year: number;
    popularity: number;
    description: string;
    cover_url: string;
    categories: string[];
    tags: string[];
    countries: string[];
    streaming_platforms: string[];
    persons: Person[];
    series_meta: SeriesMeta | null;
    comments: Comment[];
}