<?php

namespace App\Services;

use App\Models\Tag;

class TagService
{
    public function search(string $query, int $limit = 10): array
    {
        if (empty($query)) {
            return [];
        }

        $tags = Tag::where('name', 'like', "%{$query}%")
            ->limit($limit)
            ->get(['id', 'name']);

        return $tags->toArray();
    }

    public function getAll(): array
    {
        return Tag::select('id', 'name')->get()->toArray();
    }
}
