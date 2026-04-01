$(document).ready(function () {
    const getUser = $("#dokterEditForm").data("get-users");
    const getSpesialis = $("#dokterEditForm").data("get-spesialis");
    const selectUserId = $("#dokterEditForm").data("select-users-id");
    const selectUserText = $("#dokterEditForm").data("select-users-text");
    const selectSpesialisId = $("#dokterEditForm").data("select-spesialis-id");
    const selectSpesialisText = $("#dokterEditForm").data(
        "select-spesialis-text"
    );
    $("#selectedJekel").select2({
        theme: "bootstrap4",
    });
    $("#selectedAgama").select2({
        theme: "bootstrap4",
    });
    $("#tanggalLahir").datepicker({
        format: "yyyy-mm-dd",
        autoclose: true,
        todayHighlight: true,
        language: "id",
        orientation: "bottom auto",
    });
    $("#selectedUsers").select2({
        theme: "bootstrap4",
        placeholder: "Pilih Pengguna",
        ajax: {
            url: getUser,
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
                            text: `${item.name}`,
                        };
                    }),
                };
            },
            cache: true,
        },
    });

    var usersId = selectUserId;
    var usersName = selectUserText;
    if (usersId) {
        var newOption = new Option(usersName, usersId, true, true);
        $("#selectedUsers").append(newOption).trigger("change");
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

    var spesialisId = selectSpesialisId;
    var spesialisName = selectSpesialisText;
    if (spesialisId) {
        var newOption = new Option(spesialisName, spesialisId, true, true);
        $("#selectedSpesialis").append(newOption).trigger("change");
    }
});
