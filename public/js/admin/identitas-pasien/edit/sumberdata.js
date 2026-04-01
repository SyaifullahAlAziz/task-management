document.addEventListener("DOMContentLoaded", function () {
    var radioLain = document.getElementById("radioLainId");
    var inputLain = document.getElementById("inputanLainId");
    var sumberData = document.getElementById("sumberdataId");
    var radioKeluarga = document.getElementById("radioKeluarga");
    var radioPasien = document.getElementById("radioPasien");

    // Cek kondisi awal: jika sumber_data bukan "Pasien" atau "Keluarga", pilih radio "Lainnya"
    if (sumberData && sumberData.value !== "Pasien" && sumberData.value !== "Keluarga") {
        radioLain.checked = true;
        inputLain.style.display = "block";
    }

    if (radioLain && inputLain && sumberData) {
        // Event listener untuk opsi "Lainnya"
        radioLain.addEventListener("change", function () {
            if (radioLain.checked) {
                inputLain.style.display = "block";
                sumberData.value = ""; // Kosongkan nilai sumberData saat opsi "Lainnya" dipilih
            }
        });

        // Event listener untuk opsi "Keluarga"
        radioKeluarga.addEventListener("change", function () {
            if (radioKeluarga.checked) {
                sumberData.value = "Keluarga";
                inputLain.style.display = "none"; // Sembunyikan input lain jika ada
            }
        });

        // Event listener untuk opsi "Pasien"
        radioPasien.addEventListener("change", function () {
            if (radioPasien.checked) {
                sumberData.value = "Pasien";
                inputLain.style.display = "none"; // Sembunyikan input lain jika ada
            }
        });
    }
});
