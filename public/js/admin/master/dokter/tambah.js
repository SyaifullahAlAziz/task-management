$(document).ready(function () {
    const getUser = $("#dokterTambahForm").data("get-users");
    const getSpesialis = $("#dokterTambahForm").data("get-spesialis");
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

    const cariUrl = $("#dokterTambahForm").data("url-caridokter");
    const token = $("#dokterTambahForm").data("token");

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
                    $("#nikDokter").val(response.data.no_ktp);
                    $("#kodeDokter").val(response.data.kd_dokter_bpjs);
                    $("#namaDokter").val(response.data.nm_dokter_bpjs);
                    $("#tempatLahir").val(response.data.tmp_lahir);
                    $("#tanggalLahir").val(response.data.tgl_lahir);

                    var jkValue = response.data.jk === "L" ? 1 : 2;
                    $("#selectedJekel").val(jkValue).trigger('change');

                    var agamaValue = response.data.agama === "ISLAM" ? 1 : '';
                    $("#selectedAgama").val(agamaValue).trigger('change');

                    $("#nomorTelepon").val(response.data.no_telp);
                    $("#alamatDomisili").val(response.data.alamat);
                } else {
                    alert(response.message); // Hanya muncul sekali
                    $("#nikDokter").val("");
                    $("#kodeDokter").val("");
                    $("#namaDokter").val("");
                    $("#tempatLahir").val("");
                    $("#tanggalLahir").val("");
                    $("#nomorTelepon").val("");
                    $("#alamatDomisili").val("");
                    $("#selectedJekel").val("");
                    $("#selectedAgama").val("");
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
