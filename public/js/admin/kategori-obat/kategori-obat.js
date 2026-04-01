var counter = 1;

function tambahKategori() {
    counter += 1;

    // Membuat elemen div baru untuk row kategori
    var newRow = document.createElement('div');
    newRow.classList.add('row', 'mt-4');
    newRow.id = 'kategoriId' + counter;

    // Menambahkan HTML untuk elemen baru
    newRow.innerHTML = `
        <div class="col-lg">
            <div class="mb-3">
                <label>Nama Kategori Obat
                    <span class="text-danger">*</span>
                </label>
                <input type="text" name="nama_kategori_obat[]" class="form-control" placeholder="Masukan Kategori Obat">
            </div>
        </div>
        <div class="col-lg-1">
            <div class="mt-1">
                <br>
                <button type="button" class="btn btn-danger" id="button${counter}" onclick="hapusKategori(this);">
                    <i class="fa fa-times"></i>
                </button>
            </div>
        </div>
    `;

    // Menambahkan row baru ke dalam form
    var form = document.getElementById("kategoriForm");
    form.appendChild(newRow);
}

function hapusKategori(button) {
    var buttonId = button.id;
    var number = buttonId.replace("button", ""); // Mengambil angka dari ID button
    var row = document.getElementById('kategoriId' + number);
    if (row) {
        row.remove();
    }
}
