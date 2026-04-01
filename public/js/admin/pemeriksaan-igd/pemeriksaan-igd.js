var pemeriksaanCounter = 1;

function tambahPemeriksaan() {
    pemeriksaanCounter += 1;

    // Create a new div element for the new row
    var newPemeriksaanRow = document.createElement("div");
    newPemeriksaanRow.classList.add("row", "mt-4");
    newPemeriksaanRow.id = "pemeriksaanId" + pemeriksaanCounter;

    // Create the HTML content for the new row
    newPemeriksaanRow.innerHTML = `
            <div class="col-lg">
                <div class="mb-3">
                    <label>Nama Pemeriksaan UGD
                        <span class="text-danger">*</span>
                    </label>
                    <input type="text" name="nama_pemeriksaan_igd[]" class="form-control" placeholder="Masukan Nama Pemeriksaan IGD">
                </div>
            </div>
            <div class="col-lg-1">
                <div class="mb-3"></div>
                <button type="button" class="btn btn-danger mt-3" id="button${pemeriksaanCounter}" onclick="hapusPemeriksaan(this)">
                    <i class="fa fa-times"></i>
                </button>
            </div>
        `;

    // Append the new row to the form
    var form = document.getElementById("pemeriksaanForm");
    form.appendChild(newPemeriksaanRow);
}

function hapusPemeriksaan(button) {
    var buttonId = button.id;
    var number = buttonId.replace("button", ""); // Extract the number from the button ID
    var row = document.getElementById("pemeriksaanId" + number);
    if (row) {
        row.remove();
    }
}
