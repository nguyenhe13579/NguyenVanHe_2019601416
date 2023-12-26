<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Database\Factories\CategoryFactory;

class Category extends Model
{
    protected $fillable = [
        'name',
        'description',
        'status'
    ];

    protected static function newFactory()
    {
        return CategoryFactory::new();
    }
}
