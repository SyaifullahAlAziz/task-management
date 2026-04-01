<!DOCTYPE html>
<html>

<head>
    <title>PDF Export</title>
</head>

<body>
    <h1>{{ $title }}</h1>

    <table border="1" style="border-collapse: collapse; width:100%; text-align:center;">
        <thead>
            <tr>
                <th>No</th>
                <th>Tanggal Audit</th>
                <th>Periode</th>
                <th>Tahun</th>
                <th>Nama Lokasi</th>
                <th>Nama Auditor</th>
                <th>Nama Petugas</th>
                <th>Petugas Kebersihan</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($kebersihan as $item)
            <tr>
                <td>{{ $loop->iteration }}</td>
                <td>{{ $item->tgl_audit }}</td>
                <td>{{ $item->periode }}</td>
                <td>{{ $item->tahun }}</td>
                <td>{{ $item->nm_lokasi }}</td>
                <td>{{ $item->nm_auditor }}</td>
                <td>{{ $item->nama_petugas }}</td>
                <td>{{ $item->nm_petugas }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>
