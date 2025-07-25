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

// Only require 'id_alumno'
if (!isset($data['id_alumno'])) {
    echo json_encode([
        'success' => false,
        'message' => 'Contact id is required.',
        'received_data' => $data
    ]);
    exit;
}

$id_alumno = $data['id_alumno'];

try {
    $stmt = $connection->prepare(
        "DELETE FROM responsables WHERE id_alumno = ?"
    );
    if (!$stmt) {
        echo json_encode([
            'success' => false,
            'message' => 'Prepare failed.',
            'error' => $connection->error
        ]);
        exit;
    }
    $stmt->bind_param('i', $id_alumno);

    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Failed to delete guardian.',
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