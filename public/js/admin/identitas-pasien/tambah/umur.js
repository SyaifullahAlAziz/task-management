// Fungsi untuk menghitung umur
function hitungUmur() {
    var dob = document.getElementById('tanggalLahir').value; // Ambil tanggal lahir dari input
    var today = new Date(); // Tanggal hari ini
    var birthDate = new Date(dob); // Tanggal lahir
    var age = today.getFullYear() - birthDate.getFullYear(); // Hitung umur
    var monthDiff = today.getMonth() - birthDate.getMonth(); // Perbedaan bulan
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--; // Kurangi umur jika belum ulang tahun
    }
    document.getElementById('umur').value = age; // Set nilai umur pada input umur
}

// Panggil fungsi hitungUmur() saat tanggal lahir diubah
document.getElementById('tanggalLahir').addEventListener('change', hitungUmur);
