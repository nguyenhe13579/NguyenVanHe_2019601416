<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Database\Factories\UsersFactory;

class Users extends Model
{
    protected $fillable = [
        'username',
        'password',
        'full_name',
        'phone',
        'email',
        'address',
        'birth',
        'gender'
    ];

    protected static function newFactory()
    {
        return UsersFactory::new();
    }
}
