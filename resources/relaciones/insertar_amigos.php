<?php
session_start();
require __DIR__ . '/../dbConnect.php';

// Recibir datos JSON
$data = json_decode(file_get_contents("php://input"), true);

// Validar que se recibieron correctamente
if (
    !isset($data['id_alumno1'], $data['id_alumno2'], $data['fechaInicio'], $data['tipoRelacion']) ||
    empty($data['id_alumno1']) || empty($data['id_alumno2']) || empty($data['fechaInicio']) || empty($data['tipoRelacion'])
) {
    echo json_encode([
        'success' => false,
        'message' => 'Faltan campos obligatorios.'
    ]);
    exit;
}

$id_alumno1 = intval($data['id_alumno1']);
$id_alumno2 = intval($data['id_alumno2']);
$fechaInicio = $data['fechaInicio'];
$fechaFin = !empty($data['fechaFin']) ? $data['fechaFin'] : null;
$tipoRelacion = $data['tipoRelacion'];

// Validar que los alumnos no sean iguales
if ($id_alumno1 === $id_alumno2) {
    echo json_encode([
        'success' => false,
        'message' => 'Los alumnos no pueden ser el mismo.'
    ]);
    exit;
}

// Validar que los alumnos existen
$check1 = mysqli_query($connection, "SELECT id_alumno FROM alumnos WHERE id_alumno = $id_alumno1");
$check2 = mysqli_query($connection, "SELECT id_alumno FROM alumnos WHERE id_alumno = $id_alumno2");

if (mysqli_num_rows($check1) === 0 || mysqli_num_rows($check2) === 0) {
    echo json_encode([
        'success' => false,
        'message' => 'Uno o ambos alumnos no existen en la base de datos.'
    ]);
    exit;
}

// Insertar relación
$sql = "INSERT INTO relaciones (id_alumno1, id_alumno2, fechaInicio, fechaFin, tipoRelacion)
        VALUES (?, ?, ?, ?, ?)";

$stmt = mysqli_prepare($connection, $sql);
mysqli_stmt_bind_param($stmt, 'iisss', $id_alumno1, $id_alumno2, $fechaInicio, $fechaFin, $tipoRelacion);

if (mysqli_stmt_execute($stmt)) {
    echo json_encode([
        'success' => true,
        'message' => 'Relación creada correctamente.'
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Error al crear la relación: ' . mysqli_error($connection)
    ]);
}

mysqli_close($connection);
?>
