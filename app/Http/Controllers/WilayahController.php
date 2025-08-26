<?php

namespace App\Http\Controllers;


use App\Models\Kelurahan;
use App\Models\Rt;
use App\Models\Rw;
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
        $kelurahan = Kelurahan::all();
        return Inertia::render('Wilayah/Index', compact('kelurahan'));
    }

    /**
     * Show the form for creating a new resource.
     */


    /**
     * Store a newly created resource in storage.
     */
    public function storeKelurahan(Request $request)
    {
        $validated =  $request->validate([
            'nama' => 'required',
        ]);
        $kelurahan = [
            'nama' => $validated['nama'],
        ];
        Kelurahan::create($kelurahan);
        return redirect()->route('wilayah.index')->with('message', 'Wilayah Baru Berhasil ditambahkan');
    }
    public function deleteKelurahan(string $id)
    {
        $kelurahan = Kelurahan::findorFail($id);
        $kelurahan->delete();
        return back()->with('message', 'Wilayah Telah dihapus');
    }
    public function showDataKelurahan(string $id)
    {
        $kelurahan = Kelurahan::findOrFail($id);
        $rw = Rw::where('kelurahan_id', $kelurahan->id)->get();

        return Inertia::render(
            'Wilayah/Rw',
            [
                'kelurahan' => $kelurahan,
                'rw' => $rw
            ]
        );
    }

    public function simpanRw(Request $request)
    {
        $validated = $request->validate([
            'kelurahan_id' => 'required|exists:kelurahan,id',
            'rows' => 'required|array|min:1',
            'rows.*.nomer' => 'required|string|regex:/^\d+$/',

        ]);

        foreach ($validated['rows'] as $row) {
            Rw::create([
                'kelurahan_id' => $validated['kelurahan_id'],
                'nomer' => $row['nomer'],
            ]);
        }

        return back()->with('success', 'Data RW berhasil disimpan.');
    }
    public function deleteRW(string $id)
    {
        $rw = Rw::findOrFail($id);
        $rw->delete();
        return back()->with('message', 'RW Telah di hapus');
    }

    public function showDataRw(string $id)
    {
        $rw = Rw::findOrFail($id);
        $rt = Rt::where('rw_id', $rw->id)->get();

        return Inertia::render(
            'Wilayah/Rt',
            [
                'rw' => $rw,
                'rt' => $rt
            ]
        );
    }
    public function simpanRt(Request $request)
    {
        $validated = $request->validate([
            'rw_id' => 'required|exists:rw,id',
            'rows' => 'required|array|min:1',
            'rows.*.nomer' => 'required|string|regex:/^\d+$/',

        ]);

        foreach ($validated['rows'] as $row) {
            Rt::create([
                'rw_id' => $validated['rw_id'],
                'nomer' => $row['nomer'],
            ]);
        }

        return back()->with('message', 'Data RW berhasil disimpan.');
    }
    public function deleteRT(string $id)
    {
        $rt = Rt::findOrFail($id);
        $rt->delete();
        return back()->with('flash', [
            'message' => 'RW Telah di hapus',
            'timestamp' => now()->timestamp
        ]);
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
}
