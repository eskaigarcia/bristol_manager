<?php
require_once __DIR__ . '/../dbConnect.php';

header('Content-Type: application/json'); // Always set JSON header

$q = isset($_GET['q']) ? mysqli_real_escape_string($connection, $_GET['q']) : '';
$results = [];
$esAmonestado = null;

if ($q !== '') {
    // First query to get the relations
    $sql_relations = "SELECT r.* 
                      FROM relaciones r 
                      WHERE r.id_alumno1 = $q OR r.id_alumno2 = $q";
    $res_relations = mysqli_query($connection, $sql_relations);

    if ($res_relations) {
        while ($row = mysqli_fetch_assoc($res_relations)) {
            $results[] = [
                'id_relacion' => $row['id_relacion'],
                'id_alumno1' => $row['id_alumno1'],
                'id_alumno2' => $row['id_alumno2'],
                'fechaInicio' => $row['fechaInicio'],
                'fechaFin' => $row['fechaFin'],
                'tipoRelacion' => $row['tipoRelacion'],
            ];
        }
    } else {
        http_response_code(500);
        echo json_encode(['error' => mysqli_error($connection)]);
        exit;
    }

    // Second query to get the esAmonestado value
    $sql_esAmonestado = "SELECT a.esAmonestado 
                         FROM alumnos a 
                         WHERE a.id_alumno = $q";
    $res_esAmonestado = mysqli_query($connection, $sql_esAmonestado);

    if ($res_esAmonestado) {
        $row = mysqli_fetch_assoc($res_esAmonestado);
        if ($row) {
            $esAmonestado = $row['esAmonestado'];
        }
    } else {
        http_response_code(500);
        echo json_encode(['error' => mysqli_error($connection)]);
        exit;
    }

    echo json_encode([
        'results' => $results,
        'esAmonestado' => $esAmonestado
    ]);
    exit;
}

// If no query provided, return empty results
echo json_encode(['results' => [], 'esAmonestado' => null]);