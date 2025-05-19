<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../dbConnect.php';

if (!isset($_GET['q'])) {
    echo json_encode(['success' => false, 'message' => 'Falta el parámetro q']);
    exit;
}

$id_relacion = intval($_GET['q']);

$query = "UPDATE relaciones SET fechaFin = CURDATE() WHERE id_relacion = ?";
$stmt = $connection->prepare($query);

if (!$stmt) {
    echo json_encode(['success' => false, 'message' => 'Error preparando la consulta']);
    exit;
}

$stmt->bind_param("i", $id_relacion);
$success = $stmt->execute();

if ($success) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Error ejecutando la consulta']);
}

$stmt->close();
$connection->close();
?>
