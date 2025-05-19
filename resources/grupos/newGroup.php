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

// Sanitize and prepare group data
$nombre_grupo = !empty(trim($data['nombre_grupo'] ?? '')) ? trim($data['nombre_grupo']) : null;
$id_profesor = !empty($data['id_profesor']) ? intval($data['id_profesor']) : null;
$modalidad = !empty(trim($data['modalidad'] ?? '')) ? trim($data['modalidad']) : null;
$precio = isset($data['precio']) ? floatval($data['precio']) : null;
$esIntensivo = !empty($data['esIntensivo']) ? intval($data['esIntensivo']) : 0;
$fecha = !empty($data['fecha']) ? $data['fecha'] : null;
$horasSemanales = isset($data['horasSemanales']) ? floatval($data['horasSemanales']) : null;
$horario = !empty($data['horario']) ? $data['horario'] : null;

try {
    // Insert group
    $stmt = $connection->prepare("INSERT INTO grupos (nombre, id_profesor, modalidad, precio, esIntensivo, creacion, horasSemanales, horario) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    if (!$stmt) throw new Exception($connection->error);
    $stmt->bind_param(
        'sisdisss',
        $nombre_grupo, $id_profesor, $modalidad, $precio, $esIntensivo, $fecha, $horasSemanales, $horario
    );
    if (!$stmt->execute()) {
        $error = [
            'error' => $stmt->error,
            'errno' => $stmt->errno,
            'sqlstate' => $stmt->sqlstate,
            'params' => [
                $nombre_grupo, $id_profesor, $modalidad, $precio, 
                $esIntensivo, $fecha, $horasSemanales, $horario
            ]
        ];
        throw new Exception(json_encode($error));
    }
    $id_grupo = $stmt->insert_id;
    $stmt->close();

    echo json_encode(['success' => true, 'id' => $id_grupo]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
$connection->close();
