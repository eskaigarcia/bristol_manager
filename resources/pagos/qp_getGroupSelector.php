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

// Join alumnosgrupos and grupos to get group names for the student
$query = "SELECT g.id_grupo, g.nombre, g.precio 
          FROM alumnosgrupos ag
          INNER JOIN grupos g ON ag.id_grupo = g.id_grupo
          WHERE ag.id_alumno = ?";
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
