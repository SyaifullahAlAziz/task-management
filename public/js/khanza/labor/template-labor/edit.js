$(document).ready(function () {
    const getPembayaran = $("#templateLaboratoriumKhanzaFormEdit").data(
        "get-pembayaran"
    );
    const getLabor = $("#templateLaboratoriumKhanzaFormEdit").data("get-labor");
    const getSelectJenisPembayaranId = $("#templateLaboratoriumKhanzaFormEdit").data("select-pembayaran-id");
    const getSelectJenisPembayaranText = $("#templateLaboratoriumKhanzaFormEdit").data("select-pembayaran-text");
    const getSelectJenisLaborId = $("#templateLaboratoriumKhanzaFormEdit").data("select-labor-id");
    const getSelectJenisLaborText = $("#templateLaboratoriumKhanzaFormEdit").data("select-labor-text");

    // Pembayaran
    $("#selectedPembayaranEdit").select2({
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

    var jenisPembayaranId = getSelectJenisPembayaranId;
    var JenisPembayaranName = getSelectJenisPembayaranText;
    if (jenisPembayaranId) {
        var newOption = new Option(JenisPembayaranName, jenisPembayaranId, true, true);
        $("#selectedPembayaranEdit").append(newOption).trigger("change");
    }

    $("#selectedLaborEdit").select2({
        theme: "bootstrap4",
        placeholder: "Pilih Jenis Laboratorium",
        ajax: {
            url: getLabor,
            dataType: "json",
            delay: 250,
            data: function (params) {
                return {
                    q: params.term, // Search term
                    kd_pj: $("#selectedPembayaranEdit").val(),
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

    var jenisLaborId = getSelectJenisLaborId;
    var JenisLaborName = getSelectJenisLaborText;
    if (jenisLaborId) {
        var newOption = new Option(JenisLaborName, jenisLaborId, true, true);
        $("#selectedLaborEdit").append(newOption).trigger("change");
    }
});

function formatRupiah(angka) {
    let number_string = angka.replace(/[^,\d]/g, "");
    let split = number_string.split(",");
    let sisa = split[0].length % 3;
    let rupiah = split[0].substr(0, sisa);
    let ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    if (ribuan) {
        let separator = sisa ? "." : "";
        rupiah += separator + ribuan.join(".");
    }

    return rupiah + (split[1] !== undefined ? "," + split[1] : "");
}

document.addEventListener("DOMContentLoaded", function () {
    const biayaInput = document.getElementById("biayaItem");

    if (biayaInput) {
        // Format saat halaman dimuat
        if (biayaInput.value) {
            biayaInput.value = formatRupiah(biayaInput.value);
        }

        // Format saat user mengetik
        biayaInput.addEventListener("input", function () {
            const cursorPos = this.selectionStart;
            this.value = formatRupiah(this.value);
            this.setSelectionRange(cursorPos, cursorPos); // jaga posisi kursor
        });
    }
});
