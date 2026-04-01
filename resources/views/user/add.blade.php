@extends('layout.index')
@section('title')
Form Tambah User
@endsection
@section('content')
<div class="content-wrapper">
    <div class="row">
        <div class="col-md-12 grid-margin stretch-card">
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">Form Tambah User</h4>

                    <form class="forms-sample" action="{{ route('user.insert') }}" method="post"
                        enctype="multipart/form-data">
                        @csrf
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="exampleInputUsername1">Level</label> <br>
                                    <select name="level_id" id="" class="js-example-basic-single w-100" required>
                                        <option value="">Pilih Level</option>
                                        @foreach ($level as $lv)
                                            <option value="{{ $lv->id }}">
                                                {{ $lv->namalevel }}
                                            </option>
                                        @endforeach
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputUsername1">Nama Lengkap</label>
                                    <input type="text" name="name" class="form-control" id="exampleInputUsername1"
                                        placeholder="Username" required>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputUsername1">Username</label>
                                    <input type="text" name="username" class="form-control" id="exampleInputUsername1"
                                        placeholder="Username" required>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Email address</label>
                                    <input type="email" name="email" class="form-control" id="exampleInputEmail1"
                                        placeholder="Email" required>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputPassword1">Password</label>
                                    <input type="password" name="password" class="form-control"
                                        id="exampleInputPassword1" placeholder="Password" required>
                                </div>

                                <div class="form-group">
                                    <label for="exampleInputPassword1">Foto Profil</label>
                                    <input type="file" name="foto_profile" class="form-control"
                                        id="exampleInputPassword1" placeholder="Password">
                                </div>
                            </div>
                        </div>

                        <button type="submit" class="btn btn-success mr-2"><i class="fa fa-floppy-o"></i> Simpan</button>
                        <a href="{{ route('user.index') }}" class="btn btn-primary"><i class="fa fa-backward"></i> Kembali</a>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
