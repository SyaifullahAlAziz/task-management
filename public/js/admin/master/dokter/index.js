$(document).ready(function () {
    const getSpesialis = $("#dokterForm").data("get-spesialis");
    const indexUrl = $("#dokterForm").data("index-url");
    const editUrl = $("#dokterForm").data("edit-url");
    const destroyUrl = $("#dokterForm").data("destroy-url");
    const mappingSatuSehatUrl = $("#dokterForm").data("mapping-satusehat-url");
    const token = $("#dokterForm").data("token");
    const successMessage = $("#dokterForm").data("success-message");
    const errorMessage = $("#dokterForm").data("error-message");
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
                data.spesialis_id = $("#selectedSpesialis").val();
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
                data: "kode_dokter",
                name: "kode_dokter",
            },
            {
                data: "nik_dokter",
                name: "nik_dokter",
                defaultContent: "-",
            },
            {
                data: "nama_dokter",
                name: "nama_dokter",
                defaultContent: "-",
            },
            {
                data: "tmp_lahir",
                name: "tmp_lahir",
                defaultContent: "-",
                render: (data, type, row) => {
                    var tmpLahir = row.tmp_lahir;
                    var tglLahir = new Date(row.tgl_lahir); // Pastikan tgl_lahir dalam format yang dapat diparsing
                    var formattedDate = `${tglLahir.getDate()}/${
                        tglLahir.getMonth() + 1
                    }/${tglLahir.getFullYear()}`; // Format: dd/mm/yyyy
                    return `${tmpLahir}, ${formattedDate}`; // Gabungkan tmp_lahir dan tgl_lahir
                },
            },
            {
                data: "jk",
                name: "jk",
                defaultContent: "-",
                render: (data, type, row) => {
                    var jekel = row.jk;
                    if (jekel == "1") {
                        return "Laki-Laki";
                    } else if (jekel == "2") {
                        return "Perempuan";
                    } else {
                        return "Tidak Ditemukan";
                    }
                },
            },
            {
                data: "telp",
                name: "telp",
                defaultContent: "-",
            },
            {
                data: "nama_spesialis",
                name: "nama_spesialis",
                defaultContent: "-",
            },
            {
                data: "kd_dokter_satusehat",
                name: "kd_dokter_satusehat",
                defaultContent: "-",
            },
        ],

        order: [[1, "desc"]],
    });

    $("#selectedSpesialis").on("change", function () {
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
    var mappingSatuSehatRoute = mappingSatuSehatUrl;

    function format(d) {
        const editUrl = editRoute.replace(":id", d.id);
        const deleteUrl = deleteRoute.replace(":id", d.id);
        const mappingSatuSehatUrl = mappingSatuSehatRoute.replace(":id", d.id);

        return `
        <table>
            <tr>
                <td>Edit Data Dokter:</td>
                <td>
                    <a href="${editUrl}" class="btn btn-info">
                        <i class="fa fa-edit"></i> &nbsp; Edit Data Dokter
                    </a>
                </td>
                <td>Mapping Kode Dokter Satu Sehat</td>
                <td>
                    <a href="${mappingSatuSehatUrl}" class="btn btn-primary">
                        <i class="fa fa-arrow-right"></i> &nbsp; Mapping Kode Dokter Satu Sehat
                    </a>
                </td>
            </tr>
            <tr>
                <td>Hapus Data Dokter:</td>
                <td>
                    <form action="${deleteUrl}" method="POST" class="deleteForm">
                        <input type="hidden" name="_token" value="${token}">
                        <button type="submit" class="btn btn-danger" onclick="return confirm('Apakah anda yakin untuk menghapus data ini ?')">
                            <i class="fa fa-times"></i> &nbsp; Hapus Data Dokter
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

    $("#selectedSpesialis").select2({
        theme: "bootstrap4",
        placeholder: "Pilih Spesialis",
        ajax: {
            url: getSpesialis,
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
                            text: `${item.nama_spesialis}`,
                        };
                    }),
                };
            },
            cache: true,
        },
    });
});
