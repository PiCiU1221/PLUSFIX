<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SeriesMeta extends Model
{
    protected $table = 'series_metas';

    protected $fillable = ['show_id', 'is_running'];

    public function show()
    {
        return $this->belongsTo(Show::class);
    }

    public function seasons()
    {
        return $this->hasMany(Season::class, 'series_meta_id');
    }
}
