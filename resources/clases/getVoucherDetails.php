<?php
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

// Consulta principal del bono
$query_bono = "SELECT id_bono, id_alumno, cantidadClases, esTransferido, caducidad, precioTotal, fechaPago, metodoPago 
               FROM bonos WHERE id_bono = $id";
$result_bono = mysqli_query($connection, $query_bono);
if (!$result_bono) {
    echo json_encode(["error" => "Error en la consulta del bono"]);
    exit;
}
$data_bono = mysqli_fetch_assoc($result_bono);

if (!$data_bono) {
    echo json_encode(["error" => "Bono no encontrado"]);
    exit;
}

// Consulta del alumno
$data_alumno = null;
if (!empty($data_bono['id_alumno'])) {
    $id_alumno = intval($data_bono['id_alumno']);
    $query_alumno = "SELECT nombre, apellidos FROM alumnos WHERE id_alumno = $id_alumno";
    $result_alumno = mysqli_query($connection, $query_alumno);
    if ($result_alumno) {
        $data_alumno = mysqli_fetch_assoc($result_alumno);
    }
}

// Consulta de clases particulares asociadas al bono
$query_clases = "SELECT * FROM clasesparticulares WHERE id_bono = $id";
$result_clases = mysqli_query($connection, $query_clases);
$data_clases = [];
if ($result_clases) {
    while ($row = mysqli_fetch_assoc($result_clases)) {
        // Obtener nombre del profesor si existe id_profesor
        $nombre_profesor = null;
        if (!empty($row['id_profesor'])) {
            $id_profesor = intval($row['id_profesor']);
            $query_prof = "SELECT nombre FROM profesores WHERE id_profesor = $id_profesor";
            $result_prof = mysqli_query($connection, $query_prof);
            if ($result_prof) {
                $prof_data = mysqli_fetch_assoc($result_prof);
                if ($prof_data && isset($prof_data['nombre'])) {
                    $nombre_profesor = $prof_data['nombre'];
                }
            }
        }
        $row['nombre_profesor'] = $nombre_profesor;
        $data_clases[] = $row;
    }
}

mysqli_close($connection);

// Estructura de respuesta
$data = [
    'bono'    => $data_bono,
    'alumno'  => $data_alumno,
    'clases'  => $data_clases
];

echo json_encode($data);
?>
