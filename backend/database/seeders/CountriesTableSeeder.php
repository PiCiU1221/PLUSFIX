<?php

namespace Database\Seeders;

use App\Models\Country;
use Illuminate\Database\Seeder;

class CountriesTableSeeder extends Seeder
{
    public function run()
    {
        $countries = ['USA', 'UK', 'Canada', 'France', 'Japan', 'Germany'];

        foreach ($countries as $country) {
            Country::create(['name' => $country]);
        }
    }
}
