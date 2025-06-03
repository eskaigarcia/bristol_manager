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

// Accept both 'nombre' and 'name' for compatibility
$nombre = null;
if (!empty(trim($data['nombre'] ?? ''))) {
    $nombre = trim($data['nombre']);
} elseif (!empty(trim($data['name'] ?? ''))) {
    $nombre = trim($data['name']);
}

if (!$nombre) {
    // Debug: show what was received
    echo json_encode([
        'success' => false,
        'message' => 'El nombre del profesor es obligatorio.',
        'received' => $data
    ]);
    exit;
}

try {
    // Insert teacher
    $stmt = $connection->prepare("INSERT INTO profesores (nombre) VALUES (?)");
    if (!$stmt) throw new Exception($connection->error);
    $stmt->bind_param('s', $nombre);
    if (!$stmt->execute()) {
        $error = [
            'error' => $stmt->error,
            'errno' => $stmt->errno,
            'sqlstate' => $stmt->sqlstate,
            'params' => [$nombre]
        ];
        throw new Exception(json_encode($error));
    }
    $id_profesor = $stmt->insert_id;
    $stmt->close();

    echo json_encode(['success' => true, 'id' => $id_profesor]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
$connection->close();
