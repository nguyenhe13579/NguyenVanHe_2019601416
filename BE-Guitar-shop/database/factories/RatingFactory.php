<?php

namespace Database\Factories;

use App\Models\Rating;
use Illuminate\Database\Eloquent\Factories\Factory;

class RatingFactory extends Factory
{
    protected $model = Rating::class;

    public function definition(): array
    {
        return [
            'user_id' => rand(1, 5),
            'product_id' => rand(1, 5),
            'score' => rand(3, 5)
        ];
    }
}
