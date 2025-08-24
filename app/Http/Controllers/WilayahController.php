<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class WilayahController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $berita = Berita::all();
        return Inertia::render('Wilayah/Index', compact('berita'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Berita/Tambah');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated =  $request->validate([
            'judul' => 'required|string|max:255',
            'kategori' => 'required',
            'wilayah' => 'required',
            'isi_berita' => 'required',
            'foto' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);
        $berita = [
            'judul' => $validated['judul'],
            'kategori' => $validated['kategori'],
            'wilayah' => $validated['wilayah'],
            'slug' => Str::slug($validated['judul']),
            'isi_berita' => $validated['isi_berita'],
        ];

        if ($request->hasFile('foto')) {
            $berita['foto'] = $request->file('foto')->store('berita', 'public');
        }
        Berita::create($berita);
        return redirect()->route('berita.index')->with('message', 'Berita Berhasil ditambahkan');
    }

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
        return Inertia::render('Berita/Ubah', ['berita' => Berita::findOrFail($id),]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Berita $berita)
    {
        try {
            // ✅ Validasi request
            $request->validate([
                'judul' => 'required|string|max:255',
                'isi_berita' => 'required|string',
                'wilayah' => 'required',
                'kategori' => 'required',
                'foto' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            ]);

            $berita->update([
                'judul' => $request->input('judul'),
                'isi_berita' => $request->input('isi_berita'),
                'wilayah' => $request->input('wilayah'),
                'kategori' => $request->input('kategori'),
                'slug' => Str::slug($request->input('judul')),
            ]);
            // ✅ Cari data yang mau di-update
            if ($request->hasFile('foto') && $request->file('foto')->isValid()) {
                // Hapus foto lama
                if ($berita->foto && Storage::disk('public')->exists($berita->foto)) {
                    Storage::disk('public')->delete($berita->foto);
                }
                // Simpan foto baru
                $path = $request->file('foto')->store('berita', 'public');
                $berita->foto = $path;
            }
            // ✅ Simpan perubahan
            $berita->save();
            return redirect()->route('berita.index')->with('message', 'Berita berhasil diperbarui');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Terjadi kesalahan saat memperbarui berita']);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $berita = Berita::findorFail($id);
        if ($berita->foto && Storage::disk('public')->exists($berita->foto)) {
            Storage::disk('public')->delete($berita->foto);
        }
        $berita->delete();
        return redirect()->route('berita.index')->with('message', 'Berita Berhasil dihapus');
    }
}
