document.addEventListener("DOMContentLoaded", function () {
    var radioLain = document.getElementById("radioLainId");
    var inputLain = document.getElementById("inputanLainId");
    var sumberData = document.getElementById("sumberdataId");
    var radioKeluarga = document.getElementById("radioKeluarga");
    var radioPasien = document.getElementById("radioPasien");

    // Periksa apakah elemen ditemukan sebelum menambahkan event listener

    if (sumberData) {
        sumberData.value = "Pasien";
    }


    if (radioLain && inputLain && sumberData) {
        // Tampilkan atau sembunyikan input teks "Lainnya" berdasarkan radio button yang dipilih
        if(radioLain && sumberData)
        {
            radioLain.addEventListener("change", function () {
                inputLain.style.display = radioLain.checked ? "block" : "none";
                sumberData.value = " ";
            });
        }

        // Atur nilai input "sumberdataId" saat opsi "Keluarga" dipilih
        if (radioKeluarga && sumberData) {
            radioKeluarga.addEventListener("change", function () {
                if (radioKeluarga.checked) {
                    sumberData.value = "Keluarga";
                    inputLain.style.display = "none"; // Sembunyikan input lain jika ada
                }
            });
        }

        // Atur nilai input "sumberdataId" saat opsi "Pasien" dipilih
        if (radioPasien && sumberData) {
            radioPasien.addEventListener("change", function () {
                if (radioPasien.checked) {
                    sumberData.value = "Pasien";
                    inputLain.style.display = "none"; // Sembunyikan input lain jika ada
                }
            });
        }
    }
});
