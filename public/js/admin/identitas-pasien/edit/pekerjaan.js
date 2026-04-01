document.addEventListener("DOMContentLoaded", function () {
    var radioLain = document.getElementById("pekerjaanlainnyaId");
    var inputLain = document.getElementById("inputanPekerjaanLainId");
    var radios = document.querySelectorAll('input[name="pekerjaan"]');

    function checkRadio() {
        if (radioLain.checked) {
            inputLain.style.display = "block"; // Tampilkan input jika "Lainnya" dipilih
        } else {
            inputLain.style.display = "none"; // Sembunyikan input jika radio lain dipilih
        }
    }

    // Set kondisi awal
    checkRadio();

    // Event listener untuk setiap radio button
    radios.forEach(function (radio) {
        radio.addEventListener("change", checkRadio);
    });
});
