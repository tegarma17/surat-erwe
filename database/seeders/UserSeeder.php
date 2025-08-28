<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\UserDetail;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::insert(
            [
                [
                    'name' => 'admin',
                    'email' => 'admin@admin.com',
                    'role_id' => 1,
                    'password' => bcrypt('admin'),
                    'remember_token' => \Illuminate\Support\Str::random(10),
                ],
                [
                    'name' => 'media 1',
                    'email' => 'media1@media1.com',
                    'role_id' => 2,
                    'password' => bcrypt('media1'),
                    'remember_token' => \Illuminate\Support\Str::random(10),
                ],
                [
                    'name' => 'media 2',
                    'email' => 'media2@media2.com',
                    'role_id' => 2,
                    'password' => bcrypt('media2'),
                    'remember_token' => \Illuminate\Support\Str::random(10),
                ],
                [
                    'name' => 'media 3',
                    'email' => 'media3@media3.com',
                    'role_id' => 2,
                    'password' => bcrypt('media3'),
                    'remember_token' => \Illuminate\Support\Str::random(10),
                ],
            ]
        );
        // UserDetail::factory()->count(10)->create();
    }
}
