<?php

namespace App\Services;

use App\Models\Show;
use App\Models\Rating;

class RatingService
{
    public function addRatingToShow(int $showId, int $value): ?Rating
    {
        if ($value < 1 || $value > 5) {
            return null;
        }

        $show = Show::find($showId);
        if (!$show) {
            return null;
        }

        $rating = Rating::create(['value' => $value]);
        $show->ratings()->attach($rating->id);

        $this->updateShowStats($show);

        return $rating;
    }

    protected function updateShowStats(Show $show): void
    {
        $show->rating = $show->ratings()->avg('value') ?? 0;
        $show->popularity = $show->ratings()->count() + $show->comments()->count();
        $show->save();
    }
}
