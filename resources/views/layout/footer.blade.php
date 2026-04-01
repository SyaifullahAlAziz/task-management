<!-- content-wrapper ends -->
<!-- partial:admin/partials/_footer.html -->
<footer class="footer">
    <div class="card">
        <div class="card-body">
            <div class="d-sm-flex justify-content-center justify-content-sm-between">
                <span class="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright © 2020 <a
                        href="https://www.bootstrapdash.com/" class="text-muted" target="_blank">Bootstrapdash</a>. All
                    rights reserved.</span>
                <span class="float-none float-sm-right d-block mt-1 mt-sm-0 text-center text-muted">Free <a
                        href="https://www.bootstrapdash.com/" class="text-muted" target="_blank">Bootstrap dashboard</a>
                    templates from Bootstrapdash.com</span>
            </div>
        </div>
    </div>
</footer>
<!-- partial -->
</div>
<!-- main-panel ends -->
</div>
<!-- page-body-wrapper ends -->
</div>

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
<!-- plugin js for this page -->
<script src="{{ asset('admin/vendors/typeahead.js/typeahead.bundle.min.js') }}"></script>
<script src="{{ asset('admin/vendors/select2/select2.min.js') }}"></script>
<!-- End plugin js for this page -->
<!-- Custom js for this page-->
<script src="{{ asset('admin/js/file-upload.js') }}"></script>
<script src="{{ asset('admin/js/typeahead.js') }}"></script>
<script src="{{ asset('admin/js/select2.js') }}"></script>
<!-- End custom js for this page-->

{{-- Datatables --}}
<script src="//cdn.datatables.net/2.3.5/js/dataTables.min.js"></script>
{{-- <script>
    let table = new DataTable('#myTable');

</script> --}}
</body>

</html>
