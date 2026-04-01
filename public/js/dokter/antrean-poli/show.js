$(document).ready(function () {
    const $antreanPoliShow = $("#antreanPoliShow");
    const token = $antreanPoliShow.data("token");
    const panggilUrl = $antreanPoliShow.data("panggil-url");
    const kodeRuangan = $antreanPoliShow.data("kode-ruangan");

    // Setup CSRF
    $.ajaxSetup({
        headers: { "X-CSRF-TOKEN": token },
    });

    // === DataTable ===
    const table = $("#myTable").DataTable({
        processing: true,
        serverSide: true,
        paging: true,
        pageLength: 10,
        lengthMenu: [
            [10, 25, 50, 100, 250],
            [10, 25, 50, 100, 250],
        ],
        language: {
            paginate: { previous: "Previous", next: "Next" },
        },
        ajax: {
            url: $antreanPoliShow.data("show-url"),
            data: function (d) {
                d.page = Math.ceil(d.start / d.length) + 1;
                d.search = d.search.value;
            },
        },
        columns: [
            {
                data: null,
                render: (data, type, row, meta) =>
                    meta.row + meta.settings._iDisplayStart + 1,
                orderable: false,
            },
            { data: "no_reg", name: "no_reg", defaultContent: "-" },
            { data: "no_rawat", name: "no_rawat", defaultContent: "-" },
            { data: "no_rkm_medis", name: "no_rkm_medis", defaultContent: "-" },
            { data: "no_peserta", name: "no_peserta", defaultContent: "-" },
            { data: "nm_pasien", name: "nm_pasien", defaultContent: "-" },
            { data: "kd_dokter", name: "kd_dokter", defaultContent: "-" },
            { data: "nm_dokter", name: "nm_dokter", defaultContent: "-" },
            {
                data: "tgl_registrasi",
                name: "tgl_registrasi",
                defaultContent: "-",
            },
            {
                data: "noicare",
                name: "noicare",
                defaultContent: "-",
                render: (data) =>
                    data
                        ? '<span class="badge badge-success">Terkirim</span>'
                        : '<span class="badge badge-danger">Belum</span>',
            },
            { data: "png_jawab", name: "png_jawab", defaultContent: "-" },
            {
                data: "aksi",
                name: "aksi",
                orderable: false,
                searchable: false,
                defaultContent: "-",
            },
        ],
        order: [[1, "desc"]],
    });

    // === Fungsi untuk mainkan suara antrean ===
    function playQueueSound(dipanggil, namapoli, callback) {
        const openingSound = document.getElementById("opening-sound");
        const queueAudio = document.getElementById("queue-audio");

        if (!dipanggil || !namapoli) {
            console.warn("Data audio tidak valid:", dipanggil, namapoli);
            if (typeof callback === "function") callback();
            return;
        }

        console.log("Memainkan antrean:", dipanggil);

        openingSound.play();
        openingSound.onended = function () {
            const audioFiles = [
                `/suara/A/${dipanggil}.mp3`,
                `/suara/${namapoli}.mp3`,
            ];
            let currentIndex = 0;

            function playNext() {
                if (currentIndex < audioFiles.length) {
                    queueAudio.src = audioFiles[currentIndex++];
                    console.log("Putar:", queueAudio.src);
                    queueAudio
                        .play()
                        .catch((err) =>
                            console.error("Gagal putar audio:", err)
                        );
                } else {
                    if (typeof callback === "function") callback();
                }
            }

            queueAudio.onended = playNext;
            playNext();
        };
    }

    // === Panggil Pasien ===
    $("#myTable").on("click", ".btn-panggil", function () {
        const norawat = $(this).data("norawat");

        $.ajax({
            url: panggilUrl,
            method: "POST",
            data: { norawat, koderuangan: kodeRuangan },
            success: function (res) {
                toastr.success(res.message || "Berhasil Panggil Antrean!");

                const dipanggil = res.dipanggil;
                const namapoli = res.namapoli;

                // mainkan suara langsung
                playQueueSound(dipanggil, namapoli);

                // buka iCare langsung kalau ada url
                if (res.icare?.url) {
                    window.open(res.icare.url, "_blank");
                }

                // refresh tabel
                table.ajax.reload(null, false);
            },
            error: function (xhr) {
                const res = xhr.responseJSON;
                toastr.error(
                    res?.message || "Terjadi kesalahan tidak diketahui"
                );
            },
        });
    });
});
