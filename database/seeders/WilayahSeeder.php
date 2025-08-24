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
        Kelurahan::insert([
            'nama' => 'Grabagan'
        ]);
        Rw::insert([
            'kelurahan_id' => 1,
            'nomer' => '08'
        ]);
        Rt::insert(
            [
                ['rw_id' => 1, 'nomer' => '51'],
                ['rw_id' => 1, 'nomer' => '52'],
                ['rw_id' => 1, 'nomer' => '53'],
                ['rw_id' => 1, 'nomer' => '54'],
                ['rw_id' => 1, 'nomer' => '55'],
                ['rw_id' => 1, 'nomer' => '56'],
            ]
        );
    }
}
