<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rt extends Model
{
    protected $table = 'rt';
    protected $fillable = ['nomer', 'rw_id'];

    public function rw()
    {
        return $this->belongsTo(Rw::class);
    }
}
