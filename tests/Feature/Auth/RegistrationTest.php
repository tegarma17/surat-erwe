<?php

use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test('registration screen can be rendered', function () {
    $response = $this->get('/register');

    $response->assertStatus(200);
});

test('new users can register', function () {
    $this->withoutExceptionHandling();


    $response = $this->post('/register', [
        'name' => 'Emmet',
        'email' => 'emmet@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
        'role_id' => Role::factory(),
    ]);

    $response->assertSessionHasNoErrors();
    $this->assertAuthenticated();
    $this->assertAuthenticatedAs(User::first());
    $response->assertRedirect(route('dashboard', absolute: false));
});
