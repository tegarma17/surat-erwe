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
        Schema::create('jabatan_warga', function (Blueprint $table) {
            $table->id();
            $table->foreignId('warga_id')->constrained('warga')->onDelete('cascade');
            $table->enum('jabatan', ['ket', 'W_ket', 'bend', 'sekre', 'seksi']);
            $table->enum('tingkatan', ['rt', 'rw']);
            $table->enum('is_aktif', ['aktif', 'nonaktif'])->default('aktif');
            $table->enum('posisi', ['sek_keamanan', 'sek_keagam', 'sek_sos', 'sek_pemba', 'sek_pemuda_olahara', 'sek_humas', 'sek_pkk', 'sek_pendikbud', 'sek_kes'])->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jabatan_warga');
    }
};
