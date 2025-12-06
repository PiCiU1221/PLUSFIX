<?php

namespace App\Services;

use App\Models\Person;

class PersonService
{
    public function search(string $query, int $limit = 5): array
    {
        if (empty($query)) {
            return [];
        }

        $persons = Person::where('name', 'like', "%{$query}%")
            ->limit($limit)
            ->get(['id', 'name']);

        return $persons->toArray();
    }
}
