$(document).ready(function () {
    const token = $("#spesialisForm").data("token");
    const indexUrl = $("#spesialisForm").data("spesialis-index");
    const editUrl = $("#spesialisForm").data("edit-url");
    const destroyUrl = $("#spesialisForm").data("destroy-url");
    const successMessage = $("#spesialisForm").data("success-message");
    const errorMessage = $("#spesialisForm").data("error-message");

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
                data: "kode_spesialis",
                name: "kode_spesialis",
            },
            {
                data: "nama_spesialis",
                name: "nama_spesialis",
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
                <td>Edit Data Spesialis:</td>
                <td>
                    <a href="${editUrl}" class="btn btn-info">
                        <i class="fa fa-edit"></i> &nbsp; Edit Data Spesialis
                    </a>
                </td>
            </tr>
            <tr>
                <td>Hapus Data Spesialis:</td>
                <td>
                    <form action="${deleteUrl}" method="POST" class="deleteForm">
                        <input type="hidden" name="_token" value="${token}">
                        <button type="submit" class="btn btn-danger" onclick="return confirm('Apakah anda yakin untuk menghapus data ini ?')">
                            <i class="fa fa-times"></i> &nbsp; Hapus Data Spesialis
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
