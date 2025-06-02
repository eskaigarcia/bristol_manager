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

// Sanitize and prepare relation data
$id_alumno1 = !empty($data['id_alumno1']) ? intval($data['id_alumno1']) : null;
$id_alumno2 = !empty($data['id_alumno2']) ? intval($data['id_alumno2']) : null;
$fechaInicio = !empty($data['fechaInicio']) ? $data['fechaInicio'] : null;
$tipoRelacion = !empty($data['tipoRelacion']) ? trim($data['tipoRelacion']) : null;

// Validate tipoRelacion
if (!in_array($tipoRelacion, ['amigo', 'familiar'], true)) {
    echo json_encode(['success' => false, 'message' => 'Tipo de relación inválido.']);
    exit;
}

try {
    $stmt = $connection->prepare(
        "INSERT INTO relaciones (id_alumno1, id_alumno2, fechaInicio, tipoRelacion) VALUES (?, ?, ?, ?)"
    );
    if (!$stmt) throw new Exception($connection->error);
    $stmt->bind_param('iiss', $id_alumno1, $id_alumno2, $fechaInicio, $tipoRelacion);
    if (!$stmt->execute()) {
        $error = [
            'error' => $stmt->error,
            'errno' => $stmt->errno,
            'sqlstate' => $stmt->sqlstate,
            'params' => [
                $id_alumno1, $id_alumno2, $fechaInicio, $tipoRelacion
            ]
        ];
        throw new Exception(json_encode($error));
    }
    $id_relacion = $stmt->insert_id;
    $stmt->close();

    echo json_encode(['success' => true, 'id' => $id_relacion]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
$connection->close();
