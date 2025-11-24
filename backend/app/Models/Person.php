<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Person extends Model
{
    use HasFactory;

    protected $table = 'persons';

    protected $fillable = [
        'name',
        'type',
    ];

    public function shows(): BelongsToMany
    {
        return $this->belongsToMany(Show::class, 'person_show')
            ->withPivot('role')
            ->withTimestamps();
    }
}
