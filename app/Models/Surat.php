<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\UserDetail;
use App\Models\Jabatan;
use App\Models\ValidasiSurat;

class Surat extends Model
{
    protected $table = 'surats';
    protected $fillable = [
        'warga_id',
        'jenis_surat',
        'alasan',
        'lampiran',
    ];
    public function jabatan()
    {
        return $this->hasOne(Jabatan::class);
    }
    public function userDetail()
    {
        return $this->belongsTo(UserDetail::class, 'userDetail_id');
    }
    public function validasiSurat()
    {
        return $this->hasOne(ValidasiSurat::class, 'surat_id');
    }
}
