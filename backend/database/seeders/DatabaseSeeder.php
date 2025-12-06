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
        $this->call([
            ShowTypesTableSeeder::class,
            CategoriesTableSeeder::class,
            RolesTableSeeder::class,
            LanguagesTableSeeder::class,
            CountriesTableSeeder::class,
            TagsTableSeeder::class,
            StreamingPlatformsTableSeeder::class,
            ModeratorsTableSeeder::class,
            ShowsTableSeeder::class,
            PersonsTableSeeder::class,
            UserSeeder::class,
        ]);
    }
}
