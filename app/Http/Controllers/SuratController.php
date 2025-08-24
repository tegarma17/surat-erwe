<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Surat;
use App\Models\Berita;
use App\Models\Jabatan;
use App\Models\UserDetail;
use Illuminate\Support\Str;
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
        $surat = Surat::with(['validasiSurat'])->get();
        return Inertia::render('Surat/Index', compact('surat'));
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
    public function store(Request $request)
    {
        $userID = Auth::user()->id;
        $userDetailId = UserDetail::where('user_id', $userID)->value('id');

        $validated =  $request->validate([
            'j_surat' => 'required',
            'alasan' => 'required',
            'wilayah' => 'required',
            'tingkatan' => 'required',
            'lampiran' => 'required|file|mimes:zip, rar|max:10240',
            'surat_id' => 'nullable|exists:surats,id',
            'status' => 'nullable', // Optional, for updating existing surat
        ]);

        $surat = [
            'userDetail_id' => $userDetailId,
            'j_surat' => $validated['j_surat'],
            'alasan' => $validated['alasan'],
            'wilayah' => $validated['wilayah'],
            'tingkatan' => $validated['tingkatan'],
        ];
        if ($request->hasFile('lampiran')) {
            $surat['lampiran'] = $request->file('lampiran')->store('lampiran', 'public');
        }

        Surat::create($surat);
        $validasiSurat = [
            'surat_id' => Surat::latest()->first()->id,
            'status' => 'Proses',
        ];
        ValidasiSurat::create($validasiSurat);

        return redirect()->route('surat.index')->with('message', 'Surat Berhasil dibuat');
    }

    /**
     * Display the specified resource.
     */
    public function downloadSurat(Request $request)
    {
        $user = Auth::user()->id;
        $userDetail = UserDetail::where('user_id', $user)->first();
        $surat = Surat::where('userDetail_id', $userDetail->id)->first();

        $viewData = [
            'userDetail' => $userDetail,
            'surat' => $surat,
        ];
        if ($surat->j_surat == 'suket') {
            $pdf = Pdf::loadView('templates.surat_kustom', $viewData);
        } elseif ($surat->j_surat == 'sudom') {
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
            return redirect()->route('surat.index')->with('message', 'Berita berhasil diperbarui');
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
        return redirect()->route('surat.index')->with('message', 'Berita Berhasil dihapus');
    }
}
