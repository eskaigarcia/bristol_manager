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

// Validate that all fields are present and not empty
if (
    empty($data['id']) ||
    empty($data['contact_name']) ||
    empty($data['contact_phone']) ||
    empty($data['contact_relation'])
) {
    echo json_encode([
        'success' => false,
        'message' => 'All fields are required and must not be empty.',
        'received_data' => $data
    ]);
    exit;
}

// Sanitize and type-cast input
$id_alumno = intval($data['id']);
$nombre = trim($data['contact_name']);
$telefono = trim($data['contact_phone']);
$relacion = trim($data['contact_relation']);

try {
    // Check if connection variable exists and is valid
    if (!isset($connection) || !$connection) {
        echo json_encode([
            'success' => false,
            'message' => 'Database connection failed.'
        ]);
        exit;
    }

    $stmt = $connection->prepare("INSERT INTO contactosemergencia (id_alumno, nombre, telefono, relacion) VALUES (?, ?, ?, ?)");
    if (!$stmt) {
        echo json_encode([
            'success' => false,
            'message' => 'Prepare failed.',
            'error' => $connection->error
        ]);
        exit;
    }
    $stmt->bind_param('isss', $id_alumno, $nombre, $telefono, $relacion);

    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
        $stmt->close();
        $connection->close();
        exit;
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Failed to create emergency contact.',
            'error' => $stmt->error
        ]);
        $stmt->close();
        $connection->close();
        exit;
    }
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
    if (isset($stmt) && $stmt) $stmt->close();
    if (isset($connection) && $connection) $connection->close();
    exit;
}