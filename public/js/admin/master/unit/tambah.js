$(document).ready(function () {
    const getUnit = $("#formUnitTambah").data("get-unit");
    $("#selectedPoliklinik").select2({
        theme: "bootstrap4",
        placeholder: "Pilih Jenis Pembayaran",
        ajax: {
            url: getUnit,
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
                            id: item.kd_poli,
                            text: `${item.nm_poli}`,
                            kd_poli: item.kd_poli,
                            nm_poli: item.nm_poli,
                        };
                    }),
                };
            },
            cache: true,
        },
    });

    $("#selectedPoliklinik").on("select2:select", function (e) {
        const data = e.params.data;

        $('input[name="kode_unit"]').val(data.kd_poli);
        $('input[name="nama_unit"]').val(data.nm_poli);
    });
});
