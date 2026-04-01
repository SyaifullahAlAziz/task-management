$(document).ready(function () {
    const getLevelUrl = $("#userForm").data("url-getlevel");
    $("#selectedLevel").select2({
        theme: "bootstrap4",
        placeholder: "Pilih Status Autentikasi",
        ajax: {
            url: getLevelUrl,
            dataType: "json",
            delay: 250,
            data: function (params) {
                return { q: params.term };
            },
            processResults: function (data) {
                return {
                    results: data.items.map(function (item) {
                        return {
                            id: item.id_level,
                            text: `${item.namalevel}`,
                        };
                    }),
                };
            },
            cache: true,
        },
    });

    const cariUrl = $("#userForm").data("url-carikaryawan");
    const token = $("#userForm").data("token");

    let sedangCari = false;
    let nikTerakhir = ""; // Simpan nik terakhir untuk menghindari alert berulang

    $('input[name="nik"]').on("keypress", function (e) {
        if (e.which === 13) {
            e.preventDefault();
            if (!sedangCari) {
                cariDataKaryawan($(this).val());
            }
        }
    });

    $('input[name="nik"]').on("blur", function () {
        if (!sedangCari) {
            cariDataKaryawan($(this).val());
        }
    });

    function cariDataKaryawan(nik) {
        if (!nik || nik === nikTerakhir) return; // Cegah pencarian ulang untuk NIK sama
        sedangCari = true;
        nikTerakhir = nik; // Simpan NIK yg sedang dicari

        $.ajax({
            url: cariUrl,
            type: "POST",
            data: {
                _token: token,
                nik: nik,
            },
            success: function (response) {
                if (response.success) {
                    $("#namaKaryawan").val(response.data.nama);
                    $("#usernameKaryawan").val(response.data.nik);
                } else {
                    alert(response.message); // Hanya muncul sekali
                    $("#namaKaryawan").val("");
                    $("#usernameKaryawan").val("");
                }
            },
            error: function () {
                alert("Terjadi kesalahan saat mengambil data.");
            },
            complete: function () {
                sedangCari = false;
            },
        });
    }
});
