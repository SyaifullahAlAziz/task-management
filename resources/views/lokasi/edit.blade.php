@extends('layout.index')
@section('title')
Form Ubah Lokasi
@endsection
@section('content')
<div class="content-wrapper">
    <div class="row">
        <div class="col-md-12 grid-margin stretch-card">
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">Form Ubah Lokasi</h4>

                    <form class="forms-sample" action="{{ route('lokasi.update', $lokasi->id) }}" method="post"
                        enctype="multipart/form-data">
                        @csrf
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="">Nama Lokasi</label>
                                    <input type="text" name="nm_lokasi" class="form-control" value="{{ $lokasi->nm_lokasi }}" required>
                                </div>
                                <div class="form-group">
                                    <label for="">Keterangan</label>
                                    <textarea name="keterangan" id="" cols="30" rows="3"
                                        class="form-control">{{ $lokasi->keterangan }}</textarea>
                                </div>
                            </div>
                        </div>

                        <button type="submit" class="btn btn-success mr-2"><i class="fa fa-floppy-o"></i> Simpan</button>
                        <a href="{{ route('lokasi.index') }}" class="btn btn-primary"><i
                                    class="fa fa-backward"></i> Kembali</a>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
