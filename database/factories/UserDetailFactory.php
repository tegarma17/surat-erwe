<?php

namespace Database\Factories;

use App\Models\Rt;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class UserDetailFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'users_id' => User::factory(),
            'rt_id' => Rt::factory(),
            'nik' => fake()->numerify('################'),
            'nama' => fake()->name(),
            'alamat' => fake()->address(),
            'jk' => fake()->randomElement(['l', 'p']),
            'tmpt_lahir' => fake()->city(),
            'tgl_lahir' => fake()->date(),
            'agama' => fake()->randomElement(['islam', 'kristen', 'katholik', 'protestan', 'buddha', 'hindu', 'konghuchu', 'tidak']),
            'sts_pernikahan' => fake()->randomElement(['sudah', 'belum', 'cerai hidup', 'cerai mati']),
            'sts_tinggal' => fake()->randomElement(['tetap', 'kontrak']),
            'sts_domisili' => fake()->randomElement(['sudah', 'belum']),
            'pekerjaan' => fake()->randomElement(['pns', 'aparat', 'swasta', 'wirausaha', 'petani', 'nelayan', 'pelajar', 'freelance', 'guru', 'nakes', 'irt', 'tidak_bekerja', 'pensiun', 'lainnya']),
            'no_hp' => fake()->numerify('08##########'),
            'alamat_ktp' => fake()->address(),
            'is_aktif' => fake()->randomElement(['pindah', 'meninggal', 'tetap']),
            'tgl_masuk' => fake()->date(),
            'sts_warga' => fake()->randomElement(['lama', 'baru']),
            'foto' => fake()->imageUrl(640, 480, 'animals', true)
        ];
    }
}
