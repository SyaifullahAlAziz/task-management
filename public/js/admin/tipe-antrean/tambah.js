var tipeAntreanCounter = 1;
var maxTipeAntrean = 5;

function tambahTipeAntrean() {
    if (tipeAntreanCounter >= maxTipeAntrean) {
        alert("Maksimal hanya boleh " + maxTipeAntrean + " tipe antrean!");
        return;
    }

    tipeAntreanCounter += 1;

    // Buat elemen div baru untuk baris tipe antrean
    var newRow = document.createElement("div");
    newRow.classList.add("row", "mt-4");
    newRow.id = "tipeAntreanId" + tipeAntreanCounter;

    // HTML konten untuk row baru
    newRow.innerHTML = `
        <div class="col-lg">
            <div class="mb-3">
                <label>Kode Tipe Antrean
                    <span class="text-danger">*</span>
                </label>
                <input type="text" name="kode_tipe[]" class="form-control" placeholder="Masukan Kode Tipe Antrean">
            </div>
        </div>
        <div class="col-lg">
            <div class="mb-3">
                <label>Nama Tipe Antrean
                    <span class="text-danger">*</span>
                </label>
                <input type="text" name="nama_tipe[]" class="form-control" placeholder="Masukan Nama Tipe Antrean">
            </div>
        </div>
        <div class="col-lg-1">
            <div class="mt-1">
                <br>
                <button type="button" class="btn btn-danger" id="button${tipeAntreanCounter}" onclick="hapusTipeAntrean(this);">
                    <i class="fa fa-times"></i>
                </button>
            </div>
        </div>
    `;

    // Tambahkan row baru ke dalam form tipe antrean
    var form = document.getElementById("tipeAntreanForm");
    form.appendChild(newRow);
}

function hapusTipeAntrean(button) {
    var buttonId = button.id;
    var number = buttonId.replace("button", ""); // Mengambil nomor dari button ID
    var row = document.getElementById("tipeAntreanId" + number);
    if (row) {
        row.remove();
        tipeAntreanCounter -= 1; // kurangi counter kalau dihapus
    }
}
