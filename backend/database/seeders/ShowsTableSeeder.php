<?php

namespace Database\Seeders;

use App\Models\Show;
use App\Models\ShowType;
use App\Models\Category;
use App\Models\Country;
use App\Models\Tag;
use App\Models\StreamingPlatform;
use App\Models\Comment;
use App\Models\Rating;
use App\Models\SeriesMeta;
use App\Models\Season;
use App\Models\Episode;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class ShowsTableSeeder extends Seeder
{
    public function run()
    {
        $movieType = ShowType::where('name', 'Movie')->first();
        $serialType = ShowType::where('name', 'Serial')->first();

        $f1 = Show::create([
            'type_id' => $movieType->id,
            'title' => 'F1',
            'release_year' => 2025,
            'description' => 'Sonny Hayes, a Formula One driver who raced in the 1990s, has a horrible crash, forcing him to retire from Formula One and start racing in other disciplines. A Formula One team owner and friend contacts Hayes and asks him to come out of retirement to mentor rookie prodigy Joshua Pearce on the Apex Grand Prix team.',
            'cover_url' => 'https://upload.wikimedia.org/wikipedia/en/3/38/F1_%282025_film%29.png',
            'rating' => 0,
            'popularity' => 0
        ]);

        $f1->categories()->attach(Category::whereIn('name', ['Action', 'Drama', 'Sport'])->pluck('id'));
        $f1->countries()->attach(Country::whereIn('name', ['USA', 'UK'])->pluck('id'));
        $f1->tags()->attach(Tag::whereIn('name', ['Formula 1', 'Racing', 'Motorsport', 'Comeback', 'Grand Prix'])->pluck('id'));
        $f1->streamingPlatforms()->attach(StreamingPlatform::whereIn('name', ['Apple TV+', 'Warner Bros. Pictures'])->pluck('id'));

        $this->addRatings($f1, [5, 4, 5, 5, 4, 3, 5, 4, 5]);
        $this->addComments($f1, [
            "Brad Pitt looks amazing as a veteran driver.",
            "The racing scenes filmed at Silverstone are next level.",
            "Joseph Kosinski did it with Top Gun, he will do it with F1.",
            "Can't wait to see the final race sequence.",
            "Finally a realistic take on modern Formula 1."
        ]);
        $this->updateStats($f1);

        $bb = Show::create([
            'type_id' => $serialType->id,
            'title' => 'Breaking Bad',
            'release_year' => 2008,
            'description' => 'A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family\'s future.',
            'cover_url' => 'https://www.ubuy.com.pl/productimg/?image=aHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL0kvOTFSTlNNTkpsc0wuX0FDX1NMMTUwMF8uanBn.jpg',
            'rating' => 0,
            'popularity' => 0
        ]);

        $bb->categories()->attach(Category::whereIn('name', ['Crime', 'Drama', 'Thriller'])->pluck('id'));
        $bb->countries()->attach(Country::where('name', 'USA')->pluck('id'));
        $bb->tags()->attach(Tag::whereIn('name', ['Chemistry', 'Cartel', 'Drugs', 'Albuquerque', 'Terminal Illness'])->pluck('id'));
        $bb->streamingPlatforms()->attach(StreamingPlatform::whereIn('name', ['Netflix', 'AMC'])->pluck('id'));

        $this->createSeasons($bb, [1 => 7, 2 => 13, 3 => 13, 4 => 13, 5 => 16]);
        $this->addRatings($bb, [5, 5, 5, 5, 5, 4, 5, 5, 5, 5, 4, 5]);
        $this->addComments($bb, [
            "The greatest TV show of all time.",
            "Bryan Cranston's acting is unmatched.",
            "The character development of Walter White is a masterpiece.",
            "Say my name!",
            "Ozymandias is the best episode ever made."
        ]);
        $this->updateStats($bb);

        $bcs = Show::create([
            'type_id' => $serialType->id,
            'title' => 'Better Call Saul',
            'release_year' => 2015,
            'description' => 'The trials and tribulations of criminal lawyer Jimmy McGill in the time before he established his strip-mall law office in Albuquerque, New Mexico.',
            'cover_url' => 'https://m.media-amazon.com/images/I/71JqMur+YXL._AC_UF1000,1000_QL80_.jpg',
            'rating' => 0,
            'popularity' => 0
        ]);

        $bcs->categories()->attach(Category::whereIn('name', ['Crime', 'Drama', 'Comedy'])->pluck('id'));
        $bcs->countries()->attach(Country::where('name', 'USA')->pluck('id'));
        $bcs->tags()->attach(Tag::whereIn('name', ['Lawyer', 'Legal', 'Prequel', 'Cartel', 'Albuquerque', 'Con Artist', 'Courtroom'])->pluck('id'));
        $bcs->streamingPlatforms()->attach(StreamingPlatform::whereIn('name', ['Netflix', 'AMC'])->pluck('id'));

        $this->createSeasons($bcs, [1 => 10, 2 => 10, 3 => 10, 4 => 10, 5 => 10, 6 => 13]);
        $this->addRatings($bcs, [5, 5, 5, 4, 5, 5, 5, 5, 4]);
        $this->addComments($bcs, [
            "It might be even better than Breaking Bad.",
            "Bob Odenkirk and Rhea Seehorn are phenomenal.",
            "A slow burn but totally worth it.",
            "The cinematography is art.",
            "S'all good, man!"
        ]);
        $this->updateStats($bcs);

        $pb = Show::create([
            'type_id' => $serialType->id,
            'title' => 'Peaky Blinders',
            'release_year' => 2013,
            'description' => 'A gangster family epic set in 1900s England, centering on a gang who sew razor blades in the peaks of their caps, and their fierce boss Tommy Shelby.',
            'cover_url' => 'https://kolorofon.departament.org/wp-content/uploads/2024/11/Plakaty-filmowe-wspolczesne-NOWE-PEAKY-BLINDERS-v.6-klasyka-Plakat-filmowy-HQ-wysokiej-jakosci--scaled-scaled.jpg',
            'rating' => 0,
            'popularity' => 0
        ]);

        $pb->categories()->attach(Category::whereIn('name', ['Crime', 'Drama'])->pluck('id'));
        $pb->countries()->attach(Country::where('name', 'UK')->pluck('id'));
        $pb->tags()->attach(Tag::whereIn('name', ['Gangster', 'Birmingham', '1920s', 'Family Business', 'Betting'])->pluck('id'));
        $pb->streamingPlatforms()->attach(StreamingPlatform::whereIn('name', ['Netflix', 'BBC iPlayer'])->pluck('id'));

        $this->createSeasons($pb, [1 => 6, 2 => 6, 3 => 6, 4 => 6, 5 => 6, 6 => 6]);
        $this->addRatings($pb, [5, 5, 4, 5, 5, 5, 5, 4, 5]);
        $this->addComments($pb, [
            "By order of the Peaky Blinders!",
            "Cillian Murphy is absolutely mesmerizing.",
            "The soundtrack is perfect.",
            "Tom Hardy as Alfie Solomons steals every scene.",
            "One of the best British dramas ever."
        ]);
        $this->updateStats($pb);

        $office = Show::create([
            'type_id' => $serialType->id,
            'title' => 'The Office',
            'release_year' => 2005,
            'description' => 'A mockumentary on a group of typical office workers, where the workday consists of ego clashes, inappropriate behavior, and tedium.',
            'cover_url' => 'https://a.allegroimg.com/original/11273c/0a039a3741e28d28e450eacfefcb/Plakat-21x30-cm-A4-The-Office-Biuro',
            'rating' => 0,
            'popularity' => 0
        ]);

        $office->categories()->attach(Category::whereIn('name', ['Comedy'])->pluck('id'));
        $office->countries()->attach(Country::where('name', 'USA')->pluck('id'));
        $office->tags()->attach(Tag::whereIn('name', ['Mockumentary', 'Workplace', 'Scranton', 'Pranks', 'Paper Company'])->pluck('id'));
        $office->streamingPlatforms()->attach(StreamingPlatform::whereIn('name', ['Peacock', 'Netflix'])->pluck('id'));

        $this->createSeasons($office, [
            1 => 6, 2 => 22, 3 => 25, 4 => 19, 5 => 28, 6 => 26, 7 => 26, 8 => 24, 9 => 25
        ]);
        $this->addRatings($office, [5, 5, 5, 4, 5, 3, 5, 5, 4, 5]);
        $this->addComments($office, [
            "That's what she said!",
            "Bears, Beets, Battlestar Galactica.",
            "Steve Carell is a comedy genius.",
            "The Jim and Pam storyline is the heart of the show.",
            "I declare bankruptcy!"
        ]);
        $this->updateStats($office);

        $titanic = Show::create([
            'type_id' => $movieType->id,
            'title' => 'Titanic',
            'release_year' => 1997,
            'description' => 'A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.',
            'cover_url' => 'https://storage.googleapis.com/pod_public/1300/266355.jpg',
            'rating' => 0,
            'popularity' => 0
        ]);

        $titanic->categories()->attach(Category::whereIn('name', ['Drama', 'Romance'])->pluck('id'));
        $titanic->countries()->attach(Country::where('name', 'USA')->pluck('id'));
        $titanic->tags()->attach(Tag::whereIn('name', ['Shipwreck', 'Iceberg', 'Love Story', 'Disaster', '1910s'])->pluck('id'));
        $titanic->streamingPlatforms()->attach(StreamingPlatform::whereIn('name', ['Disney+', 'Amazon Prime Video'])->pluck('id'));

        $this->addRatings($titanic, [5, 5, 5, 4, 5, 5, 5, 4, 5]);
        $this->addComments($titanic, [
            "Near, far, wherever you are...",
            "Leo was the perfect Jack.",
            "The ship sinking sequence is still terrifying.",
            "There was room on that door!",
            "A timeless masterpiece."
        ]);
        $this->updateStats($titanic);

        $minecraft = Show::create([
            'type_id' => $movieType->id,
            'title' => 'A Minecraft Movie',
            'release_year' => 2025,
            'description' => 'Four misfits are pulled through a mysterious portal into the Overworld: a bizarre, cubic wonderland that thrives on imagination.',
            'cover_url' => 'https://a.allegroimg.com/original/117a48/3ba25c0b459ea88d29795584e7eb/MINECRAFT-MOVIE-2025-Plakat-Exclusive-PREMIUM-Pro-Edycja-Kinowa-z-USA',
            'rating' => 0,
            'popularity' => 0
        ]);

        $minecraft->categories()->attach(Category::whereIn('name', ['Adventure', 'Comedy', 'Fantasy', 'Action'])->pluck('id'));
        $minecraft->countries()->attach(Country::whereIn('name', ['USA'])->pluck('id'));
        $minecraft->tags()->attach(Tag::whereIn('name', ['Video Game', 'Crafting', 'Survival', 'Blocks', 'Creeper'])->pluck('id'));
        $minecraft->streamingPlatforms()->attach(StreamingPlatform::whereIn('name', ['Warner Bros. Pictures'])->pluck('id'));

        $this->addRatings($minecraft, [4, 3, 5, 2, 4, 3]);
        $this->addComments($minecraft, [
            "Jack Black IS Steve.",
            "I am placing blocks and stuff because I am in Minecraft!",
            "The sheep looks so weird but I love it.",
            "Finally a movie about my favorite game.",
            "Jason Momoa with bangs is something else."
        ]);
        $this->updateStats($minecraft);
    }

    private function createSeasons(Show $show, array $seasonsData)
    {
        $meta = SeriesMeta::create([
            'show_id' => $show->id,
            'is_running' => false
        ]);

        foreach ($seasonsData as $seasonNum => $episodeCount) {
            $season = Season::create([
                'series_meta_id' => $meta->id,
                'season_number' => $seasonNum
            ]);

            for ($e = 1; $e <= $episodeCount; $e++) {
                Episode::create([
                    'season_id' => $season->id,
                    'episode_number' => $e,
                    'title' => "Episode $e"
                ]);
            }
        }
    }

    private function addRatings(Show $show, array $values)
    {
        foreach ($values as $val) {
            $rating = Rating::create(['value' => $val]);
            DB::table('show_rating')->insert([
                'show_id' => $show->id,
                'rating_id' => $rating->id,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }

    private function addComments(Show $show, array $contents)
    {
        foreach ($contents as $content) {
            $comment = Comment::create([
                'show_id' => $show->id,
                'content' => $content
            ]);
            DB::table('show_comment')->insert([
                'show_id' => $show->id,
                'comment_id' => $comment->id,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }

    private function updateStats(Show $show)
    {
        $ratingIds = DB::table('show_rating')->where('show_id', $show->id)->pluck('rating_id');

        if ($ratingIds->isNotEmpty()) {
            $averageRating = Rating::whereIn('id', $ratingIds)->avg('value');
            $ratingsCount = $ratingIds->count();
        } else {
            $averageRating = 0;
            $ratingsCount = 0;
        }

        $commentsCount = DB::table('show_comment')->where('show_id', $show->id)->count();
        $popularity = $ratingsCount + $commentsCount;

        $show->update([
            'rating' => round($averageRating, 1),
            'popularity' => $popularity
        ]);
    }
}
