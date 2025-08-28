<?php

namespace Database\Factories;

use App\Models\Rt;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Berita>
 */
class BeritaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $judul = fake()->sentence(4);

        return [
            'judul' => $judul,
            'kategori' => fake()->randomElement(['event', 'kegiatan', 'pengumuman', 'peristiwa']),
            'rt_id' => Rt::inRandomOrder()->first()->id,
            'slug' => Str::slug($judul),
            'isi_berita' => fake()->paragraphs(5, true),
            'foto' => fake()->imageUrl(640, 480, 'animals', true),

        ];
    }
}
