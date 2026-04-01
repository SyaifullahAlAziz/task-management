document.addEventListener("DOMContentLoaded", function () {
    var radioLain = document.getElementById("rujukanlainnyaId");
    var inputLain = document.getElementById("inputanrujukanLainId");
    var radioTidakAda = document.getElementById("radioTidakAda");
    var radioAda = document.getElementById("radioAda");
    var radioDokterMata = document.getElementById("radioDokterMata");
    var radioPerawat = document.getElementById("radioPerawat");

    // Periksa apakah elemen ditemukan sebelum menambahkan event listener

    if (inputLain) {
        inputLain.value = "Tidak Ada";
    }

    if (radioLain && inputLain) {
        // Tampilkan atau sembunyikan input teks "Lainnya" berdasarkan radio button yang dipilih
        if(radioLain && inputLain)
        {
            radioLain.addEventListener("change", function () {
                inputLain.style.display = radioLain.checked ? "block" : "none";
                inputLain.value = " ";
            });
        }

        // Atur nilai input "sumberdataId" saat opsi "Keluarga" dipilih
        if (radioTidakAda && inputLain) {
            radioTidakAda.addEventListener("change", function () {
                if (radioTidakAda.checked) {
                    inputLain.value = "Tidak Ada";
                    inputLain.style.display = "none"; // Sembunyikan input lain jika ada
                }
            });
        }

        // Atur nilai input "sumberdataId" saat opsi "Pasien" dipilih
        if (radioAda && inputLain) {
            radioAda.addEventListener("change", function () {
                if (radioAda.checked) {
                    inputLain.value = "Ada";
                    inputLain.style.display = "none"; // Sembunyikan input lain jika ada
                }
            });
        }

        // Atur nilai input "sumberdataId" saat opsi "Pasien" dipilih
        if (radioDokterMata && inputLain) {
            radioDokterMata.addEventListener("change", function () {
                if (radioDokterMata.checked) {
                    inputLain.value = "Dokter Mata";
                    inputLain.style.display = "none"; // Sembunyikan input lain jika ada
                }
            });
        }

        // Atur nilai input "sumberdataId" saat opsi "Pasien" dipilih
        if (radioPerawat && inputLain) {
            radioPerawat.addEventListener("change", function () {
                if (radioPerawat.checked) {
                    inputLain.value = "Perawat, Bidan, Puskesmas";
                    inputLain.style.display = "none"; // Sembunyikan input lain jika ada
                }
            });
        }
    }
});
