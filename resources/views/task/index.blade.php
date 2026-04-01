@extends('layout.index')
@section('title')
Data Task
@endsection
@section('content')

<style>
    #tabel-task th,
    #tabel-task td {
        text-align: left !important;
    }

</style>


<div class="content-wrapper">

    <div class="row align-items-center">
        <div class="col-lg-8">
            <h3>Data task</h3>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb" style="margin-left: -15px">
                    <li class="breadcrumb-item"><a href="{{ route('home') }}" class="text-primary">Home</a></li>
                    <li class="breadcrumb-item"><a href="#" class="text-primary">User</a>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">Data task</li>
                </ol>
            </nav>
        </div>
    </div>

    <div class="row">
        <div class="col-lg-12 grid-margin stretch-card">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-auto d-flex align-items-center">
                            <h4 class="card-title me-2 mb-0">
                                <button type="button" class="btn btn-primary" data-toggle="modal"
                                    data-target="#modalTambah">
                                    <i class="fa fa-plus"> Tambah Task</i>
                                </button>
                            </h4>
                        </div>
                        <div class="col-md-auto d-flex align-items-center">
                            <label for="tgl_mulai" class="me-2 mb-0">Tanggal Mulai</label>
                            <input type="date" id="tgl_mulai" class="form-control">
                        </div>

                        <div class="col-md-auto d-flex align-items-center">
                            <label for="tgl_sampai" class="me-2 mb-0">Tanggal Selesai</label>
                            <input type="date" id="tgl_sampai" class="form-control">
                        </div>
                    </div>
                    <div class="table-responsive pt-3">
                        <table id="tabel-task" class="table table-bordered table-striped w-100">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Tanggal Deadline</th>
                                    <th>Judul</th>
                                    <th>Deskripsi</th>
                                    <th>Prioritas</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


{{-- Data Server Side --}}
<script>
    $(function () {

        $('#modalEdit').on('show.bs.modal', function (event) {
            let button = $(event.relatedTarget);

            let id = button.data('id');

            $('#edit_id').val(id);
            $('#edit_judul').val(button.data('judul'));
            $('#edit_deskripsi').val(button.data('deskripsi'));
            $('#edit_prioritas').val(button.data('prioritas'));
            $('#edit_status').val(button.data('status'));

            let url = `/task/update/${id}`;
            $('#formEdit').attr('action', url);
        });

        // Template route dengan placeholder
        let deleteUrlTemplate = "{{ route('task.delete', ':id') }}";

        let table = $('#tabel-task').DataTable({
            processing: true,
            serverSide: true,
            ajax: {
                url: "{{ route('task.data') }}",
                data: function (d) {
                    d.tgl_mulai = $('#tgl_mulai').val();
                    d.tgl_sampai = $('#tgl_sampai').val();
                }
            },

            columns: [
                // Kolom No
                {
                    data: null,
                    orderable: false,
                    searchable: false,
                    className: 'text-center',
                    render: function (data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },

                {
                    data: 'tgl_deadline'
                },
                {
                    data: 'judul'
                },

                // Deskripsi dipotong biar rapi
                {
                    data: 'deskripsi',
                    render: function (data) {
                        return data.length > 50 ? data.substr(0, 50) + '...' : data;
                    }
                },

                // ✅ PRIORITAS BADGE
                {
                    data: 'prioritas',
                    className: 'text-center',
                    render: function (data) {
                        if (data === 'high') return '<span class="badge bg-danger">High</span>';
                        if (data === 'medium')
                            return '<span class="badge bg-warning text-dark">Medium</span>';
                        if (data === 'low') return '<span class="badge bg-success">Low</span>';
                        return data;
                    }
                },

                // ✅ STATUS BADGE
                {
                    data: 'status',
                    className: 'text-center',
                    render: function (data) {
                        if (data === 'done')
                            return '<span class="badge bg-success">Selesai</span>';
                        if (data === 'in_progress')
                            return '<span class="badge bg-primary">Proses</span>';
                        if (data === 'pending')
                            return '<span class="badge bg-secondary">Pending</span>';
                        return data;
                    }
                },

                // Kolom Action
                {
                    data: 'id',
                    orderable: false,
                    searchable: false,
                    className: 'text-center',
                    render: function (data, type, row) {

                        let deleteUrl = deleteUrlTemplate.replace(':id', data);

                        let toggleBtn = '';

                        if (row.status === 'done') {
                            toggleBtn = `
                            <button class="btn btn-sm btn-success btn-toggle-status" 
                                data-id="${data}" 
                                data-status="${row.status}">
                                <i class="fa fa-check"></i>
                            </button>`;
                        } else {
                            toggleBtn = `
                            <button class="btn btn-sm btn-secondary btn-toggle-status" 
                                data-id="${data}" 
                                data-status="${row.status}">
                                <i class="fa fa-spinner"></i>
                            </button>`;
                        }

                        return `
                        ${toggleBtn}

                        `;
                    }
                }
            ]
        });

        // Auto reload saat tanggal berubah
        $('#tgl_mulai, #tgl_sampai').on('change', function () {
            table.draw();
        });

        $('#tabel-task').on('click', '.btn-toggle-status', function () {

            let id = $(this).data('id');
            let status = $(this).data('status');

            // toggle hanya 2 state
            let newStatus = (status === 'done') ? 'pending' : 'done';

            if (confirm('Ubah status task?')) {

                $.ajax({
                    url: `/task/update-status/${id}`,
                    type: 'POST',
                    data: {
                        _token: '{{ csrf_token() }}',
                        status: newStatus
                    },

                    success: function (response) {
                        alert(response.message || 'Status berhasil diubah');
                        $('#tabel-task').DataTable().ajax.reload(null, false);
                    },

                    error: function (xhr) {
                        let message = 'Terjadi kesalahan';

                        if (xhr.responseJSON) {
                            if (xhr.responseJSON.message) {
                                message = xhr.responseJSON.message;
                            }

                            if (xhr.responseJSON.errors) {
                                message = Object.values(xhr.responseJSON.errors)
                                    .map(e => e.join(', '))
                                    .join('\n');
                            }
                        }

                        alert(message);
                    }
                });

            }
        });

    });

</script>

<!-- Modal Tambah -->
<div class="modal fade" id="modalTambah" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <form action="{{ route('task.insert') }}" method="post">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Form Tambah Task</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    @csrf
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="">Judul</label>
                                <input type="text" name="judul" class="form-control" required>
                            </div>
                            <div class="form-group">
                                <label for="">Deskripsi</label>
                                <textarea name="deskripsi" id="" cols="30" rows="5" class="form-control"></textarea>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="">Prioritas</label>
                                <select name="prioritas" id="" class="form-control" required>
                                    <option value="">Pilih Prioritas Task</option>
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="hight">High</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="">Tanggal Mulai</label>
                                <input type="date" name="tgl_mulai" class="form-control" required>
                            </div>
                            <div class="form-group">
                                <label for="">Tanggal Deadline</label>
                                <input type="date" name="tgl_deadline" class="form-control" required>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-dismiss="modal">Tutup</button>
                    <button type="submit" class="btn btn-success">Simpan</button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- Modal Ubah -->
<div class="modal fade" id="modalEdit" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">

            <form id="formEdit" method="post">
                @csrf

                <div class="modal-header">
                    <h5 class="modal-title">Form Ubah Task</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span>&times;</span>
                    </button>
                </div>

                <div class="modal-body">

                    <!-- ID -->
                    <input type="hidden" name="id" id="edit_id">

                    <div class="row">
                        <div class="col-md-6">

                            <div class="form-group">
                                <label>Judul</label>
                                <input type="text" name="judul" id="edit_judul" class="form-control" required>
                            </div>

                            <div class="form-group">
                                <label>Deskripsi</label>
                                <textarea name="deskripsi" id="edit_deskripsi" class="form-control"></textarea>
                            </div>

                        </div>

                        <div class="col-md-6">

                            <div class="form-group">
                                <label>Prioritas</label>
                                <select name="prioritas" id="edit_prioritas" class="form-control" required>
                                    <option value="">Pilih Prioritas Task</option>
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option> <!-- FIX typo -->
                                </select>
                            </div>

                            <div class="form-group">
                                <label>Tanggal Mulai</label>
                                <input type="date" name="tgl_mulai" id="edit_tgl_mulai" class="form-control" required>
                            </div>

                            <div class="form-group">
                                <label>Tanggal Deadline</label>
                                <input type="date" name="tgl_deadline" id="edit_tgl_deadline" class="form-control"
                                    required>
                            </div>

                            <div class="form-group">
                                <label>Status</label>
                                <select name="status" id="edit_status" class="form-control">
                                    <option value="pending">Pending</option>
                                    <option value="in_progress">Proses</option>
                                    <option value="done">Selesai</option>
                                </select>
                            </div>

                        </div>
                    </div>

                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Tutup</button>
                    <button type="submit" class="btn btn-success">Update</button>
                </div>

            </form>

        </div>
    </div>
</div>

@endsection
