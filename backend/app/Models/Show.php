<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Show extends Model
{
    protected $fillable = [
        'type_id',
        'title',
        'rating',
        'release_year',
        'popularity',
        'description',
        'cover_url',
    ];

    public function type()
    {
        return $this->belongsTo(ShowType::class, 'type_id');
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'show_category')->withTimestamps();
    }

    public function streamingPlatforms()
    {
        return $this->belongsToMany(StreamingPlatform::class, 'show_streaming_platform')->withTimestamps();
    }

    public function persons()
    {
        return $this->belongsToMany(Person::class, 'person_show')->withTimestamps();
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'show_tag')->withTimestamps();
    }

    public function ratings()
    {
        return $this->belongsToMany(Rating::class, 'show_rating')->withTimestamps();
    }

    public function seriesMeta()
    {
        return $this->hasOne(SeriesMeta::class);
    }

    public function countries()
    {
        return $this->belongsToMany(Country::class, 'show_country')->withTimestamps();
    }
}
