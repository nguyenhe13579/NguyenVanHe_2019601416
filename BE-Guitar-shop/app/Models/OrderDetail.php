<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Database\Factories\OrderDetailFactory;

class OrderDetail extends Model
{
    protected $fillable = [
        'order_id',
        'product_id',
        'quantity'
    ];

    protected static function newFactory()
    {
        return OrderDetailFactory::new();
    }
}
