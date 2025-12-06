<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Episode extends Model
{
    protected $fillable = ['season_id', 'episode_number', 'title'];

    public function season()
    {
        return $this->belongsTo(Season::class);
    }
}
