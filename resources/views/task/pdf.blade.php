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
                <th>Tanggal</th>
                <th>Id Level</th>
                <th>Nama Level</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($level as $item)
            <tr>
                <td>{{ $loop->iteration }}</td>
                <td>{{ date('d-m-Y',strtotime($item->created_at)) }}</td>
                <td>{{ $item->id_level }}</td>
                <td>{{ $item->namalevel }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>
