$(document).ready(function () {
    const token = $("#editKuotaDokterForm").data("token");
    const getDokterUrl = $("#editKuotaDokterForm").data("get-dokter");
    const getKuotaRsUrl = $("#editKuotaDokterForm").data("get-tahun");

    // Dokter
    let $dokterSelect = $("#selectedDokter");
    let oldIdDokter = $dokterSelect.data("old-dokter-id");
    const getDokterId = $("#editKuotaDokterForm").data("dokter-id");
    const getDokterText = $("#editKuotaDokterForm").data("dokter-text");

    $dokterSelect.select2({
        theme: "bootstrap4",
        placeholder: "Pilih Dokter",
        ajax: {
            url: getDokterUrl,
            dataType: "json",
            delay: 250,
            data: function (params) {
                return { q: params.term };
            },
            processResults: function (data) {
                return {
                    results: data.items.map(function (item) {
                        return {
                            id: item.kd_dokter,
                            text: item.nm_dokter,
                        };
                    }),
                };
            },
            cache: true,
        },
    });

    // Kalau ada nilai lama, fetch teks-nya dari server
    if (oldIdDokter) {
        $.ajax({
            url: getDokterUrl,
            data: { id: oldIdDokter }, // tambahkan endpoint supaya bisa ambil 1 data by id
            dataType: "json",
            success: function (data) {
                if (data && data.item) {
                    let option = new Option(
                        data.item.nm_dokter,
                        data.item.kd_dokter,
                        true,
                        true
                    );
                    $dokterSelect.append(option).trigger("change");
                }
            },
        });
    }

    var dokterId = getDokterId;
    var dokterText = getDokterText;
    if (dokterId) {
        var newOption = new Option(dokterText, dokterId, true, true);
        $("#selectedDokter").append(newOption).trigger("change");
    }

    // Tahun
    let $tahunSelect = $("#selectedTahun");
    let oldIdTahun = $tahunSelect.data("old-tahun-id");
    const getKuotaRsId = $("#editKuotaDokterForm").data("kuotars-id");
    const getKuotaRsText = $("#editKuotaDokterForm").data("kuotars-text");

    $tahunSelect.select2({
        theme: "bootstrap4",
        placeholder: "Pilih Tahun",
        ajax: {
            url: getKuotaRsUrl,
            dataType: "json",
            delay: 250,
            data: function (params) {
                return { q: params.term };
            },
            processResults: function (data) {
                return {
                    results: data.items.map(function (item) {
                        return {
                            id: item.id,
                            text:
                                "Tahun " +
                                item.tahun +
                                " - Bulan " +
                                item.bulan,
                        };
                    }),
                };
            },
            cache: true,
        },
    });

    // Kalau ada nilai lama, fetch teks-nya dari server
    if (oldIdTahun) {
        $.ajax({
            url: getKuotaRsUrl,
            data: { id: oldIdTahun },
            dataType: "json",
            success: function (data) {
                if (data) {
                    let option = new Option(
                        "Tahun " + data.tahun + " - Bulan " + data.bulan,
                        data.id,
                        true,
                        true
                    );
                    $tahunSelect.append(option).trigger("change");
                }
            },
        });
    }

    var kuotarsId = getKuotaRsId;
    var kuotarsText = getKuotaRsText;
    if (kuotarsId) {
        var newOption = new Option(kuotarsText, kuotarsId, true, true);
        $("#selectedTahun").append(newOption).trigger("change");
    }
});
