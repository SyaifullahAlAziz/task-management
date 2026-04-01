$(document).on("click", "#btnCariKode", function (e) {
    const checkKodeDokter = $("#dokterSatuSehatForm").data("check-kodedokter");
    const token = $("#dokterSatuSehatForm").data("token");
    const successMessage = $("#dokterForm").data("success-message");
    const errorMessage = $("#dokterForm").data("error-message");
    e.preventDefault(); // ✅ cegah form submit otomatis

    let nik = $("#nikDokter").val();

    if (!nik) {
        alert("Masukkan NIK dokter terlebih dahulu");
        return;
    }

    $.ajax({
        url: checkKodeDokter,
        type: "POST",
        data: {
            nik_dokter: nik,
            _token: token,
        },
        success: function (res) {
            if (res.kode_dokter) {
                $("#kdDokterSatuSehat").val(res.kode_dokter);
            } else {
                alert("Kode dokter tidak ditemukan di SATUSEHAT.");
            }
        },
        error: function (xhr) {
            alert(
                "Terjadi kesalahan: " +
                    (xhr.responseJSON?.message ?? "Unknown error")
            );
        },
    });

    if (successMessage) {
        toastr.success(successMessage);
    }
    if (errorMessage) {
        toastr.error(errorMessage);
    }
});
