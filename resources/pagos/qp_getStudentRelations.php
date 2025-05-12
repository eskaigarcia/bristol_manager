<?php
require_once __DIR__ . '/../dbConnect.php';

$q = isset($_GET['q']) ? mysqli_real_escape_string($connection, $_GET['q']) : '';
$results = [];

if ($q !== '') {
    $sql = "SELECT * FROM relaciones WHERE id_alumno1 = $q OR id_alumno2 = $q";
    $res = mysqli_query($connection, $sql);

    if ($res) {
        while ($row = mysqli_fetch_assoc($res)) {
            // Return id and full name
            $results[] = [
                'id_relacion' => $row['id_relacion'],
                'id_alumno1' => $row['id_alumno1'],
                'id_alumno2' => $row['id_alumno2'],
                'fechaInicio' => $row['fechaInicio'],
                'fechaFin' => $row['fechaFin'],
                'tipoRelacion' => $row['tipoRelacion'],
            ];
        }
        header('Content-Type: application/json');
        echo json_encode(['results' => $results]);
        exit;
    } else {
        // Query error
        http_response_code(500);
        header('Content-Type: application/json');
        echo json_encode(['error' => mysqli_error($connection)]);
        exit;
    }
}

// If no query provided, return empty results
header('Content-Type: application/json');
echo json_encode(['results' => []]);