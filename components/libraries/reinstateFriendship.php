<?php
require_once __DIR__ . '/../dbConnect.php';

if (!$connection) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

// Get id_relacion from query string
$id_relacion = isset($_GET['q']) ? intval($_GET['q']) : 0;
if ($id_relacion <= 0) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing or invalid id_alumno']);
    exit;
}

// Update relation end date
$updateQuery = "UPDATE relaciones SET fechaFin = NULL WHERE id_relacion = ?";
$updateStmt = mysqli_prepare($connection, $updateQuery);
if (!$updateStmt) {
    http_response_code(500);
    echo json_encode(['error' => 'Query preparation failed']);
    exit;
}
mysqli_stmt_bind_param($updateStmt, "i", $id_relacion);
if (!mysqli_stmt_execute($updateStmt)) {
    http_response_code(500);
    echo json_encode(['error' => 'Query execution failed']);
    exit;
}

header('Content-Type: application/json');
echo json_encode(['success' => true, 'id_relacion' => $id_relacion]);

mysqli_close($connection);