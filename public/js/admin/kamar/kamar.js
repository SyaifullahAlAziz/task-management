var counter = 1;

function tambahKamar() {
    counter += 1;

    // Membuat elemen div baru untuk baris baru
    var newRow = document.createElement("div");
    newRow.classList.add("row", "mt-4");
    newRow.id = "kamarId" + counter;

    // Membuat isi HTML untuk baris baru
    newRow.innerHTML = `
        <div class="col-lg">
            <div class="mb-3">
                <label>Kode Kamar
                    <span class="text-danger">*</span>
                </label>
                <input type="text" name="kode_kamar[]" class="form-control" placeholder="Masukan Kode Kamar">
            </div>
        </div>
        <div class="col-lg">
            <div class="mb-3">
                <label>Nama Kamar
                    <span class="text-danger">*</span>
                </label>
                <input type="text" name="nama_kamar[]" class="form-control" placeholder="Masukan Nama Kamar">
            </div>
        </div>
        <div class="col-lg-1">
            <div class="mt-1">
                <br>
                <button type="button" class="btn btn-danger" id="button${counter}" onclick="hapusKamar(this);">
                    <i class="fa fa-times"></i>
                </button>
            </div>
        </div>
    `;

    // Menambahkan baris baru ke form
    var form = document.getElementById("kamarForm");
    form.appendChild(newRow);
}

function hapusKamar(button) {
    var buttonId = button.id;
    var number = buttonId.replace("button", ""); // Mendapatkan nomor dari ID button
    var row = document.getElementById("kamarId" + number);
    if (row) {
        row.remove();
    }
}
