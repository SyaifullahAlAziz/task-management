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
                <th>No.Rekam Medis</th>
                <th>Nama Pasien</th>
                <th>Tempat Lahir</th>
                <th>Tanggal Lahir</th>
                <th>Jenis Kelamin</th>
                <th>Keterangan</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($pasien as $item)
                <tr>
                    <td>{{ $loop->iteration }}</td>
                    <td>{{ $item->no_rkm_medis }}</td>
                    <td>{{ $item->nm_pasien }}</td>
                    <td>{{ $item->tmp_lahir }}</td>
                    <td>{{ date('d-m-Y', strtotime($item->tgl_lahir)) }}</td>
                    <td>{{ $item->jk }}</td>
                    <td>{{ $item->keterangan }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>
