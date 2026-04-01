$(document).ready(function () {
    const token = $("#kuotaDokterForm").data("token");
    const indexUrl = $("#kuotaDokterForm").data("index-url");
    const successMessage = $("#kuotaDokterForm").data("success-message");
    const errorMessage = $("#kuotaDokterForm").data("error-message");

    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
    });

    $("#selectedTahun").select2({
        theme: "bootstrap4",
    });

    $("#selectedBulan").select2({
        theme: "bootstrap4",
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
                data.tahun = $("#selectedTahun").val();
                data.bulan = $("#selectedBulan").val();
                data.page = Math.ceil(data.start / data.length) + 1;
                data.search = $("#myTable_filter input").val();
            },
        },
        columns: [
            {
                data: null,
                render: function (data, type, row, meta) {
                    // nomor urut per halaman
                    return meta.row + 1 + meta.settings._iDisplayStart;
                },
                title: "No", // header kolom
                orderable: false,
            },
            {
                data: "nm_dokter",
                name: "nm_dokter",
            },
            {
                data: "tahun",
                name: "tahun",
                defaultContent: "-",
            },
            {
                data: "bulan",
                name: "bulan",
                defaultContent: "-",
            },
            {
                data: "total_kuota",
                name: "total_kuota",
                defaultContent: "-",
            },
            {
                data: "terpakai",
                name: "terpakai",
                defaultContent: "-",
            },
            {
                data: "sisa_kuota",
                name: "sisa_kuota",
                defaultContent: "-",
            },
            {
                data: "sisa_kuota",
                name: "sisa_kuota",
                defaultContent: "-",
                 render: function (data, type, row, meta) {
                    var status = data;
                    if(status > 5){
                        return "<span class='badge badge-success'>Kuota Tersedia</span>";
                    }else if(status <= 5){
                        return "<span class='badge badge-warning'>Kuota Hampir Habis</span>";
                    }else if(status == 0){
                        return "<span class='badge badge-danger'>Kuota Habis</span>";
                    }else{
                        return "<span class='badge badge-secondary'>Kuota Tidak Tersedia</span>";
                    }
                },
                orderable: false,
            },
        ],

        order: [[1, "desc"]],
    });

    $("#selectedTahun").on("change", function () {
        myTable.ajax.reload();
    });

    $("#selectedBulan").on("change", function () {
        myTable.ajax.reload();
    });

    if (successMessage) {
        toastr.success(successMessage);
    }
    if (errorMessage) {
        toastr.error(errorMessage);
    }
});
