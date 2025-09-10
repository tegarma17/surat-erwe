<?php

use App\Models\User;
use Inertia\Inertia;
use App\Models\Berita;
use App\Models\ValidasiSurat;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SuratController;
use App\Http\Controllers\WargaController;
use App\Http\Controllers\BeritaController;
use App\Http\Controllers\JabatanController;
use App\Http\Controllers\WilayahController;
use App\Http\Controllers\ValidasiSuratController;


Route::get('/', function () {
    $beritas = Berita::orderBy('created_at', 'desc')->take(7)->get()->map(function ($item) {
        return [
            'id' => $item->id,
            'judul' => $item->judul,
            'isi_berita' => $item->isi_berita,
            'foto' => Storage::url($item->foto), // hasil: /storage/berita/namafile.jpg
        ];
    });
    return Inertia::render('welcome', [
        'beritas' => $beritas,
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    route::get('/user-account', [UserController::class, 'index'])->name('user.account');


    Route::controller(WilayahController::class)->group(function () {

        route::get('/set-wilayah', 'index')->name('wilayah.index');
        route::post('/set-wilayah-kelurahan', 'storeKelurahan')->name('wilayah.simpan_kelurahan');
        route::delete('/delete-wilayah-kelurahan/{id}', 'deleteKelurahan')->name('wilayah.delete_kelurahan');
        route::get('/set-wilayah-kelurahan/rw/{id}', 'showDataKelurahan')->name('wilayah.data_rw');
        route::get('/set-wilayah-kelurahan/rw/rt/{id}', 'showDataRw')->name('wilayah.data_rt');
        route::post('/set-wilayah-kelurahan/rw/simpan', 'simpanRw')->name('simpanWilayah.data_rw');
        route::post('/set-wilayah-kelurahan/rw/rt/simpan', 'simpanRt')->name('simpanWilayah.data_rt');
        route::delete('/set-wilayah-kelurahan/rw/delete/{id}', 'deleteRW')->name('hapus.data_rw');
        route::delete('/set-wilayah-kelurahan/rw/rt/delete/{id}', 'deleteRT')->name('hapus.data_rt');
        route::put('/update-wilayah-kelurahan/{kelurahan}', 'updateKelurahan')->name('updateKelurahan.save');
    });


    Route::controller(SuratController::class)->group(function () {
        Route::get('/data-surat', 'index')->name('surat.index');
        Route::get('/data-surat-baru', 'create')->name('surat.create');
        Route::get('/data-surat/{id}/edit', 'edit')->name('surat.ubah');
        Route::post('/simpan-surat-baru', 'store')->name('surat.tambah');
        Route::delete('/data-surat/{id}', 'destroy')->name('surat.hapus');
        Route::put('/edit-surat/{surat}', 'update')->name('surat.update');
        Route::get('/surat/{id}/download', 'downloadSurat')->name('template_surat.download');
    });
    Route::controller(ValidasiSuratController::class)->group(function () {
        Route::get('/validasi-data-surat', 'index')->name('validasi.index');
        Route::get('/validasi-data-surat/{id}/edit', 'edit')->name('validasi_surat.ubah');
        Route::get('/validasi-surat/{id}/download', 'download')->name('surat.download');
        Route::put('/validasi-surat/{validasi}', 'update')->name('validasi_surat.update');
    });

    Route::controller(JabatanController::class)->group(function () {
        Route::get('/pengurus', 'index')->name('pengurus.index');
        Route::get('/tambah-pengurus-baru', 'create')->name('pengurus.create');
        Route::post('/simpan-pengurus-baru', 'store')->name('pengurus.tambah');
        Route::get('/data-pengurus/{id}/edit', 'edit')->name('pengurus.ubah');
        Route::put('/update-status-pengurus/{id}/edit', 'updateStatus')->name('statusUpdate.update');
    });


    Route::controller(WargaController::class)->group(function () {

        Route::get('/warga',  'index')->name('warga.index');
        Route::get('/tambah-warga-baru',  'create')->name('warga.create');
        Route::post('/simpan-data-warga',  'store')->name('warga.tambah');
        Route::get('/warga/{id}/edit',  'edit')->name('warga.ubah');
        Route::put('/warga/{warga}',  'update')->name('warga.update');
        Route::delete('/warga/{id}',  'destroy')->name('warga.hapus');
        Route::put('/update-status-warga/{warga}', 'updateStatusWarga')->name('wargaStatus.update');
    });
    Route::controller(BeritaController::class)->group(function () {

        Route::get('/berita',  'index')->name('berita.index');
        Route::get('/tambah-berita-baru',  'create')->name('berita.create');
        Route::post('/berita',  'store')->name('berita.tambah');
        Route::get('/berita/{id}/edit',  'edit')->name('berita.ubah');
        Route::put('/berita/{berita}',  'update')->name('berita.update');
        Route::delete('/berita/{id}',  'destroy')->name('berita.hapus');
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
