@extends('layout.index')
@section('title')
Form Ubah Departemen
@endsection
@section('content')
<div class="content-wrapper">
    <div class="row">
        <div class="col-md-12 grid-margin stretch-card">
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">Form Ubah Departemen</h4>

                    <form class="forms-sample" action="{{ route('departemen.update', $departemen->id) }}" method="post"
                        enctype="multipart/form-data">
                        @csrf
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="">Nama Departemen</label>
                                    <input type="text" name="nm_departemen" class="form-control" value="{{ $departemen->nm_departemen }}" required>
                                </div>
                                <div class="form-group">
                                    <label for="">Keterangan</label>
                                    <textarea name="keterangan" id="" cols="30" rows="3"
                                        class="form-control">{{ $departemen->keterangan }}</textarea>
                                </div>
                                <div class="form-group">
                                    <label for="">Komentar</label>
                                    <textarea name="komentar" id="" cols="30" rows="3" class="form-control">{{ $departemen->komentar }}</textarea>
                                </div>
                            </div>
                        </div>

                        <button type="submit" class="btn btn-success mr-2"><i class="fa fa-floppy-o"></i> Simpan</button>
                        <a href="{{ route('departemen.index') }}" class="btn btn-primary"><i
                                    class="fa fa-backward"></i> Kembali</a>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
