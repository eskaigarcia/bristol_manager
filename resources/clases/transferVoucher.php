<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
header('Content-Type: application/json');

if (!file_exists(__DIR__.'/../dbConnect.php')) {
    echo json_encode(["success" => false, "message" => "No se encuentra dbConnect.php"]);
    exit;
}
require __DIR__.'/../dbConnect.php';

if (!$connection) {
    echo json_encode(["success" => false, "message" => "Error de conexión a la base de datos"]);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$id_bono = isset($input['id_bono']) ? intval($input['id_bono']) : 0;
$id_alumno = isset($input['id_alumno']) ? intval($input['id_alumno']) : 0;
$clases_restantes = isset($input['clases_restantes']) ? intval($input['clases_restantes']) : 0;

if ($id_bono <= 0 || $id_alumno <= 0 || $clases_restantes <= 0) {
    echo json_encode(["success" => false, "message" => "Datos de entrada inválidos"]);
    exit;
}

// Obtener datos del bono original
$query_bono = "SELECT cantidadClases, caducidad FROM bonos WHERE id_bono = $id_bono";
$result_bono = mysqli_query($connection, $query_bono);
if (!$result_bono || mysqli_num_rows($result_bono) == 0) {
    echo json_encode(["success" => false, "message" => "Bono original no encontrado"]);
    exit;
}
$data_bono = mysqli_fetch_assoc($result_bono);
$cantidadClases = intval($data_bono['cantidadClases']);
$caducidad = $data_bono['caducidad'];

// Actualizar bono original: restar clases libres y marcar como transferido
$nueva_cantidad = $cantidadClases - $clases_restantes;
if ($nueva_cantidad < 0) $nueva_cantidad = 0;

$update_bono = "UPDATE bonos SET cantidadClases = $nueva_cantidad, esTransferido = 1 WHERE id_bono = $id_bono";
if (!mysqli_query($connection, $update_bono)) {
    echo json_encode(["success" => false, "message" => "Error al actualizar el bono original"]);
    exit;
}

// Crear nuevo bono para el alumno destino
$fechaPago = '2000-01-01';
$precioTotal = 0;
$metodoPago = 'otro';

// esTransferido = 1 para el nuevo bono
$insert_bono = "INSERT INTO bonos (id_alumno, cantidadClases, esTransferido, caducidad, precioTotal, fechaPago, metodoPago)
                VALUES ($id_alumno, $clases_restantes, 1, '$caducidad', $precioTotal, '$fechaPago', '$metodoPago')";
if (!mysqli_query($connection, $insert_bono)) {
    echo json_encode(["success" => false, "message" => "Error al crear el nuevo bono"]);
    exit;
}

echo json_encode(["success" => true]);
mysqli_close($connection);
?>
