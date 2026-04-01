$(document).ready(function () {
    const indexUrl = $("#logKuotaRS").data("index-url");
    const successMessage = $("#logKuotaRS").data("success-message");
    const errorMessage = $("#logKuotaRS").data("error-message");
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
                data: null,
                render: function (data, type, row, meta) {
                    return "RSKM Regina Eye Center";
                },
            },
            {
                data: "tahun",
                name: "tahun",
            },
            {
                data: "bulan",
                name: "bulan",
                render: function (data, type, row) {
                    if(data == '1'){
                        return "(1) Januari";
                    }else if(data == '2') {
                        return "(2) Februari";
                    }else if(data == '3') {
                        return "(3) Maret";
                    }else if(data == '4') {
                        return "(4) April";
                    }else if(data == '5') {
                        return "(5) Mei";
                    }else if(data == '6') {
                        return "(6) Juni";
                    }else if(data == '7') {
                        return "(7) Juli";
                    }else if(data == '8') {
                        return "(8) Agustus";
                    }else if(data == '9') {
                        return "(9) September";
                    }else if(data == '10') {
                        return "(10) Oktober";
                    }else if(data == '11') {
                        return "(11) November";
                    }else if(data == '12') {
                        return "(12) Desember";
                    }else{
                        return "Tidak Ditemukan";
                    }

                },
            },
            {
                data: "total_kuota",
                name: "total_kuota",
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
