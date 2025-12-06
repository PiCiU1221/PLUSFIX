<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            ShowTypesTableSeeder::class,
            CategoriesTableSeeder::class,
            RolesTableSeeder::class,
            CountriesTableSeeder::class,
            TagsTableSeeder::class,
            StreamingPlatformsTableSeeder::class,
            ShowsTableSeeder::class,
            PersonsTableSeeder::class,
            UserSeeder::class,
        ]);
    }
}
