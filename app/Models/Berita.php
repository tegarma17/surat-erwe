<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Berita extends Model
{
    protected $table = 'berita';
    protected $fillable = ['judul', 'kategori', 'rt_id', 'slug', 'isi_berita', 'foto'];
}
