<?php
header('Content-Type: application/json');
require __DIR__.'/../dbConnect.php';

// Error handlers
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

// Get input
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data || !isset($data['id_alumno']) || !isset($data['id_grupo']) || !isset($data['fechaInicio'])) {
    echo json_encode(['success' => false, 'message' => 'Datos incompletos.']);
    exit;
}

$id_alumno = intval($data['id_alumno']);
$id_grupo = intval($data['id_grupo']);
$fechaInicio = $data['fechaInicio'];

try {
    $stmt = $connection->prepare("INSERT INTO alumnosgrupos (id_alumno, id_grupo, fechaInicio) VALUES (?, ?, ?)");
    if (!$stmt) throw new Exception($connection->error);
    $stmt->bind_param('iis', $id_alumno, $id_grupo, $fechaInicio);
    if (!$stmt->execute()) {
        throw new Exception($stmt->error);
    }
    $stmt->close();
    echo json_encode(['success' => true]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
$connection->close();
