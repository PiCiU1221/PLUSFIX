<?php

namespace Database\Seeders;

use App\Models\ShowType;
use Illuminate\Database\Seeder;

class ShowTypesTableSeeder extends Seeder
{
    public function run()
    {
        $types = ['Movie', 'Serial'];

        foreach ($types as $type) {
            ShowType::create(['name' => $type]);
        }
    }
}
