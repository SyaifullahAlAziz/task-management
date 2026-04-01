$(document).ready(function () {
    const getPembayaran = $("#formPembayaranTambah").data("get-pembayaran");
    $("#selectedPembayaran").select2({
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
                            kd_pj: item.kd_pj,
                            png_jawab: item.png_jawab,
                            no_telp: item.no_telp,
                            attn: item.attn,
                            alamat_asuransi: item.alamat_asuransi,
                        };
                    }),
                };
            },
            cache: true,
        },
    });

    $("#selectedPembayaran").on("select2:select", function (e) {
        const data = e.params.data;

        $('input[name="kode_pembayaran"]').val(data.kd_pj);
        $('input[name="nama_pembayaran"]').val(data.png_jawab);
        $('input[name="telp_perusahaan"]').val(data.no_telp);
        $('input[name="pj_perusahaan"]').val(data.attn);
        $('textarea[name="alamat_perusahaan"]').val(data.alamat_asuransi);
    });
});
