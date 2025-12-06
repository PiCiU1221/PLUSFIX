<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $fillable = ['show_id', 'content'];

    public function show()
    {
        return $this->belongsTo(Show::class);
    }
}
