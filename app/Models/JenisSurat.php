<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JenisSurat extends Model
{
    protected $table = 'jenis_surat';
    protected $fillable = ['nama_surat', 'kd_surat', 'alasan_dflt'];


    public function suratPengajuan()
    {
        return $this->hasMany(Surat::class);
    }
}
