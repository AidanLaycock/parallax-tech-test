<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Device>
 */
class DeviceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->words(),
            'address' => fake()->address(),
            'longitude' => fake()->longitude(),
            'latitude' => fake()->latitude(),
            'device_type' => fake()->word(),
            'manufacturer' => fake()->word(),
            'model' => fake()->words(),
            'install_date' => fake()->dateTimeBetween('-2 years', 'now'),
            'note' => fake()->paragraph(),
            'eui' => fake()->word(),
            'serial_number' => fake()->text(20),
        ];
    }
}
