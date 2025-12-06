<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategoriesTableSeeder extends Seeder
{
    public function run()
    {
        $categories = ['Action', 'Drama', 'Comedy', 'Sci-Fi', 'Horror', 'Documentary'];

        foreach ($categories as $category) {
            Category::create(['name' => $category]);
        }
    }
}
