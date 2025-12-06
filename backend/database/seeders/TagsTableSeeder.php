<?php

namespace Database\Seeders;

use App\Models\Tag;
use Illuminate\Database\Seeder;

class TagsTableSeeder extends Seeder
{
    public function run()
    {
        $tags = [
            'Formula 1', 'Racing', 'Motorsport', 'Comeback', 'Grand Prix',
            'Chemistry', 'Cartel', 'Drugs', 'Albuquerque', 'Terminal Illness',
            'Lawyer', 'Legal', 'Prequel', 'Con Artist', 'Courtroom',
            'Gangster', 'Birmingham', '1920s', 'Family Business', 'Betting',
            'Mockumentary', 'Workplace', 'Scranton', 'Pranks', 'Paper Company',
            'Shipwreck', 'Iceberg', 'Love Story', 'Disaster', '1910s',
            'Video Game', 'Crafting', 'Survival', 'Blocks', 'Creeper'
        ];
        foreach ($tags as $tag) {
            Tag::create(['name' => $tag]);
        }
    }
}
