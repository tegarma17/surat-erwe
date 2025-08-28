<?php

namespace Database\Seeders;

use App\Models\Rt;
use App\Models\Rw;
use App\Models\Kelurahan;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class WilayahSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Kelurahan::factory()
        //     ->count(3)
        //     ->has(
        //         Rw::factory()
        //             ->count(2)
        //             ->has(
        //                 Rt::factory()
        //                     ->count(3)
        //             )
        //     )
        //     ->create();
    }
}
