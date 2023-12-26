<?php

namespace Database\Factories;

use App\Models\Discount;
use Illuminate\Database\Eloquent\Factories\Factory;

class DiscountFactory extends Factory
{
    protected $model = Discount::class;

    public function definition(): array
    {
        return [
            'code' => $this->faker->unique()->country(),
            'value' => rand(7, 9) / 10,
            'status' => 1,
            'label' => $this->faker->name()
        ];
    }
}
