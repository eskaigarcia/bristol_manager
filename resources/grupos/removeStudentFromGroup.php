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

if (!$data || !isset($data['id_alumno']) || !isset($data['id_grupo'])) {
    echo json_encode(['success' => false, 'message' => 'Datos incompletos.']);
    exit;
}

$id_alumno = intval($data['id_alumno']);
$id_grupo = intval($data['id_grupo']);

// Calculate yesterday's date
$yesterday = date('Y-m-d', strtotime('-1 day'));

try {
    $stmt = $connection->prepare("UPDATE alumnosgrupos SET fechaFin = ? WHERE id_alumno = ? AND id_grupo = ?");
    if (!$stmt) throw new Exception($connection->error);
    $stmt->bind_param('sii', $yesterday, $id_alumno, $id_grupo);
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
