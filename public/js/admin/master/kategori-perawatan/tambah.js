$(document).ready(function () {
    const getKategori = $("#formKategoriPerawatanTambah").data("get-kategori");
    $("#selectedKategori").select2({
        theme: "bootstrap4",
        placeholder: "Pilih Kategori Perawatan",
        ajax: {
            url: getKategori,
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
                            id: item.kd_kategori,
                            text: `${item.nm_kategori}`,
                            kd_kategori: item.kd_kategori,
                            nm_kategori: item.nm_kategori,
                        };
                    }),
                };
            },
            cache: true,
        },
    });

    $("#selectedKategori").on("select2:select", function (e) {
        const data = e.params.data;

        $('input[name="kode_kategori"]').val(data.kd_kategori);
        $('input[name="nama_kategori"]').val(data.nm_kategori);
    });
});
