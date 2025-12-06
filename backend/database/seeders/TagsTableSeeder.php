<?php

namespace Database\Seeders;

use App\Models\Tag;
use Illuminate\Database\Seeder;

class TagsTableSeeder extends Seeder
{
    public function run()
    {
        $tags = ['Adventure', 'Romance', 'Space', 'Mystery', 'Thriller', 'Biography'];
        foreach ($tags as $tag) {
            Tag::create(['name' => $tag]);
        }
    }
}
