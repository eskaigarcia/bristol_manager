<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
header('Content-Type: application/json');

require __DIR__.'/../../dbConnect.php';

if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
    echo json_encode(['error' => 'ID de grupo no válido']);
    exit;
}

$id = intval($_GET['id']);

// Esto es la consulta principal del grupo
$query = "SELECT id_grupo, nombre, modalidad, creacion, horasSemanales, esActivo, esIntensivo, precio, horario 
          FROM grupos 
          WHERE id_grupo = $id";
$result = mysqli_query($connection, $query);

if (!$result) {
    echo json_encode(['error' => 'Error en la consulta']);
    exit;
}

$group = mysqli_fetch_assoc($result);

if (!$group) {
    echo json_encode(['error' => 'Grupo no encontrado']);
    exit;
}

// Para añadir aquí más consultas relacionadas por si acaso (profesor, alumnos, etc.)

echo json_encode($group);

mysqli_close($connection);
?>