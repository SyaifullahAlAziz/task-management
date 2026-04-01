document.addEventListener("DOMContentLoaded", function () {
    var radioLain = document.getElementById("rujukanlainnyaId");
    var inputLain = document.getElementById("inputanrujukanLainId");
    var radios = document.querySelectorAll('input[name="rujukan"]');

    function checkRadio() {
        if (radioLain.checked) {
            inputLain.style.display = "block";
        } else {
            inputLain.style.display = "none";
        }
    }

    // Set kondisi awal
    checkRadio();

    // Event listener untuk setiap radio button
    radios.forEach(function (radio) {
        radio.addEventListener("change", checkRadio);
    });
});
