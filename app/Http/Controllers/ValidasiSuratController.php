<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Surat;

use App\Models\Jabatan;
use App\Models\UserDetail;
use App\Models\ValidasiSurat;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class ValidasiSuratController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $wargaId = Auth::user()->user_detail->id;

        $userDetail = UserDetail::find($wargaId);
        $jabatanRT = Jabatan::where('warga_id', $wargaId)
            ->where('tingkatan', 'rt')
            ->firstOrFail();
        $validasiSurat = ValidasiSurat::with('surat.userDetail', 'surat.jenisSurat')
            ->where('jabatan_id', $jabatanRT->id)
            ->where('status_validasi', 'cek') // atau status lain yang relevan
            ->get();
        return Inertia::render('Validasi_Surat/Index', compact('validasiSurat'));
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Surat/Tambah');
    }

    /**
     * Store a newly created resource in storage.
     */


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $surat = Surat::with(['validasiSurat', 'userDetail'])->findOrfail($id);
        $userRtId = Auth::user()->user_detail->rt_id;
        $suratRtid = $surat->userDetail->rt_id;

        if ($userRtId !== $suratRtid) {
            abort(403, 'Anda tidak memiliki akses ke surat ini.');
        }

        return Inertia::render('Validasi_Surat/Ubah', compact('surat'));
    }
    public function download($id)
    {
        $surat = Surat::findOrFail($id);
        $path = storage_path('app/public/' . $surat->lampiran);

        if (!file_exists($path)) {
            abort(404, 'File tidak ditemukan');
        }

        return response()->download($path);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ValidasiSurat $validasi_surat)
    {
        $user = Auth::user()->id;
        $userDetailId = UserDetail::wherE('users_id', $user)->value('id');
        $jabatanId = Jabatan::where('warga_id', $userDetailId)->first();
        try {
            $validasi_surat->update([
                'status' => $request->input('status'),
                'jabatan_id' => $jabatanId['id'],
            ]);


            return redirect()->route('validasi.index')->with('message', 'Validasi Surat berhasil diperbarui');
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
        return redirect()->route('surat.index')->with('message', 'Validasi Surat Berhasil dihapus');
    }
}
