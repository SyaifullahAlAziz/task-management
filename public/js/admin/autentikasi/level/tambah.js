var counter = 1;
var maxFields = 5;

function tambahAutentikasi() {
    if (counter >= maxFields) {
        alert("Maksimal hanya bisa menambahkan " + maxFields + " data autentikasi.");
        return; // stop di sini
    }

    counter += 1;

    var newRow = document.createElement('div');
    newRow.classList.add('row', 'mt-4');
    newRow.id = 'autentikasiId' + counter;

    newRow.innerHTML = `
        <div class="col-lg">
            <div class="mb-3">
                <label>ID Status <span class="text-danger">*</span></label>
                <input type="text" name="id_level[]" class="form-control" placeholder="Masukan ID Status Autentikasi" style="width: 100%;">
            </div>
        </div>
        <div class="col-lg">
            <div class="mb-3">
                <label>Status Autentikasi <span class="text-danger">*</span></label>
                <input type="text" name="namalevel[]" class="form-control" placeholder="Masukan Nama Status Autentikasi" style="width: 100%;">
            </div>
        </div>
        <div class="col-lg-1">
            <div class="mt-1">
                <br>
                <button type="button" class="btn btn-danger" id="button${counter}" onclick="hapusAutentikasi(this);">
                    <i class="fa fa-times"></i>
                </button>
            </div>
        </div>
    `;

    var form = document.getElementById("autentikasiForm");
    form.appendChild(newRow);
}

function hapusAutentikasi(button) {
    var buttonId = button.id;
    var number = buttonId.replace("button", "");
    var row = document.getElementById('autentikasiId' + number);
    if (row) {
        row.remove();
        counter--; // kurangi counter ketika row dihapus
    }
}
