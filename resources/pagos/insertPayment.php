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
$tipoPago = !empty(trim($data['tipoPago'] ?? '')) ? trim($data['tipoPago']) : '';
$descripcion = !empty(trim($data['descripcion'] ?? '')) ? trim($data['descripcion']) : '';
$mesesPagados = isset($data['mesesPagados']) && is_array($data['mesesPagados']) ? json_encode($data['mesesPagados']) : null;
$fechaPago = !empty(trim($data['fechaPago'] ?? '')) ? trim($data['fechaPago']) : null;
$metodoPago = !empty(trim($data['metodoPago'] ?? '')) ? trim($data['metodoPago']) : null;
$precioTotal = isset($data['precioTotal']) ? floatval($data['precioTotal']) : null;
$descuentoCalculado = isset($data['descuentoCalculado']) ? floatval($data['descuentoCalculado']) : 0;
$descuentoExtra = isset($data['descuentoExtra']) ? floatval($data['descuentoExtra']) : 0;
$conceptoDescuento = !empty(trim($data['conceptoDescuento'] ?? '')) ? trim($data['conceptoDescuento']) : null;

try {
    $stmt = $connection->prepare(
        "INSERT INTO pagos 
            (id_alumno, tipoPago, mesesPagados, descripcion, fechaPago, metodoPago, precioTotal, descuentoCalculado, descuentoExtra, conceptoDescuento)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    );
    if (!$stmt) throw new Exception($connection->error);

    $stmt->bind_param(
        'isssssddds',
        $id_alumno,
        $tipoPago,
        $mesesPagados,
        $descripcion,
        $fechaPago,
        $metodoPago,
        $precioTotal,
        $descuentoCalculado,
        $descuentoExtra,
        $conceptoDescuento
    );

    if (!$stmt->execute()) throw new Exception($stmt->error);

    $id_pago = $stmt->insert_id;
    $stmt->close();

    echo json_encode(['success' => true, 'id_pago' => $id_pago]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
$connection->close();
