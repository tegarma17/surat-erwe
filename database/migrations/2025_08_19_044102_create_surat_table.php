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
        Schema::create('surat', function (Blueprint $table) {
            $table->id();
            $table->foreignId('warga_id')->constrained('warga')->onDelete('cascade');
            $table->enum('jenis_surat', ['suket', 'supen', 'sudom']);
            $table->longText('alasan');
            $table->longText('lampiran');
            $table->timestamps();
        });

        Schema::create('validasi_surat', function (Blueprint $table) {
            $table->id();
            $table->foreignId('surat_id')->constrained('surat')->onDelete('cascade');
            $table->foreignId('jabatan_id')->constrained('jabatan_warga')->onDelete('cascade')->nullable();
            $table->longText('alasan')->nullable();
            $table->enum('status', ['selesai', 'ditolak', 'proses', 'cek']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('surat');
    }
};
