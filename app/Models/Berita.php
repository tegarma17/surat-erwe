<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Berita extends Model
{
    use HasFactory;
    protected $table = 'berita';
    protected $fillable =
    [
        'judul',
        'kategori',
        'rt_id',
        'slug',
        'isi_berita',
        'foto',
    ];
}
