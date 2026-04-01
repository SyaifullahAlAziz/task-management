var counter = 1;

function tambahMasalah() {
    counter += 1;

    // Create a new div element for the new row
    var newRow = document.createElement('div');
    newRow.classList.add('row', 'mt-4');
    newRow.id = 'masalahId' + counter;

    // Create the HTML content for the new row
    newRow.innerHTML = `
        <div class="col-lg">
            <div class="mb-3">
                <label>Masalah Perawatan
                <span class="text-danger">*</span>
                </label>
                <input type="text" name="nama_masalah_igd[]" class="form-control" placeholder="Masukan Masalah Perawatan">
            </div>
        </div>
        <div class="col-lg-1">
            <div class="mt-1">
                <br>
                <button type="button" class="btn btn-danger" id="button${counter}" onclick="hapusMasalah(this);">
                    <i class="fa fa-times"></i>
                </button>
            </div>
        </div>
    `;

    // Append the new row to the form
    var form = document.getElementById("masalahForm");
    form.appendChild(newRow);
}

function hapusMasalah(button) {
    var buttonId = button.id;
    var number = buttonId.replace("button", ""); // Extract the number from the button ID
    var row = document.getElementById('masalahId' + number);
    if (row) {
        row.remove();
    }
}
