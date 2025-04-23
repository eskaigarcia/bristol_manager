<?php
header('Content-Type: application/json');

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Include database connection
require __DIR__.'/../dbConnect.php';

// Get the JSON input
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Log the received data for debugging
if (!$data) {
    echo json_encode([
        'success' => false,
        'message' => 'No data received or JSON is invalid.',
        'raw_input' => $input,
        'json_last_error' => json_last_error_msg()
    ]);
    exit;
}

if (
    !isset($data['id']) ||
    !isset($data['contact_name']) ||
    !isset($data['contact_phone']) ||
    !isset($data['contact_relation']) ||
    !isset($data['contact'])
) {
    echo json_encode([
        'success' => false,
        'message' => 'All fields are required.',
        'received_data' => $data
    ]);
    exit;
}

// Use the correct keys from the JS form
$id_alumno = $data['id'];
$nombre = $data['contact_name'];
$telefono = $data['contact_phone'];
$relacion = $data['contact_relation'];
$id_contacto = $data['contact'];

try {
    $stmt = $connection->prepare(
        "UPDATE contactosemergencia SET id_alumno = ?, nombre = ?, telefono = ?, relacion = ? WHERE id_contacto = ?"
    );
    if (!$stmt) {
        echo json_encode([
            'success' => false,
            'message' => 'Prepare failed.',
            'error' => $connection->error
        ]);
        exit;
    }
    $stmt->bind_param('isssi', $id_alumno, $nombre, $telefono, $relacion, $id_contacto);

    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Failed to update emergency contact.',
            'error' => $stmt->error
        ]);
    }

    $stmt->close();
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}

$connection->close();