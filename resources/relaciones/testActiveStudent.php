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
    SELECT g.fechaFin
    FROM grupos_alumnos ga
    JOIN grupos g ON ga.id_grupo = g.id_grupo
    WHERE ga.id_alumno = ?
";

$stmt = $connection->prepare($query);

if (!$stmt) {
    echo json_encode(['error' => 'Error preparando la consulta']);
    exit;
}

$stmt->bind_param("i", $id_alumno);
$stmt->execute();
$result = $stmt->get_result();

$grupos = [];
while ($row = $result->fetch_assoc()) {
    $grupos[] = $row;
}

$stmt->close();
$connection->close();

echo json_encode($grupos);
?>
