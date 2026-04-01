$(document).ready(function () {
    const token = $("#tambahKuotaDokterForm").data("token");
    const getDokterUrl = $("#tambahKuotaDokterForm").data("get-dokter");
    const getKuotaRsUrl = $("#tambahKuotaDokterForm").data("get-tahun");
    const successMessage = $("#tambahKuotaDokterForm").data("success-message");
    const errorMessage = $("#tambahKuotaDokterForm").data("error-message");

    // Dokter
    let $dokterSelect = $("#selectedDokter");
    let oldIdDokter = $dokterSelect.data("old-dokter-id");

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

    // Tahun
    let $tahunSelect = $("#selectedTahun");
    let oldIdTahun = $tahunSelect.data("old-tahun-id");

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

    if (successMessage) {
        toastr.success(successMessage);
    }
    if (errorMessage) {
        toastr.error(errorMessage);
    }
});
