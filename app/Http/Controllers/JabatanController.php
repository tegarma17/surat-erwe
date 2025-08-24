<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Models\Jabatan;
use App\Models\UserDetail;
use Illuminate\Http\Request;

class JabatanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $pengurus = Jabatan::with(['warga.rt.rw'])->get();

        return Inertia::render('Pengurus/Index', compact('pengurus'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $userDetail = UserDetail::all();
        return Inertia::render('Pengurus/Tambah', compact('userDetail'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'warga_id' => 'required|exists:warga,id',
            'jabatan' => 'required',
            'tingkatan' => 'required',
            'posisi' => 'nullable',
        ]);
        $jabatan = [
            'warga_id' => $validated['warga_id'],
            'jabatan' => $validated['jabatan'],
            'tingkatan' => $validated['tingkatan'],
            'posisi' => $validated['posisi'],
        ];
        Jabatan::create($jabatan);
        return redirect()->route('pengurus.index')->with('message', 'Jabatan berhasil ditambahkan');
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
        $jabatan = Jabatan::with(['userDetail'])->find($id);
        return response()->json($jabatan);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $jabatan = Jabatan::findorFail($id);
        $jabatan->update([
            'user_detail_id' => $request->user_detail_id,
            'jabatan' => $request->jabatan,
            'tingkatan' => $request->tingkatan,
            'wilayah' => $request->wilayah,
            'posisi' => $request->posisi,
        ]);
        return response()->json($jabatan, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $jabatan = Jabatan::findorFail($id);
        $jabatan->delete();
        return response()->json(['message' => 'Jabatan deleted successfully'], 200);
    }
}
