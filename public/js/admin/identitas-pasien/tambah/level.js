var counter = 1;

function tambahAutentikasi() {
    counter += 1;

    // Create a new div element for the new row
    var newRow = document.createElement('div');
    newRow.classList.add('row', 'mt-4');
    newRow.id = 'autentikasiId' + counter;

    // Create the HTML content for the new row
    newRow.innerHTML = `
        <div class="col-lg">
            <div class="mb-3">
                <label>ID Status
                <span class="text-danger">*</span>
                </label>
                <input type="text" name="id_level[]" class="form-control" placeholder="Masukan ID Status Autentikasi">
            </div>
        </div>
        <div class="col-lg">
            <div class="mb-3">
                <label>Status Autentikasi
                <span class="text-danger">*</span>
                </label>
                <input type="text" name="namalevel[]" class="form-control" placeholder="Masukan Nama Status Autentikasi">
            </div>
        </div>
        <div class="col-lg-1">
            <div class="mt-1">
                <br>
                <button type="button" class="btn btn-danger" id="button${counter}" onclick="hapusAutentikasi(this);">
                    <i class="fa fa-times"></i>
                </button>
            </div>
        </div>
    `;

    // Append the new row to the form
    var form = document.getElementById("autentikasiForm");
    form.appendChild(newRow);
}

function hapusAutentikasi(button) {
    var buttonId = button.id;
    var number = buttonId.replace("button", ""); // Extract the number from the button ID
    var row = document.getElementById('autentikasiId' + number);
    if (row) {
        row.remove();
    }
}
