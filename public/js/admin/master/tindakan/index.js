$(document).ready(function () {
    const getKategoriUrl = $("#tindakanForm").data("url-getkategori");
    const getUnitUrl = $("#tindakanForm").data("url-getunit");
    const getPembayaranUrl = $("#tindakanForm").data("url-getpembayaran");
    const indexUrl = $("#tindakanForm").data("index-url");
    const editUrl = $("#tindakanForm").data("edit-url");
    const destroyUrl = $("#tindakanForm").data("destroy-url");
    const token = $("#userForm").data("token");
    const successMessage = $("#userForm").data("success-message");
    const errorMessage = $("#userForm").data("error-message");
    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
    });

    $("#selectedKategori").select2({
        theme: "bootstrap4",
    });

    $("#selectedUnit").select2({
        theme: "bootstrap4",
    });

    $("#selectedPembayaran").select2({
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
                previous: "Sebelumnya",
                next: "Selanjutnya",
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
                className: "details-control",
                orderable: false,
                data: null,
                defaultContent: "",
            },
            {
                data: "kode_tindakan",
                name: "kode_tindakan",
            },
            {
                data: "nama_tindakan",
                name: "nama_tindakan",
                defaultContent: "-",
            },
            {
                data: "kategori_tindakan",
                name: "kategori_tindakan",
                defaultContent: "-",
            },
            {
                data: "unit.nama_unit",
                name: "unit.nama_unit",
                defaultContent: "-",
            },
            {
                data: "pembayaran.nama_pembayaran",
                name: "pembayaran.nama_pembayaran",
                defaultContent: "-",
            },
            {
                data: "jasa_rs",
                name: "jasa_rs",
                defaultContent: "-",
                render: function (data, type, row) {
                    return data ? formatRupiah(data) : "-";
                },
            },
            {
                data: "jasa_dokter",
                name: "jasa_dokter",
                defaultContent: "-",
                render: function (data, type, row) {
                    return data ? formatRupiah(data) : "-";
                },
            },
            {
                data: "total_biaya",
                name: "total_biaya",
                defaultContent: "-",
                render: function (data, type, row) {
                    return data ? formatRupiah(data) : "-";
                },
            },
        ],

        order: [[1, "desc"]],
    });

    $("#selectedKategori").on("change", function () {
        myTable.ajax.reload();
    });

    $("#selectedUnit").on("change", function () {
        myTable.ajax.reload();
    });

    $("#selectedPembayaran").on("change", function () {
        myTable.ajax.reload();
    });

    // Define table variable
    let table = $("#myTable").DataTable();

    // Handle click on details-control cells
    $("#myTable tbody").on("click", "td.details-control", function () {
        var tr = $(this).closest("tr");
        var row = table.row(tr);

        if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass("shown");
        } else {
            // Open this row
            row.child(format(row.data())).show();
            tr.addClass("shown");
        }
    });

    // Handle click on "Expand All" button
    $("#btn-show-all-children").on("click", function () {
        // Enumerate all rows
        table.rows().every(function () {
            // If row has details collapsed
            if (!this.child.isShown()) {
                // Open this row
                this.child(format(this.data())).show();
                $(this.node()).addClass("shown");
            }
        });
    });

    // Handle click on "Collapse All" button
    $("#btn-hide-all-children").on("click", function () {
        // Enumerate all rows
        table.rows().every(function () {
            // If row has details expanded
            if (this.child.isShown()) {
                // Collapse row details
                this.child.hide();
                $(this.node()).removeClass("shown");
            }
        });
    });

    var editRoute = editUrl;
    var deleteRoute = destroyUrl;

    function format(d) {
        const editUrl = editRoute.replace(":id", d.id);
        const deleteUrl = deleteRoute.replace(":id", d.id);

        return `
        <table>
            <tr>
                <td>Edit Data Tindakan:</td>
                <td>
                    <a href="${editUrl}" class="btn btn-info">
                        <i class="fa fa-edit"></i> &nbsp; Edit Data Tindakan
                    </a>
                </td>
            </tr>
            <tr>
                <td>Hapus Data Tindakan:</td>
                <td>
                    <form action="${deleteUrl}" method="POST" class="deleteForm">
                        <input type="hidden" name="_token" value="${token}">
                        <button type="submit" class="btn btn-danger" onclick="return confirm('Apakah anda yakin untuk menghapus data ini ?')">
                            <i class="fa fa-times"></i> &nbsp; Hapus Data Tindakan
                        </button>
                    </form>
                </td>
            </tr>
        </table>
    `;
    }

    if (successMessage) {
        toastr.success(successMessage);
    }
    if (errorMessage) {
        toastr.error(errorMessage);
    }

    $("#selectedKategori").select2({
        theme: "bootstrap4",
        placeholder: "Pilih Kategori Perawatan",
        ajax: {
            url: getKategoriUrl,
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
                            id: item.id,
                            text: `${item.nama_kategori}`,
                        };
                    }),
                };
            },
            cache: true,
        },
    });

    $("#selectedUnit").select2({
        theme: "bootstrap4",
        placeholder: "Pilih Unit",
        ajax: {
            url: getUnitUrl,
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
                            id: item.id,
                            text: `${item.nama_unit}`,
                        };
                    }),
                };
            },
            cache: true,
        },
    });

    $("#selectedPembayaran").select2({
        theme: "bootstrap4",
        placeholder: "Pilih Pembayaran",
        ajax: {
            url: getPembayaranUrl,
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
                            id: item.id,
                            text: `${item.nama_pembayaran}`,
                        };
                    }),
                };
            },
            cache: true,
        },
    });
});
