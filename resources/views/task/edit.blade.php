@extends('layout.index')
@section('title')
Form Ubah Level
@endsection
@section('content')
<div class="content-wrapper">
    <div class="row">
        <div class="col-md-12 grid-margin stretch-card">
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">Form Ubah Level</h4>

                    <form class="forms-sample" action="{{ route('level.update', $level->id) }}" method="post"
                        enctype="multipart/form-data">
                        @csrf
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="">Id Level</label>
                                    <input type="number" name="id_level" class="form-control"
                                        value="{{ $level->id_level }}" required>
                                </div>
                                <div class="form-group">
                                    <label for="">Nama Level</label>
                                    <input type="text" name="namalevel" class="form-control"
                                        value="{{ $level->namalevel }}" required>
                                </div>
                            </div>
                        </div>

                        <button type="submit" class="btn btn-success mr-2"><i class="fa fa-floppy-o"></i> Simpan</button>
                        <a href="{{ route('level.index') }}" class="btn btn-primary"><i class="fa fa-backward"></i>
                            Kembali</a>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
