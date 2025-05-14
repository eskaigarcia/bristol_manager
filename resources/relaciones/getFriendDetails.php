<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
header('Content-Type: application/json');

require __DIR__.'/../dbConnect.php';

if (!$connection) {
    echo json_encode(["error" => "Error de conexión a la base de datos"]);
    exit;
}

$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

$query_friend = "SELECT id_relacion AS id_amigo, tipoRelacion, fechaInicio, fechaFin 
                 FROM relaciones 
                 WHERE id_relacion = $id";
$result_friend = mysqli_query($connection, $query_friend);
if (!$result_friend) {
    echo json_encode(["error" => "Error en la consulta de relación de amistad"]);
    exit;
}
$data_friend = mysqli_fetch_assoc($result_friend);

if (!$data_friend) {
    echo json_encode(["error" => "Relación de amistad no encontrada"]);
    exit;
}

$query_alumnos = "SELECT a.id_alumno, a.nombre, a.apellidos 
                  FROM alumnos a 
                  JOIN relaciones am ON (a.id_alumno = am.id_alumno1 OR a.id_alumno = am.id_alumno2) 
                  WHERE am.id_relacion = $id";
$result_alumnos = mysqli_query($connection, $query_alumnos);
$data_alumnos = [];
while ($row = mysqli_fetch_assoc($result_alumnos)) {
    $data_alumnos[] = $row;
}

mysqli_close($connection);

echo json_encode([
    'amigo' => $data_friend,
    'alumnos' => $data_alumnos
]);
?>
