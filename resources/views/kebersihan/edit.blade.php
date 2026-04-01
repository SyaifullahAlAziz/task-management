@extends('layout.index')
@section('title')
Form Ubah Kebersihan Tangan
@endsection
@section('content')
<div class="content-wrapper">
    <div class="row">
        <div class="col-md-12 grid-margin stretch-card">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-10">
                            <h4 class="card-title">Form Ubah Kebersihan Tangan</h4>
                        </div>
                        <div class="col-md-2">
                            <a href="{{ route('kebersihan.index') }}" class="btn btn-dark"><i class="fa fa-backward"></i> Kembali</a>
                        </div>
                    </div>

                    <form class="forms-sample" action="{{ route('kebersihan.update', $kebersihan->id) }}" method="post"
                        enctype="multipart/form-data">
                        @csrf
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="exampleInputUsername1">Lokasi</label> <br>
                                    <select name="lokasi_id" id="" class="js-example-basic-single w-100" required>
                                        <option value="">Pilih Lokasi</option>
                                        @foreach ($lokasi as $lok)
                                        <option value="{{ $lok->id }}" {{ $lok->id == $kebersihan->lokasi_id ? 'selected' : '' }}>
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
                                        <option value="{{ $audit->id }}" {{ $audit->id == $kebersihan->auditor_id ? 'selected' : '' }}>
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
                                        <option value="{{ $p->id }}" {{ $p->id == $kebersihan->petugas_id ? 'selected' : '' }}>
                                            {{ $p->nm_petugas }}
                                        </option>
                                        @endforeach
                                    </select>
                                </div>

                                <div class="form-group">
                                    <label for="exampleInputUsername1">Nama Petugas Kerbersihan</label>
                                    <input type="text" name="nm_petugas" class="form-control"
                                        placeholder="Nama Petugas Kebersihan" value="{{ $kebersihan->nm_petugas }}" required>
                                </div>

                                <div class="form-group">
                                    <label for="exampleInputUsername1">Sebelum Kontak Pasien</label> <br>
                                    <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                        <label class="btn btn-outline-secondary active">
                                            <input type="radio" name="sebelum_kontak_pasien" value="0"
                                                autocomplete="off" {{ $kebersihan->sebelum_kontak_pasien == '0' ? 'checked' : '' }}>
                                            N/A
                                        </label>

                                        <label class="btn btn-outline-success">
                                            <input type="radio" name="sebelum_kontak_pasien" value="2"
                                                autocomplete="off" {{ $kebersihan->sebelum_kontak_pasien == '2' ? 'checked' : '' }}> <i class="fa fa-check-square"></i> Yes
                                        </label>

                                        <label class="btn btn-outline-danger">
                                            <input type="radio" name="sebelum_kontak_pasien" value="1"
                                                autocomplete="off" {{ $kebersihan->sebelum_kontak_pasien == '1' ? 'checked' : '' }}><i class="fa fa-times"></i> No
                                        </label>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="">Tindakan Aseptic</label> <br>
                                    <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                        <label class="btn btn-outline-secondary active">
                                            <input type="radio" name="tindakan_aseptic" value="0" autocomplete="off" {{ $kebersihan->tindakan_aseptic == '0' ? 'checked' : '' }}>
                                            N/A
                                        </label>

                                        <label class="btn btn-outline-success">
                                            <input type="radio" name="tindakan_aseptic" value="2" autocomplete="off" {{ $kebersihan->tindakan_aseptic == '2' ? 'checked' : '' }}> <i
                                                class="fa fa-check-square"></i> Yes
                                        </label>

                                        <label class="btn btn-outline-danger">
                                            <input type="radio" name="tindakan_aseptic" value="1" autocomplete="off" {{ $kebersihan->tindakan_aseptic == '1' ? 'checked' : '' }}><i
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
                                            <input type="radio" name="cairan" value="0" autocomplete="off" {{ $kebersihan->cairan == '0' ? 'checked' : '' }}>
                                            N/A
                                        </label>

                                        <label class="btn btn-outline-success">
                                            <input type="radio" name="cairan" value="2" autocomplete="off" {{ $kebersihan->cairan == '2' ? 'checked' : '' }}> <i
                                                class="fa fa-check-square"></i> Yes
                                        </label>

                                        <label class="btn btn-outline-danger">
                                            <input type="radio" name="cairan" value="1" autocomplete="off" {{ $kebersihan->cairan == '1' ? 'checked' : '' }}><i
                                                class="fa fa-times"></i> No
                                        </label>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="">Setelah Kontak Pasien</label> <br>
                                    <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                        <label class="btn btn-outline-secondary active">
                                            <input type="radio" name="setelah_kontak_pasien" value="0"
                                                autocomplete="off" {{ $kebersihan->setelah_kontak_pasien == '0' ? 'checked' : '' }}>
                                            N/A
                                        </label>

                                        <label class="btn btn-outline-success">
                                            <input type="radio" name="setelah_kontak_pasien" value="2"
                                                autocomplete="off" {{ $kebersihan->setelah_kontak_pasien == '2' ? 'checked' : '' }}> <i class="fa fa-check-square"></i> Yes
                                        </label>

                                        <label class="btn btn-outline-danger">
                                            <input type="radio" name="setelah_kontak_pasien" value="1"
                                                autocomplete="off" {{ $kebersihan->setelah_kontak_pasien == '1' ? 'checked' : '' }}><i class="fa fa-times"></i> No
                                        </label>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="">Terpapar Lingkungan</label> <br>
                                    <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                        <label class="btn btn-outline-secondary active">
                                            <input type="radio" name="terpapar_lingkungan" value="0" autocomplete="off" {{ $kebersihan->terpapar_lingkungan == '0' ? 'checked' : '' }}>
                                            N/A
                                        </label>

                                        <label class="btn btn-outline-success">
                                            <input type="radio" name="terpapar_lingkungan" value="2" autocomplete="off" {{ $kebersihan->terpapar_lingkungan == '2' ? 'checked' : '' }}>
                                            <i class="fa fa-check-square"></i> Yes
                                        </label>

                                        <label class="btn btn-outline-danger">
                                            <input type="radio" name="terpapar_lingkungan" value="1"
                                                autocomplete="off" {{ $kebersihan->terpapar_lingkungan == '1' ? 'checked' : '' }}><i class="fa fa-times"></i> No
                                        </label>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="">Kepatuhan</label> <br>
                                    <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                        <label class="btn btn-outline-secondary active">
                                            <input type="radio" name="kepatuhan" value="0" autocomplete="off" {{ $kebersihan->kepatuhan == '0' ? 'checked' : '' }}>
                                            N/A
                                        </label>

                                        <label class="btn btn-outline-success">
                                            <input type="radio" name="kepatuhan" value="2" autocomplete="off" {{ $kebersihan->kepatuhan == '2' ? 'checked' : '' }}> <i
                                                class="fa fa-check-square"></i> Yes
                                        </label>

                                        <label class="btn btn-outline-danger">
                                            <input type="radio" name="kepatuhan" value="1" autocomplete="off" {{ $kebersihan->kepatuhan == '1' ? 'checked' : '' }}><i
                                                class="fa fa-times"></i> No
                                        </label>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="">Keterangan</label>
                                    <textarea name="keterangan" id="" cols="30" rows="3" class="form-control"
                                        required>{{ $kebersihan->keterangan }}</textarea>
                                </div>
                                <div class="form-group">
                                    <label for="">Rekomendasi</label>
                                    <textarea name="rekomendasi" id="" cols="30" rows="3" class="form-control"
                                        required>{{ $kebersihan->rekomendasi }}</textarea>
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
