<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategoriesTableSeeder extends Seeder
{
    public function run()
    {
        $categories = ['Action', 'Drama', 'Sport', 'Crime', 'Thriller', 'Comedy', 'Romance', 'Adventure', 'Fantasy'];

        foreach ($categories as $category) {
            Category::create(['name' => $category]);
        }
    }
}
