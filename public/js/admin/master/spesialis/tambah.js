var counter = 1;

function tambahSpesialis() {
    counter += 1;

    // Create a new div element for the new row
    var newRow = document.createElement('div');
    newRow.classList.add('row', 'mt-4');
    newRow.id = 'spesialisId' + counter;

    // Create the HTML content for the new row
    newRow.innerHTML = `
        <div class="col-lg">
            <div class="mb-3">
                <label>Kode Spesialis
                    <span class="text-danger">*</span>
                </label>
                <input type="text" name="kode_spesialis[]" class="form-control" placeholder="Masukan Kode Spesialis">
            </div>
        </div>
        <div class="col-lg">
            <div class="mb-3">
                <label>Nama Spesialis
                    <span class="text-danger">*</span>
                </label>
                <input type="text" name="nama_spesialis[]" class="form-control" placeholder="Masukan Nama Spesialis">
            </div>
        </div>
        <div class="col-lg-1">
            <div class="mb-3"></div>
            <button type="button" class="btn btn-danger mt-3" id="button${counter}" onclick="hapusSpesialis(this);">
                <i class="fa fa-times"></i>
            </button>
        </div>
    `;

    // Append the new row to the form
    var form = document.getElementById("spesialisForm");
    form.appendChild(newRow);
}

function hapusSpesialis(button) {
    var buttonId = button.id;
    var number = buttonId.replace("button", ""); // Extract the number from the button ID
    var row = document.getElementById('spesialisId' + number);
    if (row) {
        row.remove();
    }
}
