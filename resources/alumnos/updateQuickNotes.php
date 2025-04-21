<?php

require __DIR__.'/../dbConnect.php';
$data = json_decode(file_get_contents('php://input'), true);

$id = $data["id"];
$notes = $data["notes"];

// Use prepared statements to prevent SQL injection and fix syntax issues
$query = "UPDATE alumnos SET notasRapidas = ? WHERE id_alumno = ?";
$stmt = $connection->prepare($query);
$stmt->bind_param('si', $notes, $id);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => $stmt->error]);
}

$stmt->close();
mysqli_close($connection);

