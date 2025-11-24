<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\StreamingPlatform;
use App\Models\Show;
use App\Models\Person;
use App\Models\Moderator;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Użytkownicy
        $users = [
            ['name' => 'Jan Kowalski'],
            ['name' => 'Anna Nowak'],
            ['name' => 'Piotr Wiśniewski'],
        ];

        foreach ($users as $user) {
            User::create($user);
        }

        // Kategorie
        $categories = [
            'Akcja',
            'Komedia',
            'Dramat',
            'Horror',
            'Sci-Fi',
            'Fantasy',
            'Thriller',
            'Romans',
            'Dokumentalny',
            'Animacja'
        ];

        foreach ($categories as $category) {
            Category::create(['name' => $category]);
        }

        // Platformy streamingowe
        $platforms = [
            'Netflix',
            'HBO Max',
            'Disney+',
            'Amazon Prime Video',
            'Apple TV+',
            'Paramount+',
            'Hulu'
        ];

        foreach ($platforms as $platform) {
            StreamingPlatform::create(['name' => $platform]);
        }

        // Osoby (aktorzy, reżyserzy)
        $persons = [
            ['name' => 'Christopher Nolan', 'type' => 'Director'],
            ['name' => 'Leonardo DiCaprio', 'type' => 'Actor'],
            ['name' => 'Quentin Tarantino', 'type' => 'Director'],
            ['name' => 'Brad Pitt', 'type' => 'Actor'],
            ['name' => 'Greta Gerwig', 'type' => 'Director'],
            ['name' => 'Margot Robbie', 'type' => 'Actor'],
        ];

        foreach ($persons as $person) {
            Person::create($person);
        }

        // Przykładowe seriale i filmy
        $show1 = Show::create([
            'type' => 'Film',
            'rating' => 8.8,
            'length' => 148,
            'country' => 'USA',
            'release_date' => '2010-07-16',
            'status' => 'Finished',
            'popularity' => 95.5,
            'description' => 'A thief who steals corporate secrets through the use of dream-sharing technology.',
            'languages' => 'English',
        ]);

        $show1->categories()->attach([1, 5, 7]); // Akcja, Sci-Fi, Thriller
        $show1->streamingPlatforms()->attach([1, 4]); // Netflix, Amazon
        $show1->persons()->attach([
            1 => ['role' => 'Director'],
            2 => ['role' => 'Actor']
        ]);

        $show2 = Show::create([
            'type' => 'Serial',
            'rating' => 9.3,
            'seasons' => 5,
            'country' => 'USA',
            'release_date' => '2008-01-20',
            'status' => 'Finished',
            'popularity' => 98.2,
            'description' => 'A chemistry teacher turned methamphetamine producer.',
            'languages' => 'English',
        ]);

        $show2->categories()->attach([3, 7]); // Dramat, Thriller
        $show2->streamingPlatforms()->attach([1]); // Netflix

        // Moderator przykładowy
        Moderator::create([
            'name' => 'admin',
            'password' => Hash::make('password123'),
            'creation_date' => now(),
        ]);
    }
}
