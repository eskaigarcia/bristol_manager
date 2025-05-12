<?php
require_once __DIR__ . '/../dbConnect.php';

if (!$connection) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

// Get id_alumno from query string
$id_alumno = isset($_GET['q']) ? intval($_GET['q']) : 0;
if ($id_alumno <= 0) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing or invalid id_alumno']);
    exit;
}

// Update alumnos table to set esAmonestado = '0' for the given id_alumno
$updateQuery = "UPDATE alumnos SET esAmonestado = '0' WHERE id_alumno = ?";
$updateStmt = mysqli_prepare($connection, $updateQuery);
if (!$updateStmt) {
    http_response_code(500);
    echo json_encode(['error' => 'Query preparation failed']);
    exit;
}
mysqli_stmt_bind_param($updateStmt, "i", $id_alumno);
if (!mysqli_stmt_execute($updateStmt)) {
    http_response_code(500);
    echo json_encode(['error' => 'Query execution failed']);
    exit;
}

header('Content-Type: application/json');
echo json_encode(['success' => true, 'id_alumno' => $id_alumno]);

mysqli_close($connection);
