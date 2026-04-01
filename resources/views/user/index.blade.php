@extends('layout.index')
@section('title')
    Data User
@endsection
@section('content')

<style>
    #tabel-user th,
    #tabel-user td {
        text-align: left !important;
    }
</style>

        <div class="content-wrapper">
          <div class="row align-items-center">
              <div class="col-lg-8">
                  <h3>Data User</h3>
                  <nav aria-label="breadcrumb">
                      <ol class="breadcrumb" style="margin-left: -15px">
                          <li class="breadcrumb-item"><a href="{{ route('home') }}" class="text-primary">Home</a></li>
                          <li class="breadcrumb-item"><a href="#" class="text-primary">User</a>
                          </li>
                          <li class="breadcrumb-item active" aria-current="page">Data User</li>
                      </ol>
                  </nav>
              </div>
              <div class="col-md-2">
                  <button id="btnExportExcel" class="btn btn-success"><i class="fa fa-file-excel-o"></i> Export Excel</button>
              </div>
              <div class="col-md-2">
                  <button id="btnExportPdf" class="btn btn-danger" href="{{ route('user.pdf') }}"><i class="fa fa-file-pdf-o"></i> Export PDF</button>
              </div>    
          </div>          
          <div class="row">
            <div class="col-lg-12 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-auto d-flex align-items-center">
                      <h4 class="card-title me-2 mb-0"><a href="{{ route('user.add') }}" class="btn btn-primary"><i class="fa fa-plus"></i> Tambah Data</a></h4>
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
                    <table id="tabel-user" class="table table-bordered table-striped w-100">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>No</th>
                                <th>Tanggal</th>
                                <th>Nama Level</th>
                                <th>Nama Lengkap</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Password</th>
                                <th>Foto Profil</th>
                            </tr>
                        </thead>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

{{-- Datatables Server Side --}}
<script>
  let table = $('#tabel-user').DataTable({
      processing: true,
      serverSide: true,
      ajax: {
          url: "{{ route('user.data') }}",
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
          { data: 'namalevel' },
          { data: 'name' },
          { data: 'username' },
          { data: 'email' },
          { data: 'password' },
          { data: 'foto_profile', orderable: false, searchable: false },
      ]
  });

  // EVENT CLICK EXPAND ROW
  $('#tabel-user tbody').on('click', 'td.dt-control', function () {
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
        <a href="${d.edit_url}" class="btn btn-primary btn-sm"> <i class="fa fa-edit"> Edit Data User</i> </a>
        <a onclick="return confirm('Yakin Ingin Hapus Data?')" href="${d.delete_url}" class="btn btn-danger btn-sm"> <i class="fa fa-trash"> Hapus Data User</i> </a>
      </div>
      `;
  }

  // Auto reload saat tanggal berubah TANPA tombol
  $('#tgl_mulai, #tgl_sampai').on('change', function () {
      table.draw();
  });
</script>


{{-- Export PDF --}}
<script>
    $('#btnExportPdf').on('click', function () {
        let tglMulai  = $('#tgl_mulai').val();
        let tglSampai = $('#tgl_sampai').val();

        let url = "{{ route('user.pdf') }}"
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

        let url = "{{ route('user.excel') }}"
            + "?tgl_mulai=" + tglMulai
            + "&tgl_sampai=" + tglSampai;

        window.location.href = url;
    });
</script>

@endsection
     