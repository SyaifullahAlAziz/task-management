var loketCounter = 1;
var maxLoket = 5;

function tambahLoket() {
    if (loketCounter >= maxLoket) {
        alert("Maksimal hanya boleh " + maxLoket + " loket!");
        return;
    }

    loketCounter += 1;

    // Buat elemen div baru untuk baris Loket
    var newRow = document.createElement('div');
    newRow.classList.add('row', 'mt-4');
    newRow.id = 'loketId' + loketCounter;

    // HTML konten untuk row baru
    newRow.innerHTML = `
        <div class="col-lg">
            <div class="mb-3">
                <label>Kode Loket
                    <span class="text-danger">*</span>
                </label>
                <input type="text" name="kode_loket[]" class="form-control" placeholder="Masukan kode loket" style="width: 100%">
            </div>
        </div>
        <div class="col-lg">
            <div class="mb-3">
                <label>Nama Loket
                    <span class="text-danger">*</span>
                </label>
                <input type="text" name="nama_loket[]" class="form-control" placeholder="Masukan Nama Loket" style="width: 100%">
            </div>
        </div>
        <div class="col-lg-1">
            <div class="mt-1">
                <br>
                <button type="button" class="btn btn-danger" id="button${loketCounter}" onclick="hapusLoket(this);">
                    <i class="fa fa-times"></i>
                </button>
            </div>
        </div>
    `;

    // Tambahkan row baru ke dalam form Loket
    var form = document.getElementById("loketForm");
    form.appendChild(newRow);
}

function hapusLoket(button) {
    var buttonId = button.id;
    var number = buttonId.replace("button", ""); // Mengambil nomor dari button ID
    var row = document.getElementById('loketId' + number);
    if (row) {
        row.remove();
        loketCounter -= 1; // kurangi counter kalau dihapus
    }
}
