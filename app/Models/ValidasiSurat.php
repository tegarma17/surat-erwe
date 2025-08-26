<?php

namespace App\Models;

use App\Models\Jabatan;
use App\Models\Surat;
use Illuminate\Database\Eloquent\Model;

class ValidasiSurat extends Model
{
    protected $table = 'validasi_surat';
    protected $fillable = [
        'surat_id',
        'jabatan_id',
        'status',
        'alasan'

    ];
    public function jabatan()
    {
        return $this->belongsTo(Jabatan::class, 'jabatan_id');
    }
    public function surat()
    {
        return $this->belongsTo(Surat::class, 'surat_id');
    }
}
