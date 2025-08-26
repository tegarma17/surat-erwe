<?php

use App\Models\Role;
use App\Models\User;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test('login screen can be rendered', function () {
    $response = $this->get('/login');

    $response->assertStatus(200);
});

test('users can authenticate using the login screen', function () {
    Role::factory()->create(['id' => 3, 'nama_role' => 'warga']);
    $user = User::factory()->create([
        'password' => bcrypt('password'),
    ]);


    $response = $this->post('/login', [
        'email' => $user->email,
        'password' => 'password',
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect(route('dashboard', absolute: false));
});

test('users can not authenticate with invalid password', function () {
    $role = Role::create(['nama_role' => 'admin']);
    $user = User::factory()->create([
        'role_id' => $role->id
    ]);

    $this->post('/login', [
        'email' => $user->email,
        'password' => 'wrong-password',
    ]);

    $this->assertGuest();
});

test('users can logout', function () {
    $role = Role::create(['nama_role' => 'admin']);
    $user = User::factory()->create([
        'role_id' => $role->id
    ]);
    $response = $this->actingAs($user)->post('/logout');

    $this->assertGuest();
    $response->assertRedirect('/');
});
