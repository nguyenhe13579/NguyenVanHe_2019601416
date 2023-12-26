<?php

namespace Database\Factories;

use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class OrderFactory extends Factory
{
    protected $model = Order::class;

    public function definition(): array
    {
        return [
            'user_id' => rand(1, 3),
            'full_name' => $this->faker->name(),
            'address' => $this->faker->address(),
            'phone' => $this->faker->unique()->randomNumber(),
            'email' => $this->faker->email(),
            'note' => Str::random(30),
            'quantity' => rand(1, 3),
            'total_price' => rand(500000, 5000000),
            'status' => rand(0, 3)
        ];
    }
}
