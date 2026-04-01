@extends('layout.index')
@section('title')
Form Ubah Pasien
@endsection
@section('content')
<div class="content-wrapper">
    <div class="row">
        <div class="col-md-12 grid-margin stretch-card">
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">Form Ubah Pasien</h4>

                    <form class="forms-sample" action="{{ route('pasien.update', $pasien->id) }}" method="post"
                        enctype="multipart/form-data">
                        @csrf
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="">No.Rekam Medis</label>
                                    <input type="number" name="no_rkm_medis" class="form-control" value="{{ $pasien->no_rkm_medis }}" required>
                                </div>
                                <div class="form-group">
                                    <label for="">Nama Pasien</label>
                                    <input type="text" name="nm_pasien" class="form-control" value="{{ $pasien->nm_pasien }}" required>
                                </div>
                                <div class="form-group">
                                    <label for="">Tempat Lahir</label>
                                    <input type="text" name="tmp_lahir" class="form-control" value="{{ $pasien->tmp_lahir }}" required>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="">Tanggal Lahir</label>
                                    <input type="date" name="tgl_lahir" class="form-control" value="{{ $pasien->tgl_lahir }}" required>
                                </div>
                                <div class="form-group">
                                    <label for="">Jenis Kelamin</label> <br>
                                    <input type="radio" name="jk" value="L" {{ $pasien->jk == 'L' ? 'checked' : '' }}> <span
                                        style="font-size:15px;">Laki-Laki</span>
                                    <input type="radio" name="jk" value="P" {{ $pasien->jk == 'P' ? 'checked' : '' }}> <span
                                        style="font-size:15px;">Perempuan</span>
                                </div>
                                <div class="form-group">
                                    <label for="">Keterangan</label>
                                    <textarea name="keterangan" id="" cols="30" rows="3" class="form-control">{{ $pasien->keterangan }}</textarea>
                                </div>
                            </div>
                        </div>

                        <button type="submit" class="btn btn-success mr-2"><i class="fa fa-floppy-o"></i> Simpan</button>
                        <a href="{{ route('pasien.index') }}" class="btn btn-primary"><i
                                    class="fa fa-backward"></i> Kembali</a>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
