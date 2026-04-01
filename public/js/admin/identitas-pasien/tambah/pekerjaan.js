document.addEventListener("DOMContentLoaded", function () {
    var radioLain = document.getElementById("pekerjaanlainnyaId");
    var inputPekerjaan = document.getElementById("inputanPekerjaanLainId");
    var radioPNS = document.getElementById("radioPNS");
    var radioSwasta = document.getElementById("radioSwasta");
    var radioWiraswasta = document.getElementById("radioWiraswasta");
    var radioProfesional = document.getElementById("radioProfesional");
    var radioPelajar = document.getElementById("radioPelajar");
    var radioIRT = document.getElementById("radioIRT");

    // Periksa apakah elemen ditemukan sebelum menambahkan event listener

    if (inputPekerjaan) {
        inputPekerjaan.value = "PNS";
    }

    if (radioLain && radioPNS && inputPekerjaan && radioSwasta) {
        // Tampilkan atau sembunyikan input teks "Lainnya" berdasarkan radio button yang dipilih
        if(radioLain && inputPekerjaan)
        {
            radioLain.addEventListener("change", function () {
                inputPekerjaan.style.display = radioLain.checked ? "block" : "none";
                inputPekerjaan.value = " ";
            });
        }

        // Atur nilai input "sumberdataId" saat opsi "Keluarga" dipilih
        if (radioPNS && inputPekerjaan) {
            radioPNS.addEventListener("change", function () {
                if (radioPNS.checked) {
                    inputPekerjaan.value = "PNS";
                    inputPekerjaan.style.display = "none"; // Sembunyikan input lain jika ada
                }
            });
        }

        // Atur nilai input "sumberdataId" saat opsi "Pasien" dipilih
        if (radioSwasta && inputPekerjaan) {
            radioSwasta.addEventListener("change", function () {
                if (radioSwasta.checked) {
                    inputPekerjaan.value = "Swasta";
                    inputPekerjaan.style.display = "none"; // Sembunyikan input lain jika ada
                }
            });
        }

        // Atur nilai input "sumberdataId" saat opsi "Pasien" dipilih
        if (radioWiraswasta && inputPekerjaan) {
            radioWiraswasta.addEventListener("change", function () {
                if (radioWiraswasta.checked) {
                    inputPekerjaan.value = "Wiraswasta";
                    inputPekerjaan.style.display = "none"; // Sembunyikan input lain jika ada
                }
            });
        }

        // Atur nilai input "sumberdataId" saat opsi "Pasien" dipilih
        if (radioProfesional && inputPekerjaan) {
            radioProfesional.addEventListener("change", function () {
                if (radioProfesional.checked) {
                    inputPekerjaan.value = "Profesional";
                    inputPekerjaan.style.display = "none"; // Sembunyikan input lain jika ada
                }
            });
        }

        // Atur nilai input "sumberdataId" saat opsi "Pasien" dipilih
        if (radioPelajar && inputPekerjaan) {
            radioPelajar.addEventListener("change", function () {
                if (radioPelajar.checked) {
                    inputPekerjaan.value = "Pelajar / Mahasiswa";
                    inputPekerjaan.style.display = "none"; // Sembunyikan input lain jika ada
                }
            });
        }

        // Atur nilai input "sumberdataId" saat opsi "Pasien" dipilih
        if (radioIRT && inputPekerjaan) {
            radioIRT.addEventListener("change", function () {
                if (radioIRT.checked) {
                    inputPekerjaan.value = "Ibu Rumah Tangga";
                    inputPekerjaan.style.display = "none"; // Sembunyikan input lain jika ada
                }
            });
        }
    }
});
