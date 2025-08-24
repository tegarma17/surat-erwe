<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserDetail;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use function Pest\Laravel\json;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $user = User::all();
        return Inertia::render('User/Index', compact('user'));
    }

    public function dataWarga()
    {
        $dataWarga = UserDetail::paginate(10);
        return response()->json($dataWarga);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = User::create($request->all());
        $user->userDetail()->create(['nama' => $request->nama]);
        return response()->json($user, 201);
    }

    /**
     * Display the specified resource.
     */
    public function login(Request $request)
    {
        $credential = $request->validate([
            'username' => 'require',
            'password' => 'password',

        ]);
        if (!Auth::attempt($credential)) {
            return response()->json(['msg' => 'Username atau Password Salah!!']);
        }
        $user = Auth::user();
        return response()->json([
            'msg' => 'Login Berhasil',
            'user' => $user
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
