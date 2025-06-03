<?php
header('Content-Type: application/json');
require __DIR__.'/../dbConnect.php';

// Custom error handler to return JSON errors
set_exception_handler(function($e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    exit;
});
set_error_handler(function($errno, $errstr, $errfile, $errline) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => "$errstr in $errfile on line $errline"]);
    exit;
});

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    echo json_encode(['success' => false, 'message' => 'No data received or JSON invalid.']);
    exit;
}

// Sanitize and prepare class data
$id_alumno = !empty($data['id_alumno']) ? intval($data['id_alumno']) : null;
$id_bono = !empty($data['id_bono']) ? intval($data['id_bono']) : null;
$id_profesor = !empty($data['id_profesor']) ? intval($data['id_profesor']) : null;
$asignatura = isset($data['asignatura']) ? trim($data['asignatura']) : null;
$modalidad = isset($data['modalidad']) ? trim($data['modalidad']) : null;
$fecha = !empty($data['fecha']) ? $data['fecha'] : null;

if (!$id_alumno || !$id_bono || !$id_profesor || !$fecha) {
    echo json_encode(['success' => false, 'message' => 'Faltan campos obligatorios.']);
    exit;
}

try {
    $stmt = $connection->prepare(
        "INSERT INTO clasesparticulares (id_bono, id_profesor, asignatura, modalidad, fechaHora) VALUES (?, ?, ?, ?, ?)"
    );
    if (!$stmt) throw new Exception($connection->error);

    $stmt->bind_param(
        'iisss',
        $id_bono,
        $id_profesor,
        $asignatura,
        $modalidad,
        $fecha
    );

    if (!$stmt->execute()) {
        $error = [
            'error' => $stmt->error,
            'errno' => $stmt->errno,
            'sqlstate' => $stmt->sqlstate,
            'params' => [
                $id_alumno, $id_bono, $id_profesor, $asignatura, $modalidad, $fecha
            ]
        ];
        throw new Exception(json_encode($error));
    }

    $id_clase = $stmt->insert_id;
    $stmt->close();

    echo json_encode(['success' => true, 'id' => $id_clase]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
$connection->close();
