<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Show extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'rating',
        'seasons',
        'length',
        'country',
        'release_date',
        'status',
        'popularity',
        'description',
        'languages',
    ];

    protected $casts = [
        'release_date' => 'date',
        'rating' => 'decimal:1',
        'popularity' => 'decimal:2',
    ];

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'show_category');
    }

    public function streamingPlatforms(): BelongsToMany
    {
        return $this->belongsToMany(StreamingPlatform::class, 'show_streaming_platform');
    }

    public function comments(): BelongsToMany
    {
        return $this->belongsToMany(Comment::class, 'show_comment');
    }

    public function persons(): BelongsToMany
    {
        return $this->belongsToMany(Person::class, 'person_show')
            ->withPivot('role')
            ->withTimestamps();
    }
}

