<?php

namespace App\Http\Controllers;

use App\Models\Kelurahan;
use App\Models\Rt;
use App\Models\Rw;
use App\Models\UserDetail;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\User;

class WargaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $warga = UserDetail::paginate(7);
        return Inertia::render('Warga/Index', compact('warga'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $kelurahans = Kelurahan::with('rws.rts')->get();
        return Inertia::render('Warga/Tambah', [
            'kelurahans' => $kelurahans,

        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $message = [
            'required' => ':attribute Harap wajib diisi',
            'max_digits' => ':attribute Terlalu panjang, maksimal 20 karakter',
            'email' => ':attribute Email tidak valid',
            'numeric' => ':attribute Harap diisi dengan angka',
            'image' => ':attribute harus berupa gambar',
            'mimes' => ':attribute harus berformat :values',
            'foto.max' => 'Ukuran foto terlalu besar, maksimal 2MB',
        ];
        $atribute = [
            'nik' => 'NIK',
            'nama' => 'Nama',
            'alamat' => 'Alamat',
            'jk' => 'Jenis Kelamin',
            'tmpt_lahir' => 'Tempat Lahir',
            'tgl_lahir' => 'Tanggal Lahir',
            'agama' => 'Agama',
            'sts_pernikahan' => 'Status Pernikahan',
            'pekerjaan' => 'Pekerjaan',
            'no_hp' => 'Nomer Hp',
            'sts_tinggal' => 'Status Tinggal',
            'sts_domisili' => 'Status Domisili',
            'rt_id' => "Alamat Lengkap"
        ];
        $validated =  $request->validate([
            'nik' => 'required|numeric|max_digits:20',
            'email' => 'required|email',
            'nama' => 'required',
            'alamat' => 'required',
            'jk' => 'required',
            'tmpt_lahir' => 'required',
            'tgl_lahir' => 'required',
            'agama' => 'required',
            'sts_pernikahan' => 'required',
            'sts_tinggal' => 'required',
            'sts_warga' => 'required',
            'rt_id' => 'required',
            'pekerjaan' => 'required',
            'no_hp' => 'required|numeric|max_digits:15',
            'foto' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ], $message, $atribute);
        $dataUser = [
            'name' => $validated['nama'],
            'email' => $validated['email'],
            'password' => bcrypt('warga'),
            'role_id' => '3'
            // gunakan NIK sebagai password
        ];
        User::create($dataUser);
        $dataWarga = [
            'nik' => $validated['nik'],
            'rt_id' => $validated['rt_id'],
            'users_id' => User::where('email', $validated['email'])->first()->id,
            'nama' => $validated['nama'],
            'alamat' => $validated['alamat'],
            'jk' => $validated['jk'],
            'tmpt_lahir' => $validated['tmpt_lahir'],
            'tgl_lahir' => $validated['tgl_lahir'],
            'alamat_ktp' => $request->input('alamat_ktp'),
            'agama' => $validated['agama'],
            'sts_pernikahan' => $validated['sts_pernikahan'],
            'sts_tinggal' => $validated['sts_tinggal'],
            'sts_domisili' => $request->input('sts_domisili'),
            'pekerjaan' => $validated['pekerjaan'],
            'no_hp' => $validated['no_hp'],
            'tgl_masuk' => $request->input('tgl_masuk'),
            'sts_warga' => $validated['sts_warga']

        ];
        if ($request->input('sts_warga') === 'baru') {
            $dataWarga['tgl_masuk'] = now();
        }

        if ($request->hasFile('foto')) {
            $dataWarga['foto'] = $request->file('foto')->store('warga', 'public');
        }
        UserDetail::create($dataWarga);
        return redirect()->route('warga.index')->with('message', 'Data Warga Baru Berhasil ditambahkan');
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

        $kelurahans = Kelurahan::with('rws.rts')->get();
        $user = UserDetail::findOrFail($id);
        $getEmail = User::where('id', $user->users_id)->first()->email;
        $rt_id = $user->rt_id;
        $rt = Rt::with('rw.kelurahan')->find($rt_id);

        return Inertia::render('Warga/Ubah', [
            'warga' => $user,
            'email' => $getEmail,
            'kelurahans' => $kelurahans,
            'initialRtId' => $user->rt_id,
            'initialRwId' => $rt->rw->id,
            'initialKelurahanId' => $rt->rw->kelurahan->id,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, UserDetail $warga)
    {
        try {
            // ✅ Validasi request
            $message = [
                'required' => ':attribute Harap wajib diisi',
                'max_digits' => ':attribute Terlalu panjang, maksimal 20 karakter',
                'email' => ':attribute Email tidak valid',
                'numeric' => ':attribute Harap diisi dengan angka',
                'image' => ':attribute harus berupa gambar',
                'mimes' => ':attribute harus berformat :values',
                'foto.max' => 'Ukuran foto terlalu besar, maksimal 2MB',
            ];
            $atribute = [
                'nik' => 'NIK',
                'nama' => 'Nama',
                'alamat' => 'Alamat',
                'jk' => 'Jenis Kelamin',
                'tmpt_lahir' => 'Tempat Lahir',
                'tgl_lahir' => 'Tanggal Lahir',
                'agama' => 'Agama',
                'sts_pernikahan' => 'Status Pernikahan',
                'pekerjaan' => 'Pekerjaan',
                'no_hp' => 'Nomer Hp',
            ];
            $validated =  $request->validate([
                'nik' => 'required|numeric|max_digits:20',
                'email' => 'required|email',
                'nama' => 'required',
                'alamat' => 'required',
                'jk' => 'required',
                'tmpt_lahir' => 'required',
                'tgl_lahir' => 'required',
                'agama' => 'required',
                'sts_pernikahan' => 'required',
                'pekerjaan' => 'required',
                'no_hp' => 'required|numeric|max_digits:15',
                'foto' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            ], $message, $atribute);

            $warga->update([
                'nik' => $validated['nik'],
                'nama' => $validated['nama'],
                'alamat' => $validated['alamat'],
                'jk' => $validated['jk'],
                'tmpt_lahir' => $validated['tmpt_lahir'],
                'tgl_lahir' => $validated['tgl_lahir'],
                'agama' => $validated['agama'],
                'sts_pernikahan' => $validated['sts_pernikahan'],
                'pekerjaan' => $validated['pekerjaan'],
                'no_hp' => $validated['no_hp'],
                'is_aktif' => $request->input('is_aktif'),
            ]);
            // ✅ Cari data yang mau di-update
            if ($request->hasFile('foto') && $request->file('foto')->isValid()) {
                // Hapus foto lama
                if ($warga->foto && Storage::disk('public')->exists($warga->foto)) {
                    Storage::disk('public')->delete($warga->foto);
                }
                // Simpan foto baru
                $path = $request->file('foto')->store('warga', 'public');
                $warga->foto = $path;
            }
            // ✅ Simpan perubahan
            $warga->save();
            return redirect()->route('warga.index')->with('message', 'Data Warga berhasil diperbarui');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Terjadi kesalahan saat memperbarui data Warga']);
        }
    }
    public function updateStatusWarga(Request $request, UserDetail $warga)
    {
        $warga->update([
            'is_aktif' => $request->input('is_aktif')
        ]);
        return redirect()->back()->with('message', 'Nama Kelurahan berhasil diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $warga = UserDetail::findorFail($id);
        if ($warga->foto && Storage::disk('public')->exists($warga->foto)) {
            Storage::disk('public')->delete($warga->foto);
        }
        $user = User::findOrFail($warga->user_id);
        $warga->delete();
        $user->delete();
        return redirect()->route('warga.index')->with('message', 'Data Warga Berhasil dihapus');
    }
}
