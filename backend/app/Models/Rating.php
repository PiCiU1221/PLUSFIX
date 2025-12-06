<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rating extends Model
{
    protected $fillable = ['value'];

    public function shows()
    {
        return $this->belongsToMany(Show::class, 'show_rating')->withTimestamps();
    }
}
