$(document).ready(function () {
    const token = $("#antreanLoketForm").data("token");
    const indexUrl = $("#antreanLoketForm").data("index-url");
    const successMessage = $("#antreanLoketForm").data("success-message");
    const errorMessage = $("#antreanLoketForm").data("error-message");

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
                data: "nama_loket",
                name: "nama_loket",
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
