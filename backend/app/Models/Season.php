<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Season extends Model
{
    protected $fillable = ['series_meta_id', 'season_number'];

    public function seriesMeta()
    {
        return $this->belongsTo(SeriesMeta::class, 'series_meta_id');
    }

    public function episodes()
    {
        return $this->hasMany(Episode::class);
    }
}
