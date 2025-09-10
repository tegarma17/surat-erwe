<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Surat;
use App\Models\Jabatan;
use App\Models\JenisSurat;
use App\Models\UserDetail;
use Illuminate\Http\Request;
use App\Models\ValidasiSurat;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class SuratController extends Controller
{


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $wargaId = Auth::user()->user_detail->id;
        $surat = Surat::with(['jenisSurat'])
            ->where('warga_id', $wargaId)
            ->get();

        return Inertia::render('Surat/Index', compact('surat'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $jenisSurat = JenisSurat::all();
        return Inertia::render('Surat/Tambah', compact('jenisSurat'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $wargaId = Auth::user()->user_detail->id;
        $warga = UserDetail::with('rt.rw')->find($wargaId);
        $jenisSurat = JenisSurat::findOrFail($request->jenis_surat_id);
        $alasanPengajuan = $request->alasan_manual
            ? $request->alasan
            : $jenisSurat->alasan_dflt;


        // $validated =  $request->validate([
        //     'jenis_surat' => 'required',
        //     'alasan' => 'required',
        //     'lampiran' => 'required|file|mimes:zip, rar|max:10240',
        //     'surat_id' => 'nullable|exists:surats,id',
        //     'status' => 'nullable', // Optional, for updating existing surat
        // ]);

        $surat = [
            'warga_id' => $wargaId,
            'jenis_surat_id' => $request->jenis_surat_id,
            'alasan_pengajuan' => $jenisSurat->alasan_default,
            'alasan' => $alasanPengajuan,
            'alasan_manual' => $request->alasan_manual,
            'validasi_rw' => $request->validasi_rw,
            'status' => 'cek'

        ];
        // $namaRW = $userDetail->rt->rw;
        if ($request->hasFile('lampiran')) {
            $surat['lampiran'] = $request->file('lampiran')->store('lampiran', 'public');
        }
        Surat::create($surat);

        $petugasRT = UserDetail::where('rt_id', $warga->rt_id)
            ->whereHas('jabatan', fn($q) => $q->where('tingkatan', 'rt'))
            ->with('jabatan')
            ->first();
        $jabatanRT = $petugasRT->jabatan;

        $rwId = $warga->rt->rw_id;
        $petugasRW = UserDetail::whereHas('jabatan', fn($q) => $q->where('tingkatan', 'rw'))
            ->whereHas('rt', fn($q) => $q->where('rw_id', $rwId))
            ->with('jabatan')
            ->first();
        $jabatanRW = $petugasRW?->jabatan;

        $validasi = [
            [
                'surat_id' => Surat::latest()->first()->id,
                'jabatan_id' => $jabatanRT->id,
                'urutan_validasi' => 1,
                'status_validasi' => 'cek'
            ]
        ];
        if ($request->validasi_rw && $jabatanRW) {
            $validasi[] = [
                'surat_id' => Surat::latest()->first()->id,
                'jabatan_id' => $jabatanRW->id,
                'urutan_validasi' => 2,
                'status_validasi' => 'cek'
            ];
        }

        ValidasiSurat::insert($validasi);
        return redirect()->route('surat.index')->with('message', 'Surat Berhasil dibuat');
    }

    /**
     * Display the specified resource.
     */
    public function downloadSurat(string $id)
    {
        function labelKerja($kode)
        {
            return [
                'pns' => 'Pegawa Negeri Sipil',
                'wirausaha' => 'Wirausaha',
                'aparat' => 'Polisi / TNI / Aparatur Negara',
                'guru' => 'Guru',
                'swasta' => 'Pegawai Swasta',
                'mahasiswa' => 'Mahasiswa / Pelajar',
                'petani' => 'Petani',
                'melayan' => 'Nelayan',
                'freelance' => 'Freelance',
                'nakes' => 'Tenaga Kesehatan / Dokter / Bidan / Perawat',
                'irt' => 'Ibu Rumah Tangga',
                'pensiun' => 'Pensiun',
                'tidak' => 'Tidak Bekerja'
            ][$kode] ?? 'Tidak Diketahui';
        }
        function romawi($bulan)
        {
            $map = [
                1 => 'I',
                2 => 'II',
                3 => 'III',
                4 => 'IV',
                5 => 'V',
                6 => 'VI',
                7 => 'VII',
                8 => 'VIII',
                9 => 'IX',
                10 => 'X',
                11 => 'XI',
                12 => 'XII'
            ];

            return $map[(int)$bulan] ?? '-';
        }
        $user = Auth::user()->id;
        $userDetail = UserDetail::with('rt.rw')->where('users_id', $user)->first();
        $surat = Surat::with(['jenisSurat', 'validasiSurat.jabatan'])->findOrFail($id);

        $jabatanRt = Jabatan::with('warga.rt.rw')
            ->where('tingkatan', 'rt')
            ->where('warga_id', $surat->validasiSurat->where('urutan_validasi', '1')->first()?->jabatan->warga_id)
            ->first();

        $jabatanRw = Jabatan::with('warga')
            ->where('tingkatan', 'rw')
            ->where('warga_id', $surat->validasiSurat->where('urutan_validasi', '2')->first()?->jabatan->warga_id)
            ->first();
        $bulanRomawi = romawi(date('n', strtotime($surat->created_at)));
        $tahun = date('Y', strtotime($surat->created_at));
        
        $userDetail->pekerjaan = labelKerja($userDetail->pekerjaan);
        $viewData = [
            'userDetail' => $userDetail,
            'surat' => $surat,
            'rt' => $jabatanRt,
            'rw' => $jabatanRw,
            'nomerSurat' => $bulanRomawi,
            'tahun' => $tahun,
        ];
        if ($surat->jenisSurat->kd_surat == 'SKET') {
            $pdf = Pdf::loadView('templates.surat_kustom', $viewData);
        } elseif ($surat->jenis_surat == 'sudom') {
            $pdf = Pdf::loadView('templates.surat_domisili', $viewData);
        } else {
            $pdf = Pdf::loadView('templates.surat_pengantar', $viewData);
        }
        return $pdf->download('surat-kustom.pdf');
    }
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        return Inertia::render('Surat/Ubah', ['surat' => Surat::findOrFail($id),]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Surat $surat)
    {
        try {
            // ✅ Validasi request
            $request->validate([
                'j_surat' => 'required',
                'alasan' => 'required',
                'wilayah' => 'required',
                'tingkatan' => 'required',
                'lampiran' => 'nullable|file|mimes:zip, rar|max:10240',
                'surat_id' => 'nullable|exists:surats,id',
                'jabatan_id' => 'nullable|exists:jabatan,id',
                'status' => 'nullable', // Optional, for updating existing surat
            ]);

            $surat->update([
                'j_surat' => $request->input('j_surat'),
                'alasan' => $request->input('alasan'),
                'wilayah' => $request->input('wilayah'),
                'tingkatan' => $request->input('tingkatan'),
            ]);
            // ✅ Cari data yang mau di-update
            if ($request->hasFile('foto') && $request->file('foto')->isValid()) {
                // Hapus foto lama
                if ($surat->lampiran && Storage::disk('public')->exists($surat->lampiran)) {
                    Storage::disk('public')->delete($surat->lampiran);
                }
                // Simpan foto baru
                $path = $request->file('lampiran')->store('lampiran', 'public');
                $surat->lampiran = $path;
            }
            // ✅ Simpan perubahan
            $surat->save();
            return redirect()->route('surat.index')->with('message', 'Surat berhasil diperbarui');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Terjadi kesalahan saat memperbarui surat']);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $surat = Surat::findorFail($id);
        if ($surat->foto && Storage::disk('public')->exists($surat->lampiran)) {
            Storage::disk('public')->delete($surat->lampiran);
        }
        $surat->delete();
        return redirect()->route('surat.index')->with('message', 'Surat Berhasil dihapus');
    }
}
