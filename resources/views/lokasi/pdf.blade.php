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
                <th>Nama Lokasi</th>
                <th>Keterangan</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($lokasi as $item)
            <tr>
                <td>{{ $loop->iteration }}</td>
                <td>{{ $item->nm_lokasi }}</td>
                <td>{{ $item->keterangan }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>
