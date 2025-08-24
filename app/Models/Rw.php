<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rw extends Model
{
    protected $table = 'rw';
    protected $fillable = ['nomer', 'kelurahan_id'];

    public function kelurahan()
    {
        return $this->belongsTo(Kelurahan::class);
    }
    public function rts()
    {
        return $this->hasMany(Rt::class);
    }
}
