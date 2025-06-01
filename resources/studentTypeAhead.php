<?php
require_once __DIR__ . '/dbConnect.php';

$q = isset($_GET['q']) ? mysqli_real_escape_string($connection, $_GET['q']) : '';
$results = [];

if ($q !== '') {
    $sql = "SELECT id_alumno, nombre, apellidos FROM alumnos WHERE CONCAT(nombre, ' ', apellidos) LIKE '%$q%' LIMIT 15";
    $res = mysqli_query($connection, $sql);

    if ($res) {
        while ($row = mysqli_fetch_assoc($res)) {
            // Return id and full name
            $results[] = [
                'id_alumno' => $row['id_alumno'],
                'nombre_completo' => $row['nombre'] . ' ' . $row['apellidos']
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