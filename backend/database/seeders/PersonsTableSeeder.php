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
        $actorRole = Role::where('name', 'Actor')->first();
        $directorRole = Role::where('name', 'Director')->first();
        $producerRole = Role::where('name', 'Producer')->first();
        $writerRole = Role::where('name', 'Writer')->first();

        $f1Movie = Show::where('title', 'F1')->first();
        if ($f1Movie) {
            $f1Cast = [
                ['name' => 'Brad Pitt', 'role_id' => $actorRole->id],
                ['name' => 'Damson Idris', 'role_id' => $actorRole->id],
                ['name' => 'Kerry Condon', 'role_id' => $actorRole->id],
                ['name' => 'Javier Bardem', 'role_id' => $actorRole->id],
                ['name' => 'Tobias Menzies', 'role_id' => $actorRole->id],
                ['name' => 'Joseph Kosinski', 'role_id' => $directorRole->id],
                ['name' => 'Jerry Bruckheimer', 'role_id' => $producerRole->id],
                ['name' => 'Lewis Hamilton', 'role_id' => $producerRole->id],
                ['name' => 'Ehren Kruger', 'role_id' => $writerRole->id],
            ];
            $this->addPersonsToShow($f1Movie, $f1Cast);
        }

        $bbShow = Show::where('title', 'Breaking Bad')->first();
        if ($bbShow) {
            $bbCast = [
                ['name' => 'Bryan Cranston', 'role_id' => $actorRole->id],
                ['name' => 'Aaron Paul', 'role_id' => $actorRole->id],
                ['name' => 'Anna Gunn', 'role_id' => $actorRole->id],
                ['name' => 'Dean Norris', 'role_id' => $actorRole->id],
                ['name' => 'Betsy Brandt', 'role_id' => $actorRole->id],
                ['name' => 'RJ Mitte', 'role_id' => $actorRole->id],
                ['name' => 'Bob Odenkirk', 'role_id' => $actorRole->id],
                ['name' => 'Giancarlo Esposito', 'role_id' => $actorRole->id],
                ['name' => 'Jonathan Banks', 'role_id' => $actorRole->id],
                ['name' => 'Vince Gilligan', 'role_id' => $writerRole->id],
            ];
            $this->addPersonsToShow($bbShow, $bbCast);
        }

        $bcsShow = Show::where('title', 'Better Call Saul')->first();
        if ($bcsShow) {
            $bcsCast = [
                ['name' => 'Bob Odenkirk', 'role_id' => $actorRole->id],
                ['name' => 'Rhea Seehorn', 'role_id' => $actorRole->id],
                ['name' => 'Jonathan Banks', 'role_id' => $actorRole->id],
                ['name' => 'Patrick Fabian', 'role_id' => $actorRole->id],
                ['name' => 'Michael Mando', 'role_id' => $actorRole->id],
                ['name' => 'Michael McKean', 'role_id' => $actorRole->id],
                ['name' => 'Giancarlo Esposito', 'role_id' => $actorRole->id],
                ['name' => 'Tony Dalton', 'role_id' => $actorRole->id],
                ['name' => 'Vince Gilligan', 'role_id' => $writerRole->id],
                ['name' => 'Peter Gould', 'role_id' => $writerRole->id],
            ];
            $this->addPersonsToShow($bcsShow, $bcsCast);
        }

        $pbShow = Show::where('title', 'Peaky Blinders')->first();
        if ($pbShow) {
            $pbCast = [
                ['name' => 'Cillian Murphy', 'role_id' => $actorRole->id],
                ['name' => 'Paul Anderson', 'role_id' => $actorRole->id],
                ['name' => 'Helen McCrory', 'role_id' => $actorRole->id],
                ['name' => 'Sophie Rundle', 'role_id' => $actorRole->id],
                ['name' => 'Ned Dennehy', 'role_id' => $actorRole->id],
                ['name' => 'Finn Cole', 'role_id' => $actorRole->id],
                ['name' => 'Tom Hardy', 'role_id' => $actorRole->id],
                ['name' => 'Steven Knight', 'role_id' => $writerRole->id],
            ];
            $this->addPersonsToShow($pbShow, $pbCast);
        }

        $officeShow = Show::where('title', 'The Office')->first();
        if ($officeShow) {
            $officeCast = [
                ['name' => 'Steve Carell', 'role_id' => $actorRole->id],
                ['name' => 'Rainn Wilson', 'role_id' => $actorRole->id],
                ['name' => 'John Krasinski', 'role_id' => $actorRole->id],
                ['name' => 'Jenna Fischer', 'role_id' => $actorRole->id],
                ['name' => 'B.J. Novak', 'role_id' => $actorRole->id],
                ['name' => 'Ed Helms', 'role_id' => $actorRole->id],
                ['name' => 'Mindy Kaling', 'role_id' => $actorRole->id],
                ['name' => 'Greg Daniels', 'role_id' => $producerRole->id],
            ];
            $this->addPersonsToShow($officeShow, $officeCast);
        }

        $titanicShow = Show::where('title', 'Titanic')->first();
        if ($titanicShow) {
            $titanicCast = [
                ['name' => 'Leonardo DiCaprio', 'role_id' => $actorRole->id],
                ['name' => 'Kate Winslet', 'role_id' => $actorRole->id],
                ['name' => 'Billy Zane', 'role_id' => $actorRole->id],
                ['name' => 'Kathy Bates', 'role_id' => $actorRole->id],
                ['name' => 'Frances Fisher', 'role_id' => $actorRole->id],
                ['name' => 'James Cameron', 'role_id' => $directorRole->id],
                ['name' => 'Jon Landau', 'role_id' => $producerRole->id],
            ];
            $this->addPersonsToShow($titanicShow, $titanicCast);
        }

        $minecraftShow = Show::where('title', 'A Minecraft Movie')->first();
        if ($minecraftShow) {
            $minecraftCast = [
                ['name' => 'Jack Black', 'role_id' => $actorRole->id],
                ['name' => 'Jason Momoa', 'role_id' => $actorRole->id],
                ['name' => 'Emma Myers', 'role_id' => $actorRole->id],
                ['name' => 'Danielle Brooks', 'role_id' => $actorRole->id],
                ['name' => 'Jennifer Coolidge', 'role_id' => $actorRole->id],
                ['name' => 'Jared Hess', 'role_id' => $directorRole->id],
            ];
            $this->addPersonsToShow($minecraftShow, $minecraftCast);
        }
    }

    private function addPersonsToShow($show, $peopleData)
    {
        foreach ($peopleData as $p) {
            $person = Person::firstOrCreate(
                ['name' => $p['name']],
                ['role_id' => $p['role_id']]
            );

            if (!$show->persons()->where('person_id', $person->id)->exists()) {
                $show->persons()->attach($person->id);
            }
        }
    }
}
