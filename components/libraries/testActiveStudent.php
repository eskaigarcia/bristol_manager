<?php
require_once __DIR__ . '/../dbConnect.php';

if (!$connection) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

// Optionally log the nonce for debugging
if (isset($_GET['nonce'])) {
    error_log("Nonce: " . $_GET['nonce']);
}

// Get id_alumno from query string, support values like "12345&nonce=..."
$id_alumno = 0;
if (isset($_GET['q'])) {
    // Extract only the leading digits
    if (preg_match('/^\d+/', $_GET['q'], $matches)) {
        $id_alumno = intval($matches[0]);
    } else {
        echo json_encode(['error' => 'Missing or invalid id_alumno']);
        exit;
    }
}

if ($id_alumno <= 0) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing or invalid id_alumno']);
    exit;
}

// Query to get group info for the student
$query = "SELECT id_alumno, fechaFin, id_alumnoGrupo FROM alumnosgrupos WHERE id_alumno = ?";
$stmt = mysqli_prepare($connection, $query);
if (!$stmt) {
    http_response_code(500);
    echo json_encode(['error' => 'Query preparation failed']);
    exit;
}
mysqli_stmt_bind_param($stmt, "i", $id_alumno);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

if (!$result) {
    http_response_code(500);
    echo json_encode(['error' => 'Query failed']);
    exit;
}

$groups = [];
while ($row = mysqli_fetch_assoc($result)) {
    $groups[] = $row;
}

header('Content-Type: application/json');
echo json_encode($groups);

mysqli_close($connection);