@extends('layout.index')
@section('title')
Data Auditor
@endsection
@section('content')

<style>
    #tabel-auditor th,
    #tabel-auditor td {
        text-align: left !important;
    }
</style>

<div class="content-wrapper">
    <div class="row align-items-center">
        <div class="col-lg-8">
            <h3>Data Auditor</h3>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb" style="margin-left: -15px">
                    <li class="breadcrumb-item"><a href="/home" class="text-primary">Home</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Data Master</li>
                    <li class="breadcrumb-item active" aria-current="page">Auditor</li>
                </ol>
            </nav>
        </div>
        <div class="col-md-2">
            <button id="btnExportExcel" class="btn btn-success"><i class="fa fa-file-excel-o"></i> Export Excel</button>
        </div>
        <div class="col-md-2">
            <button id="btnExportPdf" class="btn btn-danger"><i class="fa fa-file-pdf-o"></i> Export PDF</button>
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
                                        <i class="fa fa-plus"> Tambah Data</i>
                                </button>
                            </h4>
                        </div>
                        <div class="col-md-auto d-flex align-items-center">
                            <label class="me-2 mb-0">Tanggal Mulai</label>
                            <input type="date" id="tgl_mulai" class="form-control">
                        </div>
                        <div class="col-md-auto d-flex align-items-center">
                            <label class="me-2 mb-0">Tanggal Sampai</label>
                            <input type="date" id="tgl_sampai" class="form-control">
                        </div>
                    </div>
                    <div class="table-responsive pt-3">
                        <table id="tabel-auditor" class="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>No</th>
                                    <th>Tanggal</th>
                                    <th>Nama Auditor</th>
                                    <th>Keterangan</th>
                                    <th>Komentar</th>
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

        let table = $('#tabel-auditor').DataTable({
            processing: true,
            serverSide: true,
            ajax: {
                url: "{{ route('auditor.data') }}",
                data: function (d) {
                    d.tgl_mulai = $('#tgl_mulai').val();
                    d.tgl_sampai = $('#tgl_sampai').val();
                }
            },
            columns: [
                            {
                className: 'dt-control',
                orderable: false,
                data: null,
                defaultContent: ''
            },
                { data: 'no', orderable: false, searchable: false },
                { data: 'created_at' },
                { data: 'nm_auditor' },
                { data: 'keterangan' },
                { data: 'komentar' },
            ]
        });

        // EVENT CLICK EXPAND ROW
        $('#tabel-auditor tbody').on('click', 'td.dt-control', function () {
            var tr = $(this).closest('tr');
            var row = table.row(tr);

            if (row.child.isShown()) {
                row.child.hide();
                tr.removeClass('shown');
            } else {
                row.child(format(row.data())).show();
                tr.addClass('shown');
            }
        });

        // TEMPLATE CHILD ROW
        function format(d) {
            return `
            <div class="container">
                <a  href="${d.edit_url}" class="btn btn-primary btn-sm"> <i class="fa fa-edit"> Ubah Data Auditor</i> </a>
                <a onclick="return confirm('Yakin Ingin Hapus Data?')" href="${d.delete_url}" class="btn btn-danger btn-sm"> <i class="fa fa-trash"> Hapus Data Auditor</i> </a>
            </div>
            `;
        }

        // Auto reload saat tanggal berubah TANPA tombol
        $('#tgl_mulai, #tgl_sampai').on('change', function () {
            table.draw();
        });

    });

</script>

{{-- Export PDF --}}
<script>
    $('#btnExportPdf').on('click', function () {
        let tglMulai  = $('#tgl_mulai').val();
        let tglSampai = $('#tgl_sampai').val();

        let url = "{{ route('auditor.pdf') }}"
            + "?tgl_mulai=" + tglMulai
            + "&tgl_sampai=" + tglSampai;

        window.open(url, '_blank');
    });
</script>

{{-- Export Excel --}}
<script>
    $('#btnExportExcel').click(function () {
        let tglMulai  = $('#tgl_mulai').val();
        let tglSampai = $('#tgl_sampai').val();

        let url = "{{ route('auditor.excel') }}"
            + "?tgl_mulai=" + tglMulai
            + "&tgl_sampai=" + tglSampai;

        window.location.href = url;
    });
</script>

<!-- Modal Tambah -->
<div class="modal fade" id="modalTambah" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <form action="{{ route('auditor.insert') }}" method="post">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Form Tambah Auditor</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    @csrf
                    <div class="form-group">
                        <label for="">Nama Auditor</label>
                        <input type="text" name="nm_auditor" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="">Keterangan</label>
                        <textarea name="keterangan" id="" cols="30" rows="3" class="form-control"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="">Komentar</label>
                        <textarea name="komentar" id="" cols="30" rows="3" class="form-control"></textarea>
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
@foreach ($auditor as $item)
<div class="modal fade" id="modalUbah{{ $item->id }}" tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <form action="{{ route('auditor.update', $item->id) }}" method="post">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Form Ubah Auditor</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    @csrf
                    <div class="form-group">
                        <label for="">Nama Auditor</label>
                        <input type="text" name="nm_auditor" class="form-control" value="{{ $item->nm_auditor }}"
                            required>
                    </div>
                    <div class="form-group">
                        <label for="">Keterangan</label>
                        <textarea name="keterangan" id="" cols="30" rows="3" class="form-control"
                            required>{{ $item->keterangan }}</textarea>
                    </div>
                    <div class="form-group">
                        <label for="">Komentar</label>
                        <textarea name="komentar" id="" cols="30" rows="3" class="form-control"
                            required>{{ $item->komentar }}</textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary">Save changes</button>
                </div>
            </form>
        </div>
    </div>
</div>
@endforeach

@endsection
