var counter = 1;

function tambahSatuanBesar() {
    counter += 1;

    // Create a new div element for the new row
    var newRow = document.createElement('div');
    newRow.classList.add('row', 'mt-4');
    newRow.id = 'satuanBesarId' + counter;

    // Create the HTML content for the new row
    newRow.innerHTML = `
        <div class="col-lg">
            <div class="mb-3">
                <label>Kode Satuan
                    <span class="text-danger">*</span>
                </label>
                <input type="text" name="kode_satuan_besar[]" class="form-control" placeholder="Masukan kode satuan">
            </div>
        </div>
        <div class="col-lg">
            <div class="mb-3">
                <label>Nama Satuan
                    <span class="text-danger">*</span>
                </label>
                <input type="text" name="nama_satuan_besar[]" class="form-control" placeholder="Masukan Nama Satuan">
            </div>
        </div>
        <div class="col-lg-1">
            <div class="mt-1">
                <br>
                <button type="button" class="btn btn-danger" id="button${counter}" onclick="hapusSatuanBesar(this);">
                    <i class="fa fa-times"></i>
                </button>
            </div>
        </div>
    `;

    // Append the new row to the form
    var form = document.getElementById("satuanBesarForm");
    form.appendChild(newRow);
}

function hapusSatuanBesar(button) {
    var buttonId = button.id;
    var number = buttonId.replace("button", ""); // Extract the number from the button ID
    var row = document.getElementById('satuanBesarId' + number);
    if (row) {
        row.remove();
    }
}
