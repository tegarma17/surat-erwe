<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Surat;

use App\Models\Jabatan;
use App\Models\UserDetail;
use App\Models\ValidasiSurat;
use Carbon\Carbon;
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
        $jabatan = Jabatan::where('warga_id', $wargaId)
            ->where('jabatan', 'ket')
            ->whereIn('tingkatan', ['rt', 'rw'])
            ->firstOrFail();
        $surat = ValidasiSurat::with('surat')
            ->where('jabatan_id', $jabatan->id)
            ->get();

        $validasiSurat = ValidasiSurat::with('surat.userDetail', 'surat.jenisSurat')
            ->where('jabatan_id', $jabatan->id)
            ->where('status_validasi', 'cek') // hanya yang belum divalidasi
            ->get()
            ->filter(function ($item) {
                // Cek apakah semua validasi sebelumnya sudah selesai
                $previous = ValidasiSurat::where('surat_id', $item->surat_id)
                    ->where('urutan_validasi', '<', $item->urutan_validasi)
                    ->where('status_validasi', '!=', 'selesai')
                    ->exists();

                return !$previous;
            });

        return Inertia::render('Validasi_Surat/Index', compact('validasiSurat'));
    }


    public function edit(string $id)
    {
        $validasiSurat = ValidasiSurat::with(['surat.jenisSurat', 'surat.userDetail'])->findOrfail($id);
        $userDetail = Auth::user()->user_detail;
        $jabatan = Jabatan::where('warga_id', $userDetail->id)
            ->where('jabatan', 'ket')
            ->whereIn('tingkatan', ['rt', 'rw'])
            ->first();
        $pengaju = $validasiSurat->surat->userDetail;
        $aksesValid = false;

        if ($jabatan->tingkatan === 'rt') {
            $aksesValid = $userDetail->rt_id === $pengaju->rt_id;
        } elseif ($jabatan->tingkatan === 'rw') {
            $aksesValid = $userDetail->rt->rw_id === $pengaju->rt->rw_id;
        }

        if (!$aksesValid) {
            abort(403, 'Anda tidak memiliki akses ke surat ini.');
        }


        return Inertia::render('Validasi_Surat/Ubah', compact('validasiSurat'));
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
    public function update(Request $request, ValidasiSurat $validasi)
    {

        try {
            if ($validasi->status_validasi === 'ditolak' && $request->input('status_validasi') === 'selesai') {
                $validasi->update([
                    'status_validasi' => $request->input('status_validasi'),
                    'tgl_validasi' => Carbon::today(),
                    'catatan' => null
                ]);
            } else {
                $validasi->update([
                    'status_validasi' => $request->input('status_validasi'),
                    'tgl_validasi' => Carbon::today(),
                    'catatan' =>  $request->input('catatan'),
                ]);
            }
            $maxUrutan = ValidasiSurat::where('surat_id', $validasi->surat_id)->max('urutan_validasi');
            if ($validasi->urutan_validasi == $maxUrutan && $request->input('status_validasi') === 'selesai') {
                $validasi->surat->update([
                    'status' => 'selesai',
                ]);
            }

            return redirect()->route('validasi.index')->with('message', 'Validasi Surat berhasil diperbarui');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['message' => $e->getMessage()]);
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
