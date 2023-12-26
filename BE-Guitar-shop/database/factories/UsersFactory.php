<?php

namespace Database\Factories;

use App\Models\Users;
use Illuminate\Database\Eloquent\Factories\Factory;

class UsersFactory extends Factory
{
    protected $model = Users::class;

    public function definition(): array
    {
        return [
            'username' => $this->faker->userName(),
            'password' => $this->faker->password(),
            'full_name' => $this->faker->name(),
            'phone' => $this->faker->unique()->randomNumber(),
            'email' => $this->faker->email(),
            'address' => $this->faker->address(),
            'birth' => $this->faker->date(),
            'gender' => rand(0, 1)
        ];
    }
}
