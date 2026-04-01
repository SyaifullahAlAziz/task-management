$(document).ready(function () {
    const getJabatan = $("#formJabatanTambah").data("get-jabatan");
    $("#selectedJabatan").select2({
        theme: "bootstrap4",
        placeholder: "Pilih Jabatan",
        ajax: {
            url: getJabatan,
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
                            id: item.kd_jbtn,
                            text: `${item.nm_jbtn}`,
                            kd_jbtn: item.kd_jbtn,
                            nm_jbtn: item.nm_jbtn,
                        };
                    }),
                };
            },
            cache: true,
        },
    });

    $("#selectedJabatan").on("select2:select", function (e) {
        const data = e.params.data;

        $('input[name="nama_jabatan"]').val(data.nm_jbtn);
    });
});
