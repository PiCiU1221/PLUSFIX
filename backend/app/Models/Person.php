<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Person extends Model
{
    protected $table = 'persons';

    protected $fillable = ['name', 'role_id'];

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function shows()
    {
        return $this->belongsToMany(Show::class, 'person_show')->withTimestamps();
    }
}
