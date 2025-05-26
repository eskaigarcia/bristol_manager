<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../dbConnect.php';

// Validar el parámetro 'q'
if (!isset($_GET['q'])) {
    echo json_encode(['error' => 'Falta el parámetro q']);
    exit;
}

$id_alumno = intval($_GET['q']);

$query = "
    SELECT fechaFin
    FROM relaciones
    WHERE id_alumno1 = ? OR id_alumno2 = ?
";

$stmt = $connection->prepare($query);

if (!$stmt) {
    echo json_encode(['error' => 'Error preparando la consulta']);
    exit;
}

$stmt->bind_param("ii", $id_alumno, $id_alumno);
$stmt->execute();
$result = $stmt->get_result();

$relaciones = [];
while ($row = $result->fetch_assoc()) {
    $relaciones[] = $row;
}

$stmt->close();
$connection->close();

echo json_encode($relaciones);
?>
