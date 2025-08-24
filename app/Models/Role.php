<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    protected $table = 'role';
    protected $fillable = ['nama_role'];

    public function User()
    {
        return $this->hasMany(User::class);
    }
}
