<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('berita', function (Blueprint $table) {
            $table->id();
            $table->foreignId('rt_id')->constrained('rt');
            $table->string('judul', 100);
            $table->string('slug', 100)->unique();
            $table->enum('kategori', ['event', 'kegiatan', 'pengumuman', 'peristiwa']);
            $table->longText('isi_berita');
            $table->string('foto');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('berita');
    }
};
