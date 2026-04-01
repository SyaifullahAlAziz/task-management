<?php

namespace App\Http\Controllers;

use App\Models\Level;
use App\Models\LogUser;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Exports\UserExport;
use Maatwebsite\Excel\Facades\Excel;

class UserController extends Controller
{
    public function index()
    {
        $data['user'] = User::get();

        return view('user.index');
    }

    private function getFilteredUserQuery(Request $request)
    {
        $query = User::with('level')
            ->where('is_deleted', 1);

        $tglMulai  = $request->tgl_mulai;
        $tglSampai = $request->tgl_sampai;
        $search    = $request->search['value'] ?? null;

        // FILTER TANGGAL
        if ($tglMulai && $tglSampai) {
            $query->whereBetween('created_at', [
                $tglMulai . ' 00:00:00',
                $tglSampai . ' 23:59:59'
            ]);
        } elseif ($tglMulai) {
            $query->whereDate('created_at', '>=', $tglMulai);
        } elseif ($tglSampai) {
            $query->whereDate('created_at', '<=', $tglSampai);
        }

        // SEARCH
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('username', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhereHas('level', function ($q2) use ($search) {
                        $q2->where('namalevel', 'like', "%{$search}%");
                    });
            });
        }

        return $query;
    }

    public function data(Request $request)
    {
        $columns = [
            0 => null,          // No
            1 => 'created_at',          // Level (relasi, tidak bisa direct order)
            2 => null,          // Level (relasi, tidak bisa direct order)
            3 => 'name',
            4 => 'username',
            5 => 'email',
            6 => 'password',
            7 => 'foto_profile',
        ];

        $draw   = $request->draw;
        $start  = $request->start;   // ini kunci nomor urut
        $length = $request->length;
        $search = $request->search['value'];

        $query = $this->getFilteredUserQuery($request);

        $recordsFiltered = $query->count();

        // order
        if ($request->order) {
            $columnIndex = $request->order[0]['column'];
            $dir = $request->order[0]['dir'];

            // CEK: kolom harus ADA & tidak null
            if (isset($columns[$columnIndex]) && $columns[$columnIndex] !== null) {
                $query->orderBy($columns[$columnIndex], $dir);
            }
        }

        // pagination
        $data = $query->offset($start)->limit($length)->get();
        $recordsTotal = User::where('is_deleted', 1)->count();

        $result = [];
        foreach ($data as $i => $row) {
            $foto = $row->foto_profile
                ? asset('admin/images/auth/' . $row->foto_profile)
                : '';

            $result[] = [
                'no' => $start + $i + 1,
                'created_at' => date('d-m-Y', strtotime($row->created_at)),
                'namalevel' => $row->level->namalevel ?? '-',
                'name' => $row->name,
                'username' => $row->username,
                'email' => $row->email,
                'password' => $row->duplicate,
                'foto_profile' => '<img src="' . $foto . '" width="40" height="40" class="rounded-circle">',
                'id' => $row->id,
                'edit_url' => route('user.edit', $row->id),
                'delete_url' => route('user.delete', $row->id),
                // field lain

            ];
        }

        return response()->json([
            'draw' => intval($draw),
            'recordsTotal' => $recordsTotal,
            'recordsFiltered' => $recordsFiltered,
            'data' => $result
        ]);
    }

    public function add()
    {
        $data['level'] = Level::get();

        return view('user.add', $data);
    }

    public function insert(Request $request)
    {
        $request->validate([
            'foto_profile' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $tgl = date('Y-m-d');
        $timestamp = date('Y-m-d H:i:s');
        $nama = session('user.name');

        if ($request->file('foto_profile')) {
            // Ambil file
            $file = $request->file('foto_profile');
            // Buat nama file
            $filename = time() . '.' . $file->getClientOriginalExtension();
            // Simpan file ke public/images/auth
            $file->move(public_path('admin/images/auth/'), $filename);

            User::insert([
                'level_id' => $request->level_id,
                'name' => $request->name,
                'username' => $request->username,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'duplicate' => $request->password,
                'foto_profile' => $filename,
                'created_at' => $timestamp,
                'created_by' => $nama,
            ]);
        } else {
            User::insert([
                'level_id' => $request->level_id,
                'name' => $request->name,
                'username' => $request->username,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'duplicate' => $request->password,
                'created_at' => $timestamp,
                'created_by' => $nama,
            ]);
        }

        $user = User::orderBy('id', 'desc')
            ->first();

        // Log User
        LogUser::insert([
            'user_id' => $user->id,
            'aktivitas' => 'Menambahkan Data User',
            'user' => $nama,
            'tanggal' => $tgl,
            'waktu_dibuat' => $timestamp,
        ]);

        return redirect()->route('user.index');
    }

    public function edit(Request $request, $id)
    {
        $data['user'] = User::where('id', $id)->first();
        $data['level'] = Level::get();

        return view('user.edit', $data);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'foto_profile' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $tgl = date('Y-m-d');
        $timestamp = date('Y-m-d H:i:s');
        $nama = session('user.name');

        if ($request->file('foto_profile')) {
            // Ambil file
            $file = $request->file('foto_profile');
            // Buat nama file
            $filename = time() . '.' . $file->getClientOriginalExtension();
            // Simpan file ke public/images/auth
            $file->move(public_path('admin/images/auth/'), $filename);

            User::where('id', $id)->update([
                'level_id' => $request->level_id,
                'name' => $request->name,
                'username' => $request->username,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'duplicate' => $request->password,
                'foto_profile' => $filename,
                'updated_at' => $timestamp,
                'updated_by' => $nama,
            ]);
        } else {
            User::where('id', $id)->update([
                'level_id' => $request->level_id,
                'name' => $request->name,
                'username' => $request->username,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'duplicate' => $request->password,
                'updated_at' => $timestamp,
                'updated_by' => $nama,
            ]);
        }

        // Log User
        LogUser::insert([
            'user_id' => $id,
            'aktivitas' => 'Mengubah Data User',
            'user' => $nama,
            'tanggal' => $tgl,
            'waktu_dibuat' => $timestamp,
        ]);

        return redirect()->route('user.index');
    }

    public function delete($id)
    {
        $tgl = date('Y-m-d');
        $timestamp = date('Y-m-d H:i:s');
        $nama = session('user.name');

        User::where('id', $id)->update([
            'is_deleted' => '0',
            'deleted_at' => $timestamp,
            'deleted_by' => $nama,
        ]);

        // Log User
        LogUser::insert([
            'user_id' => $id,
            'aktivitas' => 'Menghapus Data User',
            'user' => $nama,
            'tanggal' => $tgl,
            'waktu_dibuat' => $timestamp,
        ]);

        return back();
    }

    public function pdf(Request $request)
    {
        $user = $this->getFilteredUserQuery($request)->get();

        // Tambahkan path foto lengkap untuk DOMPDF
        $user = $user->map(function ($u) {
            $fotoPath = public_path('admin/images/auth/' . $u->foto_profile);
            $u->foto_path = file_exists($fotoPath) ? $fotoPath : null;
            return $u;
        });

        $data = [
            'title' => 'Data User',
            'user'  => $user,
        ];

        $pdf = PDF::loadView('user.pdf', $data);

        return $pdf->download('user.pdf');
    }

}
