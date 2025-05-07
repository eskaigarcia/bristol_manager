<?php
// filepath: c:\xampp\htdocs\bristol_alumnos\resources\grupos\getGroupDetails.php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
header('Content-Type: application/json');

// Conexión segura
if (!file_exists(__DIR__.'/../dbConnect.php')) {
    echo json_encode(["error" => "No se encuentra dbConnect.php"]);
    exit;
}
require __DIR__.'/../dbConnect.php';

if (!$connection) {
    echo json_encode(["error" => "Error de conexión a la base de datos"]);
    exit;
}

$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

// Consulta principal del grupo
$query_group = "SELECT id_grupo, nombre, modalidad, esIntensivo, esActivo, horario, creacion, id_profesor 
                FROM grupos WHERE id_grupo = $id";
$result_group = mysqli_query($connection, $query_group);
if (!$result_group) {
    echo json_encode(["error" => "Error en la consulta de grupo"]);
    exit;
}
$data_group = mysqli_fetch_assoc($result_group);

if (!$data_group) {
    echo json_encode(["error" => "Grupo no encontrado"]);
    exit;
}

// Consulta de alumnos del grupo
$query_alumnos = "SELECT a.id_alumno, a.nombre, a.apellidos
                  FROM alumnos a 
                  JOIN alumnosgrupos ag ON a.id_alumno = ag.id_alumno 
                  WHERE ag.id_grupo = $id";
$result_alumnos = mysqli_query($connection, $query_alumnos);
if (!$result_alumnos) {
    echo json_encode(["error" => "Error en la consulta de alumnos"]);
    exit;
}
$data_alumnos = [];
while ($row = mysqli_fetch_assoc($result_alumnos)) {
    $data_alumnos[] = $row;
}

// Consulta del profesor del grupo
$data_profesor = null;
if (!empty($data_group['id_profesor'])) {
    $id_profesor = intval($data_group['id_profesor']);
    $query_profesor = "SELECT id_profesor, nombre FROM profesores WHERE id_profesor = $id_profesor";
    $result_profesor = mysqli_query($connection, $query_profesor);
    if ($result_profesor) {
        $data_profesor = mysqli_fetch_assoc($result_profesor);
    }
}

mysqli_close($connection);

// Estructura de respuesta
$data = [
    'grupo'    => $data_group,
    'alumnos'  => $data_alumnos,
    'profesor' => $data_profesor
];

echo json_encode($data);
?>