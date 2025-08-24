<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Jabatan extends Model
{
    protected $table = 'jabatan_warga';
    protected $fillable = ['warga_id', 'jabatan', 'tingkatan', 'is_aktif', 'posisi'];

    public function warga()
    {
        return $this->belongsTo(UserDetail::class);
    }




    // public function validasiSurat()
    // {
    //     return $this->hasMany(ValidasiSurat::class);
    // }
}
