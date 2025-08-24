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
        Schema::create('warga', function (Blueprint $table) {
            $table->id();
            $table->foreignId('users_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('rt_id')->constrained('rt');
            $table->string('nik', 20)->unique();
            $table->string('nama', 100);
            $table->longText('alamat');
            $table->enum('jk', ['l', 'p']);
            $table->string('tmpt_lahir', 75);
            $table->date('tgl_lahir');
            $table->enum('agama', ['islam', 'kristen', 'katholik', 'protestan', 'buddha', 'hindu', 'konghuchu', 'tidak']);
            $table->enum('sts_pernikahan', ['sudah', 'belum', 'cerai hidup', 'cerai mati']);
            $table->enum('pekerjaan', ['pns', 'aparat', 'swasta', 'wirausaha', 'petani', 'nelayan', 'pelajar', 'freelance', 'guru', 'nakes', 'irt', 'tidak_bekerja', 'pensiun', 'lainnya']);
            $table->string('no_hp', 15);
            $table->enum('is_aktif', ['pindah', 'meninggal', 'tetap'])->default('tetap');
            $table->date('tgl_masuk')->nullable();
            $table->string('foto');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('warga');
    }
};
