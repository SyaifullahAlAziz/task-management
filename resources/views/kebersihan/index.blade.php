@extends('layout.index')
@section('title')
Data Kebersihan Tangan
@endsection
@section('content')

<div class="content-wrapper">
    <div class="row">
        <div class="col-lg-12 grid-margin stretch-card">
            <div class="card">
                <div class="card-header">
                    <div class="row">
                        <div class="col-md-8">
                            <h5>Data Kebersihan Tangan</h5>
                        </div>
                        <div class="col-md-2">
                            <a class="btn btn-success" href="{{ route('kebersihan.excel') }}"><i
                                    class="fa fa-file-excel-o"></i> Export Excel</a>
                        </div>
                        <div class="col-md-2">
                            <a class="btn btn-danger" href="{{ route('kebersihan.pdf') }}"><i
                                    class="fa fa-file-pdf-o"></i> Export PDF</a>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-2">
                            <h4 class="card-title"><a href="{{ route('kebersihan.add') }}" class="btn btn-primary"><i
                                        class="fa fa-plus"></i> Tambah Data</a>
                            </h4>
                        </div>
                        <div class="col-md-2">
                            <input type="date" id="tgl_mulai" class="form-control">
                        </div>
                        <div class="col-md-2">
                            <input type="date" id="tgl_sampai" class="form-control">
                        </div>
                    </div>
                    <div class="table-responsive pt-3 w-100">
                        <table id="tabel-kebersihan" class="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Tanggal Audit</th>
                                    <th>Periode</th>
                                    <th>Ruangan</th>
                                    <th>Auditor</th>
                                    <th>Petugas</th>
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
    var table = $('#tabel-kebersihan').DataTable({
        processing: true,
        serverSide: true,
        ajax: {
            url: "{{ route('kebersihan.data') }}",
            data: function (d) {
                d.tgl_mulai  = $('#tgl_mulai').val();
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
            { data: 'tgl_audit' },
            { data: 'periode' },
            { data: 'nm_lokasi' },
            { data: 'nm_auditor' },
            { data: 'nama_petugas' },
        ]
    });

    // Auto reload saat tanggal berubah TANPA tombol
    $('#tgl_mulai, #tgl_sampai').on('change', function () {
        table.draw();
    });

    // EVENT CLICK EXPAND ROW
    $('#tabel-kebersihan tbody').on('click', 'td.dt-control', function () {
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
            <a  href="${d.edit_url}" class="btn btn-success btn-sm"> <i class="fa fa-edit"> Ubah Data Kebersihan</i> </a>
            <a onclick="return confirm('Yakin Ingin Hapus Data?')" href="${d.delete_url}" class="btn btn-danger btn-sm"> <i class="fa fa-edit"> Hapus Data Kebersihan</i> </a>
        </div>
        `;
    }
</script>

@endsection
