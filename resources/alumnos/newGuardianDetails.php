<?php
// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');

// Include database connection
require __DIR__.'/../dbConnect.php';

// Get the JSON input
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!isset($data['id'])) {
    echo json_encode(['success' => false, 'message' => 'Student ID is required.']);
    exit;
}

$id = $data['id'] ?? null;
$nombre = !empty($data['nombre']) ? $data['nombre'] : null;
$apellidos = !empty($data['apellidos']) ? $data['apellidos'] : null;
$dni = !empty($data['dni']) ? $data['dni'] : null;
$telefono = !empty($data['telefono']) ? $data['telefono'] : null;
$email = !empty($data['email']) ? $data['email'] : null;
$direccion = !empty($data['direccion']) ? $data['direccion'] : null;
$codigo_postal = !empty($data['codigo_postal']) ? $data['codigo_postal'] : null;
$localidad = !empty($data['localidad']) ? $data['localidad'] : null;
$iban = !empty($data['iban']) ? $data['iban'] : null;

try {
    // FIX: Remove extra comma before WHERE and use correct parameter types
    $stmt = $connection->prepare("INSERT INTO responsables (nombre, apellidos, dni, telefono, email, direccion, cp, localidad, iban, id_alumno) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    if (!$stmt) {
        throw new Exception("Prepare failed: " . $connection->error);
    }
    $stmt->bind_param(
        'sssssssssi',
        $nombre,
        $apellidos,
        $dni,
        $telefono,
        $email,
        $direccion,
        $codigo_postal,
        $localidad,
        $iban,
        $id
    );

    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to update guardian details: ' . $stmt->error]);
    }

    $stmt->close();
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}

$connection->close();