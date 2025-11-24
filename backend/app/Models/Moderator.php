<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Moderator extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'password',
        'creation_date',
    ];

    protected $hidden = [
        'password',
    ];

    protected $casts = [
        'creation_date' => 'datetime',
    ];
}
