<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StreamingPlatform extends Model
{
    protected $fillable = ['name'];

    public function shows()
    {
        return $this->belongsToMany(Show::class, 'show_streaming_platform')->withTimestamps();
    }
}

