<?php

namespace Database\Factories;

use App\Models\OrderDetail;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderDetailFactory extends Factory
{
    protected $model = OrderDetail::class;

    public function definition(): array
    {
        return [
            'order_id' => rand(1, 9),
            'product_id' => rand(1, 9),
            'quantity' => rand(1, 2)
        ];
    }
}
