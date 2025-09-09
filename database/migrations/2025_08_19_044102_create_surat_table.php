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
        Schema::create('jenis_surat', function (Blueprint $table) {
            $table->id();
            $table->string('nama_surat', 50);
            $table->string('kd_surat');
            $table->text('alasan_dflt');
            $table->timestamps();
        });
        Schema::create('surat', function (Blueprint $table) {
            $table->id();
            $table->foreignId('warga_id')->constrained('warga')->onDelete('cascade');
            $table->foreignId('jenis_surat_id')->constrained('jenis_surat')->onDelete('cascade');
            $table->text('alasan')->nullable();
            $table->boolean('validasi_rw')->default(true);
            $table->text('alasan_pengajuan')->nullable();
            $table->enum('status', ['selesai', 'ditolak', 'proses', 'cek']);
            $table->string('lampiran');
            $table->timestamps();
        });

        Schema::create('validasi_surat', function (Blueprint $table) {
            $table->id();
            $table->foreignId('surat_id')->constrained('surat')->onDelete('cascade');
            $table->foreignId('jabatan_id')->constrained('jabatan_warga')->onDelete('cascade')->nullable();
            $table->integer('urutan_validasi')->nullable();
            $table->enum('status_validasi', ['selesai', 'ditolak', 'proses', 'cek'])->nullable();
            $table->string('catatan')->nullable();
            $table->date('tgl_validasi');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('validasi_surat', function (Blueprint $table) {
            $table->dropForeign(['surat_id']);
        });
        Schema::dropIfExists('jenis_surat');
        Schema::dropIfExists('surat');
        Schema::dropIfExists('validasi_surat');
    }
};
