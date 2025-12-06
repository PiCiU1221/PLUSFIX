<?php

namespace Database\Seeders;

use App\Models\Language;
use Illuminate\Database\Seeder;

class LanguagesTableSeeder extends Seeder
{
    public function run()
    {
        $languages = ['English', 'Spanish', 'French', 'German', 'Japanese'];

        foreach ($languages as $lang) {
            Language::create(['name' => $lang]);
        }
    }
}
