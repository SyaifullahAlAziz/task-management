<!DOCTYPE html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Halaman Login</title>
    <!-- base:css -->
    <link rel="stylesheet" href="{{ asset('admin/vendors/typicons/typicons.css') }}">
    <link rel="stylesheet" href="{{ asset('admin/vendors/css/vendor.bundle.base.css') }}">
    <!-- endinject -->
    <!-- plugin css for this page -->
    <!-- End plugin css for this page -->
    <!-- inject:css -->
    <link rel="stylesheet" href="{{ asset('admin/css/vertical-layout-light/style.css') }}">
    <!-- endinject -->
    <link rel="shortcut icon" href="{{ asset('images/logo.jpg') }}" />

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    {{-- Sweet Alert2 --}}
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

</head>

<body>
    <div class="container-scroller">
        <div class="container-fluid page-body-wrapper full-page-wrapper">
            <div class="content-wrapper d-flex align-items-center auth px-0">
                <div class="row w-100 mx-0">
                    <div class="col-lg-4 mx-auto">
                        <div class="auth-form-light text-left py-5 px-4 px-sm-5">
                            <div class="brand-logo">
                                <img src="{{ asset('images/logo.jpg') }}" alt="logo">
                            </div>
                            <h4>Hello! let's get started</h4>
                            <h6 class="font-weight-light">Sign in to continue.</h6>
                            <form class="pt-3" action="{{ route('proses_login') }}" method="post">
                                @csrf
                                <div class="form-group">
                                    <input type="text" name="email" class="form-control form-control-lg"
                                        id="exampleInputEmail1" placeholder="Email" required>
                                </div>
                                <div class="form-group" style="position: relative;">
                                    <input type="password" name="password" class="form-control form-control-lg"
                                        id="password" placeholder="Password" required>

                                    <!-- Tombol show/hide -->
                                    <span toggle="#password" class="fa fa-fw fa-eye field-icon toggle-password"
                                        style="position: absolute; top: 50%; right: 15px; transform: translateY(-50%); cursor: pointer;"></span>
                                </div>

                                <div class="mt-3">
                                    <button type="submit"
                                        class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">SIGN
                                        IN</button>
                                </div>
                                {{-- <div class="my-2 d-flex justify-content-between align-items-center">
                  <div class="form-check">
                    <label class="form-check-label text-muted">
                      <input type="checkbox" class="form-check-input">
                      Keep me signed in
                    </label>
                  </div>
                  <a href="#" class="auth-link text-black">Forgot password?</a>
                </div>
                <div class="mb-2">
                  <button type="button" class="btn btn-block btn-facebook auth-form-btn">
                    <i class="typcn typcn-social-facebook mr-2"></i>Connect using facebook
                  </button>
                </div> --}}
                                <div class="text-center mt-4 font-weight-light">
                                    Don't have an account? <a href="#" class="text-primary">Create</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <!-- content-wrapper ends -->
        </div>
        <!-- page-body-wrapper ends -->
    </div>

    <script>
        document.addEventListener("DOMContentLoaded", function () {
            const togglePassword = document.querySelector(".toggle-password");
            const password = document.querySelector("#password");

            togglePassword.addEventListener("click", function () {
                // Toggle type input
                const type = password.getAttribute("type") === "password" ? "text" : "password";
                password.setAttribute("type", type);

                // Toggle ikon
                this.classList.toggle("fa-eye");
                this.classList.toggle("fa-eye-slash");
            });
        });

    </script>

    {{-- Alert --}}
    @if(session('success'))
    <script>
        Swal.fire({
            position: "center",
            icon: "success",
            title: "{{ session('success') }}",
            showConfirmButton: false,
            timer: 1500
        });

    </script>
    @endif
    @if(session('error'))
    <script>
        Swal.fire({
            position: "center",
            icon: "error",
            title: "{{ session('error') }}",
            showConfirmButton: false,
            timer: 1500
        });

    </script>
    @endif


    <!-- container-scroller -->
    <!-- base:js -->
    <script src="{{ asset('admin/vendors/js/vendor.bundle.base.js') }}"></script>
    <!-- endinject -->
    <!-- inject:js -->
    <script src="{{ asset('admin/js/off-canvas.js') }}"></script>
    <script src="{{ asset('admin/js/hoverable-collapse.js') }}"></script>
    <script src="{{ asset('admin/js/template.js') }}"></script>
    <script src="{{ asset('admin/js/settings.js') }}"></script>
    <script src="{{ asset('admin/js/todolist.js') }}"></script>
    <!-- endinject -->
</body>

</html>
