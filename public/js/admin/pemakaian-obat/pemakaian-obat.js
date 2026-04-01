var counter = 1;

function tambahPemakaianObat() {
    counter += 1;

    var newRow = document.createElement('div');
    newRow.classList.add('row', 'mt-4');
    newRow.id = 'pemakaianObatId' + counter;

    newRow.innerHTML = `
        <div class="col-lg">
            <div class="mb-3">
                <label>Pemakaian Obat <span class="text-danger">*</span></label>
                <input type="text" name="pemakaian[]" class="form-control" placeholder="Masukan Pemakaian Obat">
            </div>
        </div>
        <div class="col-lg-1">
            <div class="mt-1">
                <br>
                <button type="button" class="btn btn-danger" onclick="hapusPemakaianObat(this)">
                    <i class="fa fa-times"></i>
                </button>
            </div>
        </div>
    `;

    var form = document.getElementById("pemakaianObatForm");
    form.appendChild(newRow);
}

function hapusPemakaianObat(button) {
    var row = button.closest('.row');
    row.remove();
}
