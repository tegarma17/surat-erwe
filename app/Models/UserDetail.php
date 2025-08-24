<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use PhpParser\Node\Stmt\Return_;

class UserDetail extends Model
{
    protected $table = 'warga';
    protected $fillable = [
        'users_id',
        'rt_id',
        'nik',
        'nama',
        'alamat',
        'jk',
        'tmpt_lahir',
        'tgl_lahir',
        'agama',
        'sts_pernikahan',
        'sts_tinggal',
        'sts_domisili',
        'pekerjaan',
        'no_hp',
        'alamat_ktp',
        'is_aktif',
        'tgl_masuk',
        'sts_warga',
        'foto'
    ];

    public function User()
    {
        return $this->belongsTo(User::class);
    }
    public function rt()
    {
        return $this->belongsTo(Rt::class);
    }

    public function jabatan()
    {
        return $this->hasOne(Jabatan::class);
    }
    // public function surats()
    // {
    //     return $this->hasMany(Surat::class);
    // }
}
