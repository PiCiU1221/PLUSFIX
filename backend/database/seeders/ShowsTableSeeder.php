<?php

namespace Database\Seeders;

use App\Models\Show;
use App\Models\ShowType;
use App\Models\Category;
use App\Models\Country;
use App\Models\Tag;
use App\Models\SeriesMeta;
use App\Models\Season;
use App\Models\Episode;
use App\Models\StreamingPlatform;
use Illuminate\Database\Seeder;

class ShowsTableSeeder extends Seeder
{
    public function run()
    {
        $movieType = ShowType::where('name', 'Movie')->first();
        $serialType = ShowType::where('name', 'Serial')->first();

        $netflix = StreamingPlatform::where('name','Netflix')->first();
        $hbo = StreamingPlatform::where('name','HBO Max')->first();

        $movie = Show::create([
            'type_id' => $movieType->id,
            'title' => 'Exciting Adventure Movie',
            'rating' => 8.7,
            'release_year' => 2022,
            'popularity' => 87.5,
            'description' => 'An exciting adventure movie.',
            'cover_url' => 'https://picsum.photos/400/600?random=1'
        ]);

        $movie->categories()->attach(Category::where('name','Action')->first());
        $movie->countries()->attach(Country::where('name','USA')->first());
        $movie->tags()->attach(Tag::where('name','Adventure')->first());

        $movie->streamingPlatforms()->attach($netflix->id);

        $serial = Show::create([
            'type_id' => $serialType->id,
            'title' => 'Thrilling Sci-Fi Serial',
            'rating' => 9.2,
            'release_year' => 2021,
            'popularity' => 92.3,
            'description' => 'A thrilling sci-fi serial.',
            'cover_url' => 'https://picsum.photos/400/600?random=2'
        ]);

        $serial->categories()->attach(Category::where('name','Sci-Fi')->first());
        $serial->countries()->attach(Country::where('name','USA')->first());
        $serial->tags()->attach(Tag::where('name','Space')->first());

        $serial->streamingPlatforms()->attach([$netflix->id, $hbo->id]);

        $meta = SeriesMeta::create([
            'show_id' => $serial->id,
            'is_running' => true
        ]);

        for ($s = 1; $s <= 2; $s++) {

            $season = Season::create([
                'series_meta_id' => $meta->id,
                'season_number' => $s
            ]);

            for ($e = 1; $e <= 3; $e++) {
                Episode::create([
                    'season_id' => $season->id,
                    'episode_number' => $e,
                    'title' => "Season $s Episode $e"
                ]);
            }
        }

        for ($i = 1; $i <= 3; $i++) {
            $extra = Show::create([
                'type_id' => $serialType->id,
                'title' => "Extra Show $i",
                'rating' => rand(6, 10),
                'release_year' => 2020 + $i,
                'popularity' => rand(50, 100),
                'description' => "Extra serial $i description.",
                'cover_url' => "https://picsum.photos/400/600?random=" . ($i+2)
            ]);

            $extra->categories()->attach(Category::inRandomOrder()->first());
            $extra->countries()->attach(Country::inRandomOrder()->first());
            $extra->tags()->attach(Tag::inRandomOrder()->first());
            $extra->streamingPlatforms()->attach(StreamingPlatform::inRandomOrder()->take(2)->pluck('id'));

            $meta = SeriesMeta::create([
                'show_id' => $extra->id,
                'is_running' => (bool) rand(0,1)
            ]);

            $seasonCount = rand(1,2);

            for ($s = 1; $s <= $seasonCount; $s++) {

                $season = Season::create([
                    'series_meta_id' => $meta->id,
                    'season_number' => $s
                ]);

                $episodes = rand(2,4);

                for ($e = 1; $e <= $episodes; $e++) {
                    Episode::create([
                        'season_id' => $season->id,
                        'episode_number' => $e,
                        'title' => "Extra Show $i Season $s Episode $e"
                    ]);
                }
            }
        }
    }
}
