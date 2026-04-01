$(document).ready(function () {
    const token = $("#antreanFast").data("token");
    const indexUrl = $("#antreanFast").data("index-url");
    const successMessage = $("#antreanFast").data("success-message");
    const errorMessage = $("#antreanFast").data("error-message");

    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
    });

    // Tampilkan Data
    let myTable = $("#myTable").DataTable({
        processing: true,
        serverSide: true,
        paging: true,
        pageLength: 10,
        lengthMenu: [
            [10, 25, 50, 100, 250],
            [10, 25, 50, 100, 250],
        ],
        language: {
            paginate: {
                previous: "Previous",
                next: "Next",
            },
        },
        ajax: {
            url: indexUrl,
            data: function (data) {
                data.page = Math.ceil(data.start / data.length) + 1;
                data.search = $("#myTable_filter input").val();
            },
        },
        columns: [
            {
                data: null, // Kolom untuk nomor urut
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1; // Menghitung nomor urut
                },
                orderable: false, // Tidak bisa diurutkan
            },
            {
                data: "nm_ruangan",
                name: "nm_ruangan",
                defaultContent: "-",
            },
            {
                data: "aksi",
                name: "aksi",
                orderable: false,
                searchable: false,
                defaultContent: "-",
            },
        ],

        order: [[1, "desc"]],
    });

    if (successMessage) {
        toastr.success(successMessage);
    }
    if (errorMessage) {
        toastr.error(errorMessage);
    }
});
