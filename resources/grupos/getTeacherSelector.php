<?php
require_once __DIR__ . '/../dbConnect.php';

$query = "SELECT id_profesor, nombre FROM profesores ORDER BY nombre ASC";
$result = mysqli_query($connection, $query);

$teachers = [];
while ($row = mysqli_fetch_assoc($result)) {
    $teachers[] = $row; // Return full row: ['id_profesor' => ..., 'nombre' => ...]
}

header('Content-Type: application/json');
echo json_encode($teachers);

mysqli_close($connection);
