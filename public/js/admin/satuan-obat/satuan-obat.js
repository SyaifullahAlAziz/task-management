var counter = 1;

function tambahSatuan() {
    counter += 1;

    // Buat elemen div baru untuk row baru
    var newRow = document.createElement('div');
    newRow.classList.add('row', 'mt-4');
    newRow.id = 'satuanId' + counter;

    // Tambahkan konten HTML untuk row baru
    newRow.innerHTML = `
        <div class="col-lg">
            <div class="mb-3">
                <label>Nama Satuan Obat
                    <span class="text-danger">*</span>
                </label>
                <input type="text" name="nama_satuan[]"
                    class="form-control"
                    placeholder="Masukan Satuan Obat">
            </div>
        </div>
        <div class="col-lg-1">
            <div class="mt-1">
                <br>
                <button type="button" class="btn btn-danger" id="button${counter}" onclick="hapusSatuan(this);">
                    <i class="fa fa-times"></i>
                </button>
            </div>
        </div>
    `;

    // Tambahkan row baru ke dalam formulir
    var form = document.getElementById("satuanForm");
    form.appendChild(newRow);
}

function hapusSatuan(button) {
    var buttonId = button.id;
    var number = buttonId.replace("button", ""); // Ekstrak nomor dari ID tombol
    var row = document.getElementById('satuanId' + number);
    if (row) {
        row.remove();
    }
}
