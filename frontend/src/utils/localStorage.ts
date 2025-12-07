import type { ShowDetails } from "../types/ShowDetails.ts";

export const FAVORITES_KEY = "favorites";
export const WATCHED_KEY = "watched";
export const WATCHED_EPISODES_KEY = "watchedEpisodes";

type StorageKey = typeof FAVORITES_KEY | typeof WATCHED_KEY;
type ShowId = number | string;

function safeParse<T>(value: string | null, fallback: T): T {
    if (!value) {
        return fallback;
    }
    try {
        return JSON.parse(value) as T;
    } catch {
        return fallback;
    }
}

export function saveToLocalStorage(key: StorageKey, item: ShowDetails): boolean {
    const currentItems = safeParse<ShowDetails[]>(localStorage.getItem(key), []);
    const itemExists = currentItems.some((entry) => entry.id === item.id);

    if (itemExists) {
        return false;
    }

    const updatedItems = [...currentItems, item];
    localStorage.setItem(key, JSON.stringify(updatedItems));
    return true;
}

export function removeFromLocalStorage(key: StorageKey, id: ShowId): void {
    const currentItems = safeParse<ShowDetails[]>(localStorage.getItem(key), []);
    const updatedItems = currentItems.filter((entry) => entry.id !== id);
    localStorage.setItem(key, JSON.stringify(updatedItems));
}

export function getFromLocalStorage(key: StorageKey): ShowDetails[] {
    return safeParse<ShowDetails[]>(localStorage.getItem(key), []);
}

export function getWatchedEpisodes(showId: ShowId): string[] {
    const allWatched = safeParse<Record<string, string[]>>(
        localStorage.getItem(WATCHED_EPISODES_KEY),
        {}
    );
    return allWatched[String(showId)] || [];
}

export function toggleWatchedEpisode(showId: ShowId, episodeId: string): void {
    const allWatched = safeParse<Record<string, string[]>>(
        localStorage.getItem(WATCHED_EPISODES_KEY),
        {}
    );
    const key = String(showId);
    const currentEpisodes = allWatched[key] || [];

    if (currentEpisodes.includes(episodeId)) {
        allWatched[key] = currentEpisodes.filter((id) => id !== episodeId);
    } else {
        allWatched[key] = [...currentEpisodes, episodeId];
    }

    localStorage.setItem(WATCHED_EPISODES_KEY, JSON.stringify(allWatched));
}