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
                <th>Nama Level</th>
                <th>Nama Lengkap</th>
                <th>Username</th>
                <th>Email</th>
                <th>Password</th>
                <th>Foto Profil</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($user as $item)
            <tr>
                <td>{{ $loop->iteration }}</td>
                <td>{{ $item->level->namalevel ?? '-' }}</td>
                <td>{{ $item->name }}</td>
                <td>{{ $item->username }}</td>
                <td>{{ $item->email }}</td>
                <td>{{ $item->duplicate }}</td>
                <td><img src="{{ $item->foto_path }}" width="100px" alt=""></td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html> 
