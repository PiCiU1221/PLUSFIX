<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RolesTableSeeder extends Seeder
{
    public function run()
    {
        $roles = ['Actor', 'Director', 'Producer', 'Writer'];

        foreach ($roles as $role) {
            Role::create(['name' => $role]);
        }
    }
}
