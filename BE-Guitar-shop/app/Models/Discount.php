<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Database\Factories\DiscountFactory;

class Discount extends Model
{
    protected $fillable = [
        'code',
        'value',
        'status',
        'label'
    ];

    protected static function newFactory()
    {
        return DiscountFactory::new();
    }
}
