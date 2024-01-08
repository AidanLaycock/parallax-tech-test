<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Import>
 */
class ImportFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'filename' => fake()->word() . 'csv',
            'user_id' => User::factory()->create()->id,
        ];
    }

    public function withUser(User $user): Factory
    {
        return $this->state([
            'user_id' => $user->id
        ]);
    }
}
