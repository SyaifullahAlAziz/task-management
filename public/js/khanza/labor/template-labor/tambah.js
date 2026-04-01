$(document).ready(function () {
    const getPembayaran = $("#templateLaboratoriumKhanzaTambah").data(
        "get-pembayaran"
    );
    const getLabor = $("#templateLaboratoriumKhanzaTambah").data("get-labor");
    const biayaInput = document.getElementById("biayaItem");

    // Tambah
    if (biayaInput) {
        biayaInput.addEventListener("input", function () {
            let angka = this.value.replace(/[^,\d]/g, "");
            let split = angka.split(",");
            let sisa = split[0].length % 3;
            let rupiah = split[0].substr(0, sisa);
            let ribuan = split[0].substr(sisa).match(/\d{3}/gi);

            if (ribuan) {
                let separator = sisa ? "." : "";
                rupiah += separator + ribuan.join(".");
            }

            this.value =
                rupiah + (split[1] !== undefined ? "," + split[1] : "");
        });
    }

    // Pembayaran
    $("#selectedPembayaranTambah").select2({
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

    $("#selectedLaborTambah").select2({
        theme: "bootstrap4",
        placeholder: "Pilih Jenis Laboratorium",
        ajax: {
            url: getLabor,
            dataType: "json",
            delay: 250,
            data: function (params) {
                return {
                    q: params.term, // Search term
                    kd_pj: $("#selectedPembayaranTambah").val(),
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

});
