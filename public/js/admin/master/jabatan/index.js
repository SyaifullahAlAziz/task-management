$(document).ready(function () {
    const token = $("#jabatanForm").data("token");
    const indexUrl = $("#jabatanForm").data("index-url");
    const editUrl = $("#jabatanForm").data("edit-url");
    const destroyUrl = $("#jabatanForm").data("destroy-url");
    const successMessage = $("#jabatanForm").data("success-message");
    const errorMessage = $("#jabatanForm").data("error-message");
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
                // Mengambil informasi tentang halaman saat ini dari DataTables
                data.start = data.start || 0; // Untuk mengatasi 'start' undefined pada permintaan pertama
                data.length = data.length || 10; // Jika 'length' undefined, set 10 sebagai default

                // Mendapatkan halaman berikutnya atau sebelumnya berdasarkan permintaan paging saat ini
                data.page = Math.ceil(data.start / data.length) + 1;

                // Setelah itu, Anda bisa melanjutkan dengan parameter pencarian atau filter lainnya
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
                data: "nama_jabatan",
                name: "nama_jabatan",
                defaultContent: "-",
            },
        ],

        order: [[1, "desc"]],
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
                <td>Edit Data Jabatan:</td>
                <td>
                    <a href="${editUrl}" class="btn btn-info">
                        <i class="fa fa-edit"></i> &nbsp; Edit Data Jabatan
                    </a>
                </td>
            </tr>
            <tr>
                <td>Hapus Data Jabatan:</td>
                <td>
                    <form action="${deleteUrl}" method="POST" class="deleteForm">
                        <input type="hidden" name="_token" value="${token}">
                        <button type="submit" class="btn btn-danger" onclick="return confirm('Apakah anda yakin untuk menghapus data ini ?')">
                            <i class="fa fa-times"></i> &nbsp; Hapus Data Jabatan
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


});
