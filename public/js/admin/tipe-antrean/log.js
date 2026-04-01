$(document).ready(function () {
    const indexUrl = $("#logTipeAntrean").data("index-url");
    const successMessage = $("#logTipeAntrean").data("success-message");
    const errorMessage = $("#logTipeAntrean").data("error-message");
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
                data: null,
                orderable: false,
                searchable: false,
                render: function (data, type, row, meta) {
                    // nomor urut dimulai dari 1 di setiap halaman
                    return meta.row + meta.settings._iDisplayStart + 1;
                },
            },
            {
                data: "nama_tipe",
                name: "nama_tipe",
            },
            {
                data: "aktivitas",
                name: "aktivitas",
                defaultContent: "-",
            },
            {
                data: "user",
                name: "user",
                defaultContent: "-",
            },
            {
                data: "tanggal",
                name: "tanggal",
                defaultContent: "-",
            },
            {
                data: "waktu_dibuat",
                name: "waktu_dibuat",
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
