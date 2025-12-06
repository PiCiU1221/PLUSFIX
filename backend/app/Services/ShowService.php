<?php

namespace App\Services;

use App\Models\Category;
use App\Models\Country;
use App\Models\Show;
use App\Models\ShowType;
use App\Models\StreamingPlatform;
use App\Models\Tag;

class ShowService
{
    public function getAllShowsShort(array $filters = [], array $sort = []): array
    {
        $query = Show::with([
            'streamingPlatforms:id,name',
            'categories:id,name',
            'tags:id,name',
            'persons:id,name'
        ]);

        if (!empty($filters['type_id'])) {
            $query->where('type_id', $filters['type_id']);
        }

        if (!empty($filters['title'])) {
            $query->where('title', 'like', '%' . $filters['title'] . '%');
        }

        if (!empty($filters['release_year_from'])) {
            $query->where('release_year', '>=', $filters['release_year_from']);
        }

        if (!empty($filters['release_year_to'])) {
            $query->where('release_year', '<=', $filters['release_year_to']);
        }

        if (!empty($filters['category_id'])) {
            $query->whereHas('categories', fn($q) => $q->where('categories.id', $filters['category_id']));
        }

        if (!empty($filters['tag_id'])) {
            $query->whereHas('tags', fn($q) => $q->where('tags.id', $filters['tag_id']));
        }

        if (!empty($filters['country_id'])) {
            $query->whereHas('countries', fn($q) => $q->where('countries.id', $filters['country_id']));
        }

        if (!empty($filters['streaming_platform_id'])) {
            $query->whereHas('streamingPlatforms', fn($q) => $q->where('streaming_platforms.id', $filters['streaming_platform_id']));
        }

        if (!empty($filters['person_id'])) {
            $query->whereHas('persons', fn($q) => $q->where('persons.id', $filters['person_id']));
        }

        if (!empty($filters['status'])) {
            $query->whereHas('seriesMeta', fn($q) => $q->where('is_running', $filters['status']));
        }

        if (!empty($sort['popularity'])) {
            $query->orderBy('popularity', strtolower($sort['popularity']) === 'desc' ? 'desc' : 'asc');
        }

        if (!empty($sort['rating'])) {
            $query->orderBy('rating', strtolower($sort['rating']) === 'desc' ? 'desc' : 'asc');
        }

        $shows = $query->get(['id', 'title', 'release_year', 'cover_url']);

        return $shows->map(fn($show) => [
            'id' => $show->id,
            'title' => $show->title,
            'release_year' => $show->release_year,
            'cover_url' => $show->cover_url,
            'streaming_platforms' => $show->streamingPlatforms->pluck('name'),
        ])->toArray();
    }

    public function getShowDetails(int $id): ?array
    {
        $show = Show::with([
            'type:id,name',
            'categories:id,name',
            'streamingPlatforms:id,name',
            'persons' => function ($q) {
                $q->select('persons.id', 'persons.name', 'role_id')
                    ->with('role:id,name');
            },
            'tags:id,name',
            'countries:id,name',
            'seriesMeta.seasons.episodes:id,season_id,episode_number,title',
            'comments'
        ])->find($id);

        if (!$show) {
            return null;
        }

        return [
            'id' => $show->id,
            'title' => $show->title,
            'type' => $show->type?->name,
            'rating' => $show->rating !== null ? number_format($show->rating, 2) : null,
            'release_year' => $show->release_year,
            'popularity' => $show->popularity,
            'description' => $show->description,
            'cover_url' => $show->cover_url,
            'categories' => $show->categories->pluck('name'),
            'tags' => $show->tags->pluck('name'),
            'countries' => $show->countries->pluck('name'),
            'streaming_platforms' => $show->streamingPlatforms->pluck('name'),
            'persons' => $show->persons->map(function ($p) {
                return [
                    'name' => $p->name,
                    'role' => $p->role?->name,
                ];
            }),
            'series_meta' => $show->seriesMeta ? [
                'is_running' => $show->seriesMeta->is_running,
                'seasons' => $show->seriesMeta->seasons->map(function ($season) {
                    return [
                        'season_number' => $season->season_number,
                        'episodes' => $season->episodes->map(function ($ep) {
                            return [
                                'episode_number' => $ep->episode_number,
                                'title' => $ep->title,
                            ];
                        }),
                    ];
                }),
            ] : null,
            'comments' => $show->comments
                ->sortByDesc('updated_at')
                ->map(fn($c) => [
                    'id' => $c->id,
                    'content' => $c->content,
                    'created_at' => $c->created_at?->format('Y-m-d H:i:s'),
                    'updated_at' => $c->updated_at?->format('Y-m-d H:i:s'),
                ])
                ->values()
                ->toArray(),
        ];
    }

    public function getFilterOptionsForClient(): array
    {
        return [
            'types' => ShowType::select('id', 'name')->get(),
            'categories' => Category::select('id', 'name')->get(),
            'countries' => Country::select('id', 'name')->get(),
            'streaming_platforms' => StreamingPlatform::select('id', 'name')->get(),
        ];
    }
}
