<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition(): array
    {
        return [
            'category_id' => rand(1, 3),
            'name' => $this->faker->name(),
            'image' => Str::random(30),
            'price' => rand(200000, 10000000),
            'amount' => rand(10, 100),
            'description' => Str::random(15),
            'status' => rand(0, 1),
            'bonus' => Str::random(15),
            'origin' => $this->faker->country(),
            'style' => Str::random(15),
            'material' => Str::random(15),
            'paint' => Str::random(15),
            'brand' => Str::random(15),
            'string_name' => Str::random(15),
            'sold' => rand(0, 30)
        ];
    }
}
