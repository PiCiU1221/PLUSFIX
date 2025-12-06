<?php

namespace Database\Seeders;

use App\Models\Moderator;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class ModeratorsTableSeeder extends Seeder
{
    public function run()
    {
        Moderator::create([
            'name' => 'admin',
            'password' => Hash::make('password123')
        ]);
    }
}
