<?php

namespace Database\Seeders;

use App\Models\StreamingPlatform;
use Illuminate\Database\Seeder;

class StreamingPlatformsTableSeeder extends Seeder
{
    public function run()
    {
        $platforms = ['Apple TV+', 'Warner Bros. Pictures', 'Netflix', 'AMC', 'BBC iPlayer', 'Peacock', 'Disney+', 'Amazon Prime Video'];

        foreach ($platforms as $platform) {
            StreamingPlatform::create(['name' => $platform]);
        }
    }
}
