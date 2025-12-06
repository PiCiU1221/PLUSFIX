<?php

namespace Database\Seeders;

use App\Models\StreamingPlatform;
use Illuminate\Database\Seeder;

class StreamingPlatformsTableSeeder extends Seeder
{
    public function run()
    {
        $platforms = ['Netflix', 'HBO Max', 'Disney+', 'Amazon Prime', 'Hulu'];
        foreach ($platforms as $platform) {
            StreamingPlatform::create(['name' => $platform]);
        }
    }
}
