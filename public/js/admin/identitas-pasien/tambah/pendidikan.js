document.addEventListener("DOMContentLoaded", function () {
    var radioLain = document.getElementById("pendidikanlainnyaId");
    var inputLain = document.getElementById("inputanPendidikanLainId");
    var radioSD = document.getElementById("radioSD");
    var radioSMP = document.getElementById("radioSMP");
    var radioSMA = document.getElementById("radioSMA");
    var radioDiploma = document.getElementById("radioDiploma");
    var radioS1 = document.getElementById("radioS1");
    var radioS2 = document.getElementById("radioS2");
    var radioS3 = document.getElementById("radioS3");

    // Periksa apakah elemen ditemukan sebelum menambahkan event listener

    if (inputLain) {
        inputLain.value = "SD";
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
        if (radioSD && inputLain) {
            radioSD.addEventListener("change", function () {
                if (radioSD.checked) {
                    inputLain.value = "SD";
                    inputLain.style.display = "none"; // Sembunyikan input lain jika ada
                }
            });
        }

        // Atur nilai input "sumberdataId" saat opsi "Pasien" dipilih
        if (radioSMP && inputLain) {
            radioSMP.addEventListener("change", function () {
                if (radioSMP.checked) {
                    inputLain.value = "SMP";
                    inputLain.style.display = "none"; // Sembunyikan input lain jika ada
                }
            });
        }

        // Atur nilai input "sumberdataId" saat opsi "Pasien" dipilih
        if (radioSMA && inputLain) {
            radioSMA.addEventListener("change", function () {
                if (radioSMA.checked) {
                    inputLain.value = "SMA";
                    inputLain.style.display = "none"; // Sembunyikan input lain jika ada
                }
            });
        }

        // Atur nilai input "sumberdataId" saat opsi "Pasien" dipilih
        if (radioDiploma && inputLain) {
            radioDiploma.addEventListener("change", function () {
                if (radioDiploma.checked) {
                    inputLain.value = "Diploma";
                    inputLain.style.display = "none"; // Sembunyikan input lain jika ada
                }
            });
        }

        // Atur nilai input "sumberdataId" saat opsi "Pasien" dipilih
        if (radioS1 && inputLain) {
            radioS1.addEventListener("change", function () {
                if (radioS1.checked) {
                    inputLain.value = "S1";
                    inputLain.style.display = "none"; // Sembunyikan input lain jika ada
                }
            });
        }

        // Atur nilai input "sumberdataId" saat opsi "Pasien" dipilih
        if (radioS2 && inputLain) {
            radioS2.addEventListener("change", function () {
                if (radioS2.checked) {
                    inputLain.value = "S2";
                    inputLain.style.display = "none"; // Sembunyikan input lain jika ada
                }
            });
        }

        // Atur nilai input "sumberdataId" saat opsi "Pasien" dipilih
        if (radioS3 && inputLain) {
            radioS3.addEventListener("change", function () {
                if (radioS3.checked) {
                    inputLain.value = "S3";
                    inputLain.style.display = "none"; // Sembunyikan input lain jika ada
                }
            });
        }
    }
});
