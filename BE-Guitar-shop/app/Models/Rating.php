<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Database\Factories\RatingFactory;

class Rating extends Model
{
    protected $fillable = [
        'user_id',
        'product_id',
        'score'
    ];

    protected static function newFactory()
    {
        return RatingFactory::new();
    }
}
