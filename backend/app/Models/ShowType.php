<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ShowType extends Model
{
    protected $fillable = ['name'];

    public function shows()
    {
        return $this->hasMany(Show::class, 'type_id');
    }
}
