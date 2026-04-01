@extends('layout.index')
@section('title')
Form Tambah Kebersihan Tangan
@endsection
@section('content')
<div class="content-wrapper">
    <div class="row">
        <div class="col-md-12 grid-margin stretch-card">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-10">
                            <h4 class="card-title">Form Tambah Kebersihan Tangan</h4>
                        </div>
                        <div class="col-md-2">
                            <a href="{{ route('kebersihan.index') }}" class="btn btn-dark"><i class="fa fa-backward"></i> Kembali</a>
                        </div>
                    </div>

                    <form class="forms-sample" action="{{ route('kebersihan.insert') }}" method="post"
                        enctype="multipart/form-data">
                        @csrf
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="exampleInputUsername1">Lokasi</label> <br>
                                    <select name="lokasi_id" id="" class="js-example-basic-single w-100" required>
                                        <option value="">Pilih Lokasi</option>
                                        @foreach ($lokasi as $lok)
                                        <option value="{{ $lok->id }}">
                                            {{ $lok->nm_lokasi }}
                                        </option>
                                        @endforeach
                                    </select>
                                </div>

                                <div class="form-group">
                                    <label for="exampleInputUsername1">Auditor</label> <br>
                                    <select name="auditor_id" id="" class="js-example-basic-single w-100" required>
                                        <option value="">Pilih Auditor</option>
                                        @foreach ($auditor as $audit)
                                        <option value="{{ $audit->id }}">
                                            {{ $audit->nm_auditor }}
                                        </option>
                                        @endforeach
                                    </select>
                                </div>

                                <div class="form-group">
                                    <label for="exampleInputUsername1">Petugas</label> <br>
                                    <select name="petugas_id" id="" class="js-example-basic-single w-100" required>
                                        <option value="">Pilih Petugas</option>
                                        @foreach ($petugas as $p)
                                        <option value="{{ $p->id }}">
                                            {{ $p->nm_petugas }}
                                        </option>
                                        @endforeach
                                    </select>
                                </div>

                                <div class="form-group">
                                    <label for="exampleInputUsername1">Nama Petugas Kerbersihan</label>
                                    <input type="text" name="nm_petugas" class="form-control"
                                        placeholder="Nama Petugas Kebersihan" required>
                                </div>

                                <div class="form-group">
                                    <label for="exampleInputUsername1">Sebelum Kontak Pasien</label> <br>
                                    <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                        <label class="btn btn-outline-secondary active">
                                            <input type="radio" name="sebelum_kontak_pasien" value="0"
                                                autocomplete="off" checked>
                                            N/A
                                        </label>

                                        <label class="btn btn-outline-success">
                                            <input type="radio" name="sebelum_kontak_pasien" value="2"
                                                autocomplete="off"> <i class="fa fa-check-square"></i> Yes
                                        </label>

                                        <label class="btn btn-outline-danger">
                                            <input type="radio" name="sebelum_kontak_pasien" value="1"
                                                autocomplete="off"><i class="fa fa-times"></i> No
                                        </label>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="">Tindakan Aseptic</label> <br>
                                    <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                        <label class="btn btn-outline-secondary active">
                                            <input type="radio" name="tindakan_aseptic" value="0" autocomplete="off"
                                                checked>
                                            N/A
                                        </label>

                                        <label class="btn btn-outline-success">
                                            <input type="radio" name="tindakan_aseptic" value="2" autocomplete="off"> <i
                                                class="fa fa-check-square"></i> Yes
                                        </label>

                                        <label class="btn btn-outline-danger">
                                            <input type="radio" name="tindakan_aseptic" value="1" autocomplete="off"><i
                                                class="fa fa-times"></i> No
                                        </label>
                                    </div>
                                </div>

                            </div>
                            <div class="col-md-6">

                                <div class="form-group">
                                    <label for="">Cairan</label> <br>
                                    <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                        <label class="btn btn-outline-secondary active">
                                            <input type="radio" name="cairan" value="0" autocomplete="off" checked>
                                            N/A
                                        </label>

                                        <label class="btn btn-outline-success">
                                            <input type="radio" name="cairan" value="2" autocomplete="off"> <i
                                                class="fa fa-check-square"></i> Yes
                                        </label>

                                        <label class="btn btn-outline-danger">
                                            <input type="radio" name="cairan" value="1" autocomplete="off"><i
                                                class="fa fa-times"></i> No
                                        </label>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="">Setelah Kontak Pasien</label> <br>
                                    <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                        <label class="btn btn-outline-secondary active">
                                            <input type="radio" name="setelah_kontak_pasien" value="0"
                                                autocomplete="off" checked>
                                            N/A
                                        </label>

                                        <label class="btn btn-outline-success">
                                            <input type="radio" name="setelah_kontak_pasien" value="2"
                                                autocomplete="off"> <i class="fa fa-check-square"></i> Yes
                                        </label>

                                        <label class="btn btn-outline-danger">
                                            <input type="radio" name="setelah_kontak_pasien" value="1"
                                                autocomplete="off"><i class="fa fa-times"></i> No
                                        </label>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="">Terpapar Lingkungan</label> <br>
                                    <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                        <label class="btn btn-outline-secondary active">
                                            <input type="radio" name="terpapar_lingkungan" value="0" autocomplete="off"
                                                checked>
                                            N/A
                                        </label>

                                        <label class="btn btn-outline-success">
                                            <input type="radio" name="terpapar_lingkungan" value="2" autocomplete="off">
                                            <i class="fa fa-check-square"></i> Yes
                                        </label>

                                        <label class="btn btn-outline-danger">
                                            <input type="radio" name="terpapar_lingkungan" value="1"
                                                autocomplete="off"><i class="fa fa-times"></i> No
                                        </label>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="">Kepatuhan</label> <br>
                                    <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                        <label class="btn btn-outline-secondary active">
                                            <input type="radio" name="kepatuhan" value="0" autocomplete="off" checked>
                                            N/A
                                        </label>

                                        <label class="btn btn-outline-success">
                                            <input type="radio" name="kepatuhan" value="2" autocomplete="off"> <i
                                                class="fa fa-check-square"></i> Yes
                                        </label>

                                        <label class="btn btn-outline-danger">
                                            <input type="radio" name="kepatuhan" value="1" autocomplete="off"><i
                                                class="fa fa-times"></i> No
                                        </label>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="">Keterangan</label>
                                    <textarea name="keterangan" id="" cols="30" rows="3" class="form-control"
                                        required></textarea>
                                </div>
                                <div class="form-group">
                                    <label for="">Rekomendasi</label>
                                    <textarea name="rekomendasi" id="" cols="30" rows="3" class="form-control"
                                        required></textarea>
                                </div>
                            </div>
                        </div>

                        <button type="submit" class="btn btn-primary mr-2">Submit</button>
                        <button class="btn btn-light">Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
