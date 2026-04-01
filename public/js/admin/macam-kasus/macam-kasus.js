var kasusCounter = 1;

function tambahMacam() {
    kasusCounter += 1;

    // Membuat elemen div baru untuk baris kasus
    var newKasusRow = document.createElement("div");
    newKasusRow.classList.add("row", "mt-4");
    newKasusRow.id = "macamId" + kasusCounter;

    // Membuat konten HTML untuk baris baru
    newKasusRow.innerHTML = `
            <div class="col-lg">
                <div class="mb-3">
                    <label>Nama Macam Kasus
                        <span class="text-danger">*</span>
                    </label>
                    <input type="text" name="nama_kasus[]"
                        class="form-control"
                        placeholder="Masukan Nama Macam Kasus">
                </div>
            </div>
            <div class="col-lg-1">
                <div class="mb-3"></div>
                <button type="button" class="btn btn-danger mt-3" id="button${kasusCounter}" onclick="hapusMacam(this)">
                    <i class="fa fa-times"></i>
                </button>
            </div>
        `;

    // Menambahkan baris baru ke dalam form
    var form = document.getElementById("macamForm");
    form.appendChild(newKasusRow);
}

function hapusMacam(button) {
    var buttonId = button.id;
    var number = buttonId.replace("button", ""); // Mengambil nomor dari ID tombol
    var row = document.getElementById("macamId" + number);
    if (row) {
        row.remove();
    }
}
