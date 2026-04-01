var counterGolongan = 1;

function tambahGolongan() {
    counterGolongan += 1;

    // Membuat elemen div baru untuk row golongan obat
    var newRow = document.createElement("div");
    newRow.classList.add("row", "mt-4");
    newRow.id = "golonganId" + counterGolongan;

    // Menambahkan HTML untuk elemen baru
    newRow.innerHTML = `
        <div class="col-lg">
            <div class="mb-3">
                <label>Nama Golongan Obat
                    <span class="text-danger">*</span>
                </label>
                <input type="text" name="nama_golongan_obat[]" class="form-control" placeholder="Masukan Golongan Obat">
            </div>
        </div>
        <div class="col-lg-1">
            <div class="mt-1">
                <br>
                <button type="button" class="btn btn-danger" id="buttonGolongan${counterGolongan}" onclick="hapusGolongan(this);">
                    <i class="fa fa-times"></i>
                </button>
            </div>
        </div>
    `;

    // Menambahkan row baru ke dalam form
    var form = document.getElementById("golonganForm");
    form.appendChild(newRow);
}

function hapusGolongan(button) {
    var buttonId = button.id;
    var number = buttonId.replace("buttonGolongan", ""); // Mengambil angka dari ID button
    var row = document.getElementById("golonganId" + number);
    if (row) {
        row.remove();
    }
}
