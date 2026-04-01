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
                <th>Nama Auditor</th>
                <th>Keterangan</th>
                <th>Komentar</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($auditor as $item)
            <tr>
                <td>{{ $loop->iteration }}</td>
                <td>{{ $item->nm_auditor }}</td>
                <td>{{ $item->keterangan }}</td>
                <td>{{ $item->komentar }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>
