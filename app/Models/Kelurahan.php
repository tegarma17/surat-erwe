<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kelurahan extends Model
{
    protected $table = 'kelurahan';
    protected $fillable = ['nama'];

    public function rws()
    {
        return $this->hasMany(Rw::class);
    }
}
