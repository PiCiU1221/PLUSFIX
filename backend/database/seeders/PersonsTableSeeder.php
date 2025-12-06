<?php

namespace Database\Seeders;

use App\Models\Person;
use App\Models\Role;
use App\Models\Show;
use Illuminate\Database\Seeder;

class PersonsTableSeeder extends Seeder
{
    public function run()
    {
        $roles = Role::all();

        $peopleData = [
            ['name' => 'John Doe', 'role' => 'Actor'],
            ['name' => 'Jane Smith', 'role' => 'Director'],
            ['name' => 'Alice Johnson', 'role' => 'Producer'],
            ['name' => 'Bob Brown', 'role' => 'Writer'],
            ['name' => 'Charlie White', 'role' => 'Actor'],
            ['name' => 'Diana Black', 'role' => 'Director'],
            ['name' => 'Eve Green', 'role' => 'Actor'],
            ['name' => 'Frank Blue', 'role' => 'Producer'],
            ['name' => 'Grace Pink', 'role' => 'Writer'],
            ['name' => 'Hank Orange', 'role' => 'Actor'],
        ];

        $people = [];

        foreach ($peopleData as $p) {
            $role = Role::where('name', $p['role'])->first();
            $people[] = Person::create([
                'name' => $p['name'],
                'role_id' => $role->id
            ]);
        }

        $shows = Show::all();

        foreach ($shows as $show) {
            $selectedPeople = collect($people)->shuffle()->take(rand(2,4))->pluck('id')->toArray();
            $show->persons()->attach($selectedPeople);
        }
    }
}
