<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Database\Factories\OrderFactory;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'full_name',
        'address',
        'phone',
        'email',
        'note',
        'quantity',
        'total_price',
        'status'
    ];

    protected static function newFactory()
    {
        return OrderFactory::new();
    }
}
