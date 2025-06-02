<?php
header('Content-Type: application/json');
require __DIR__.'/../dbConnect.php';

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    echo json_encode(['success' => false, 'message' => 'No data received or JSON invalid.']);
    exit;
}

// Sanitize and assign variables
$id_alumno = isset($data['id_alumno']) ? intval($data['id_alumno']) : null;
$cantidadClases = isset($data['cantidadClases']) ? intval($data['cantidadClases']) : null;
$caducidad = !empty(trim($data['caducidad'] ?? '')) ? trim($data['caducidad']) : null;
$precioTotal = isset($data['precioTotal']) ? floatval($data['precioTotal']) : null;
$fechaPago = !empty(trim($data['fechaPago'] ?? '')) ? trim($data['fechaPago']) : null;
$metodoPago = !empty(trim($data['metodoPago'] ?? '')) ? trim($data['metodoPago']) : null;

try {
    $stmt = $connection->prepare(
        "INSERT INTO bonos 
            (id_alumno, cantidadClases, caducidad, precioTotal, fechaPago, metodoPago)
         VALUES (?, ?, ?, ?, ?, ?)"
    );
    if (!$stmt) throw new Exception($connection->error);

    $stmt->bind_param(
        'iisdss',
        $id_alumno,
        $cantidadClases,
        $caducidad,
        $precioTotal,
        $fechaPago,
        $metodoPago
    );

    if (!$stmt->execute()) throw new Exception($stmt->error);

    $id_bono = $stmt->insert_id;
    $stmt->close();

    echo json_encode(['success' => true, 'id_bono' => $id_bono]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
$connection->close();
