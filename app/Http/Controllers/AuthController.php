<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function index()
    {
        return view('auth.login');
    }

    public function proses_login(Request $request)
    {
        // cek data login
        $user = User::where('email', '=', $request->email)
                ->where('password', '=', $request->password)
            ->first();

        if ($user) {
            // masukan data login ke session
            $request->session()->put('user', [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'level_id' => $user->level_id,
                'foto_profile' => $user->foto_profile,
            ]);

            return redirect()->route('home')->with('success', 'Selamat Datang!');
        }

        if ($user == FALSE) {
            return redirect()->route('login')->with('error', 'Email Salah!');
        }

        if (!Hash::check($request->password, $user->password)) {
            return redirect()->route('login')->with('error', 'Password Salah!');
        }
    }

    public function logout()
    {
        session()->flush();

        return redirect()->route('login')->with('success', 'Anda Berhasil Logout!');
    }
}
