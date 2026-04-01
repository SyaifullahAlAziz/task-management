var edukasiCounter = 1;

function tambahEdukasi() {
    edukasiCounter += 1;

    // Membuat elemen div baru untuk baris edukasi
    var newEdukasiRow = document.createElement("div");
    newEdukasiRow.classList.add("row", "mt-4");
    newEdukasiRow.id = "edukasiId" + edukasiCounter;

    // Membuat konten HTML untuk baris baru
    newEdukasiRow.innerHTML = `
            <div class="col-lg-6">
                <div class="mb-3">
                    <label>Edukasi
                        <span class="text-danger">*</span>
                    </label>
                    <input type="text" name="edukasi[]"
                        class="form-control"
                        placeholder="Masukan Edukasi">
                </div>
            </div>
            <div class="col-lg-5">
                <div class="mb-3">
                    <label>Tujuan
                        <span class="text-danger">*</span>
                    </label>
                    <input type="text" name="tujuan[]"
                        class="form-control"
                        placeholder="Masukan tujuan">
                </div>
            </div>
            <div class="col-lg-1">
                <div class="mb-3"></div>
                <button type="button" class="btn btn-danger mt-3" id="button${edukasiCounter}" onclick="hapusEdukasi(this)">
                    <i class="fa fa-times"></i>
                </button>
            </div>
        `;

    // Menambahkan baris baru ke dalam form
    var form = document.getElementById("edukasiForm");
    form.appendChild(newEdukasiRow);
}

function hapusEdukasi(button) {
    var buttonId = button.id;
    var number = buttonId.replace("button", ""); // Mengambil nomor dari ID tombol
    var row = document.getElementById("edukasiId" + number);
    if (row) {
        row.remove();
    }
}
