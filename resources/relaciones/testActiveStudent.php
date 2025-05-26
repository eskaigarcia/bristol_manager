<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../dbConnect.php';

if (!isset($_GET['q'])) {
    echo json_encode(['error' => 'Falta el parámetro q']);
    exit;
}

$id_alumno = intval($_GET['q']);

// Modificamos la consulta para verificar relaciones activas
$query = "
    SELECT r.id_relacion
    FROM relaciones r
    WHERE (r.id_alumno1 = ? OR r.id_alumno2 = ?)
    AND (r.fechaFin IS NULL OR r.fechaFin > CURRENT_DATE())
";

$stmt = $connection->prepare($query);

if (!$stmt) {
    echo json_encode(['error' => 'Error preparando la consulta']);
    exit;
}

$stmt->bind_param("ii", $id_alumno, $id_alumno);
$stmt->execute();
$result = $stmt->get_result();

$activo = $result->num_rows > 0;

echo json_encode(['activo' => $activo]);

$stmt->close();
$connection->close();
?>