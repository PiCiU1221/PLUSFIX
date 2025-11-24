<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class StreamingPlatform extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    public function shows(): BelongsToMany
    {
        return $this->belongsToMany(Show::class, 'show_streaming_platform');
    }
}

