<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class TaskController extends Controller
{
    public function index()
    {
        $data['task'] = Task::get();

        return view('task.index', $data);
    }

    public function data(Request $request)
    {
        $id = $request->id;

        $columns = [
            0 => null,
            1 => 'tgl_deadline',
            2 => 'judul',
            3 => 'deskripsi',
            4 => 'prioritas',
            5 => 'status',
            6 => 'Action',
        ];

        $draw   = $request->input('draw', 1);
        $start  = $request->input('start', 0);
        $length = $request->input('length', 10);
        $search = $request->input('search.value');

        $tglMulai  = $request->tgl_mulai;
        $tglSampai = $request->tgl_sampai;

        //Filter User
        $query = Task::where('task.user_id', session('user.id'))
            ->orderBy('id', 'desc');

        // FILTER TANGGAL
        if ($tglMulai && $tglSampai) {
            $query->whereBetween('tgl_deadline', [
                $tglMulai . ' 00:00:00',
                $tglSampai . ' 23:59:59'
            ]);
        } elseif ($tglMulai) {
            $query->whereDate('tgl_deadline', '>=', $tglMulai);
        } elseif ($tglSampai) {
            $query->whereDate('tgl_deadline', '<=', $tglSampai);
        }

        // SEARCH
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('tgl_deadline', 'like', "%{$search}%")
                    ->orWhere('judul', 'like', "%{$search}%")
                    ->orWhere('prioritas', 'like', "%{$search}%")
                    ->orWhere('status', 'like', "%{$search}%");
            });
        }

        $recordsFiltered = $query->count();

        //  ORDERING
        if ($request->order) {
            $columnIndex = $request->order[0]['column'];
            $dir = $request->order[0]['dir'];

            if (isset($columns[$columnIndex]) && $columns[$columnIndex] !== null) {
                $query->orderBy($columns[$columnIndex], $dir);
            }
        }

        //  PAGINATION
        $data = $query->offset($start)->limit($length)->get();

        $recordsTotal = Task::where('user_id', session('user.id'))
            ->count();

        //  FORMAT DATA
        $result = [];
        foreach ($data as $row) {
            $result[] = [
                'tgl_deadline' => date('d-m-Y', strtotime($row->tgl_deadline)),
                'judul' => $row->judul,
                'deskripsi' => $row->deskripsi,
                'prioritas' => $row->prioritas,
                'status' => $row->status,
                'id' => $row->id,
            ];
        }

        return response()->json([
            'draw' => intval($draw),
            'recordsTotal' => $recordsTotal,
            'recordsFiltered' => $recordsFiltered,
            'data' => $result,
        ]);
    }

    public function insert(Request $request)
    {
        $tgl = date('Y-m-d');
        $user_id = session('user.id');

        Task::insert([
            'user_id' => $user_id,
            'judul' => $request->judul,
            'deskripsi' => $request->deskripsi,
            'status' => 'pending',
            'status' => 'pending',
            'tgl_mulai' => $request->tgl_mulai,
            'tgl_deadline' => $request->tgl_deadline,
            'tgl_selesai' => $request->tgl_selesai,
        ]);

        return back()->with('success', 'Data Berhasil Ditambahkan!');
    }

    public function updateStatus(Request $request, $id)
    {
        try {
            $task = Task::findOrFail($id);

            $task->status = $request->status;
            $task->save();

            return response()->json([
                'message' => 'Status berhasil diubah'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan server'
            ], 500);
        }
    }
}
