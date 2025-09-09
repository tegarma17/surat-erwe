<?php

namespace Database\Seeders;

use App\Models\JenisSurat;
use DateTime;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class JenisSuratSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        JenisSurat::insert(
            [
                [
                    'nama_surat' => 'Surat Keterangan Domisili',
                    'kd_surat' => 'SKET',
                    'alasan_dflt' => 'Untuk keperluan pembuatan KTP, KK, sekolah anak, kerja, atau urusan bank'
                ],
                [
                    'nama_surat' => 'Surat Pengantar SKCK',
                    'kd_surat' => 'SPEN',
                    'alasan_dflt' => 'Untuk melamar kerja, daftar CPNS, atau keperluan legalitas usaha'
                ],
                [
                    'nama_surat' => 'Surat Keterangan Tidak Mampu',
                    'kd_surat' => 'SKET',
                    'alasan_dflt' => 'Untuk pengajuan beasiswa, bantuan sosial, atau pengobatan gratis'
                ],
                [
                    'nama_surat' => 'Surat Keterangan Usaha',
                    'kd_surat' => 'SKET',
                    'alasan_dflt' => 'Untuk pendaftaran NPWP, izin usaha, atau pengajuan kredit usaha'
                ],
                [
                    'nama_surat' => 'Surat Izin Keramaian',
                    'kd_surat' => 'SI',
                    'alasan_dflt' => 'Untuk acara hajatan, pengajian, konser, atau kegiatan masyarakat'
                ],
                [
                    'nama_surat' => 'Surat Keterangan Kematian',
                    'kd_surat' => 'SKET',
                    'alasan_dflt' => 'Untuk pembuatan akta kematian, pengurusan warisan, atau pemakaman'
                ],
                [
                    'nama_surat' => 'Surat Pengantar Pindah',
                    'kd_surat' => 'SPEN',
                    'alasan_dflt' => 'Untuk pindah domisili ke wilayah lain dan pengurusan dokumen kependudukan'
                ],
                [
                    'nama_surat' => 'Surat Pengantar Datang',
                    'kd_surat' => 'SPEN',
                    'alasan_dflt' => 'Untuk warga baru yang pindah masuk dan ingin tercatat di wilayah RT/RW'
                ],
                [
                    'nama_surat' => 'Surat Keterangan Belum Menikah',
                    'kd_surat' => 'SKET',
                    'alasan_dflt' => 'Untuk syarat nikah, daftar CPNS, atau pengajuan visa'
                ],
                [
                    'nama_surat' => 'Surat Pengantar BPJS',
                    'kd_surat' => 'SPEN',
                    'alasan_dflt' => 'Untuk pendaftaran BPJS Kesehatan atau Ketenagakerjaan'
                ],
                [
                    'nama_surat' => 'Surat Keterangan Kepemilikan Rumah',
                    'kd_surat' => 'SKET',
                    'alasan_dflt' => 'Untuk urusan bank, pajak, atau pengajuan sambungan listrik/air'
                ],
                [
                    'nama_surat' => 'Surat Keterangan Tinggal Sementara',
                    'kd_surat' => 'SKET',
                    'alasan_dflt' => 'Untuk anak kos, pekerja kontrak, atau warga luar daerah yang tinggal sementara'
                ],
                [
                    'nama_surat' => 'Surat Keterangan Kehilangan',
                    'kd_surat' => 'SKET',
                    'alasan_dflt' => 'Untuk laporan kehilangan KTP, KK, SIM, atau barang penting ke kepolisian'
                ],
                [
                    'nama_surat' => 'Surat Keterangan Menikah',
                    'kd_surat' => 'SKET',
                    'alasan_dflt' => 'Untuk warga yang menikah secara adat dan belum tercatat di Dukcapil'
                ],
                [
                    'nama_surat' => 'Surat Keterangan Kelahiran',
                    'kd_surat' => 'SKET',
                    'alasan_dflt' => 'Untuk pembuatan akta kelahiran dan penambahan anggota keluarga di KK'
                ],
                [
                    'nama_surat' => 'Surat Keterangan Penghasilan',
                    'kd_surat' => 'SKET',
                    'alasan_dflt' => 'Untuk syarat beasiswa, pengajuan kredit, atau bantuan sosial'
                ],
                [
                    'nama_surat' => 'Surat Keterangan Cerai',
                    'kd_surat' => 'SKET',
                    'alasan_dflt' => 'Untuk warga yang bercerai secara adat dan belum tercatat resmi'
                ],
                [
                    'nama_surat' => 'Surat Keterangan Wali Nikah',
                    'kd_surat' => 'SKET',
                    'alasan_dflt' => 'Untuk keperluan pernikahan jika wali tidak bisa hadir atau sudah meninggal'
                ],
                [
                    'nama_surat' => 'Surat Keterangan Tanah',
                    'kd_surat' => 'SKET',
                    'alasan_dflt' => 'Untuk menyatakan kepemilikan atau penguasaan tanah di wilayah RT/RW'
                ],
                [
                    'nama_surat' => 'Surat Keterangan Renovasi/Pembangunan Rumah',
                    'kd_surat' => 'SKET',
                    'alasan_dflt' => 'Untuk izin renovasi atau pembangunan rumah agar tidak melanggar tata ruang lingkungan'
                ],

            ]
        );
    }
}
