$(document).ready(function () {
    const getPembayaran = $("#templateLaboratoriumKhanza").data(
        "get-pembayaran"
    );
    const getLabor = $("#templateLaboratoriumKhanza").data("get-labor");
    const indexUrl = $("#templateLaboratoriumKhanza").data("index-url");
    const successMessage = $("#templateLaboratoriumKhanza").data("success-message");
    const errorMessage = $("#templateLaboratoriumKhanza").data("error-message");

    // Index
    // Pembayaran
    $("#selectedPembayaran").select2({
        theme: "bootstrap4",
        placeholder: "Pilih Jenis Pembayaran",
        ajax: {
            url: getPembayaran,
            dataType: "json",
            delay: 250,
            data: function (params) {
                return {
                    q: params.term, // Search term
                };
            },
            processResults: function (data) {
                return {
                    results: data.items.map(function (item) {
                        return {
                            id: item.kd_pj,
                            text: `${item.png_jawab}`,
                        };
                    }),
                };
            },
            cache: true,
        },
    });

    $("#selectedLabor").select2({
        theme: "bootstrap4",
        placeholder: "Pilih Jenis Laboratorium",
        ajax: {
            url: getLabor,
            dataType: "json",
            delay: 250,
            data: function (params) {
                return {
                    q: params.term, // Search term
                    kd_pj: $("#selectedPembayaran").val(),
                };
            },
            processResults: function (data) {
                return {
                    results: data.items.map(function (item) {
                        return {
                            id: item.kd_jenis_prw,
                            text: `${item.nm_perawatan}`,
                        };
                    }),
                };
            },
            cache: true,
        },
    });

    $(document).ready(function () {
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
                    previous: "Sebelumnya",
                    next: "Selanjutnya",
                },
            },
            ajax: {
                url: indexUrl,
                data: function (data) {
                    data.page = Math.ceil(data.start / data.length) + 1;
                    data.search = $("#myTable_filter input").val();
                    data.kd_jenis_prw = $("#selectedLabor").val();
                    data.kd_pj = $("#selectedPembayaran").val();
                },
            },
            columns: [
                {
                    data: null, // nomor urut
                    name: "nomor",
                    orderable: false,
                    searchable: false,
                    render: function (data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    },
                },
                {
                    data: "kd_jenis_prw",
                    name: "kd_jenis_prw",
                },
                {
                    data: "pemeriksaan",
                    name: "pemeriksaan",
                    defaultContent: "-",
                },
                {
                    data: "id_template",
                    name: "id_template",
                    defaultContent: "-",
                },
                {
                    data: "nm_perawatan",
                    name: "nm_perawatan",
                    defaultContent: "-",
                },
                {
                    data: "satuan",
                    name: "satuan",
                    defaultContent: "-",
                },
                {
                    data: "nilai_rujukan",
                    name: "nilai_rujukan",
                    defaultContent: "-",
                },
                {
                    data: "png_jawab",
                    name: "png_jawab",
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

        $("#selectedPembayaran").on("change", function () {
            myTable.ajax.reload();
        });

        $("#selectedLabor").on("change", function () {
            myTable.ajax.reload();
        });
    });

    if (successMessage) {
        toastr.success(successMessage);
    }
    if (errorMessage) {
        toastr.error(errorMessage);
    }
});
