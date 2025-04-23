<?php
header('Content-Type: application/json');

// Include database connection
require __DIR__.'/../dbConnect.php';

// Get the JSON input
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!isset($data['id'])) {
    echo json_encode(['success' => false, 'message' => 'Student ID is required.']);
    exit;
}

$id = $data['id'] ?? null;
$nombre = !empty($data['nombre']) ? $data['nombre'] : null;
$apellidos = !empty($data['apellidos']) ? $data['apellidos'] : null;
$adulto = isset($data['adulto']) && $data['adulto'] === 'si' ? 1 : 0;
$amonesta = isset($data['amonesta']) && $data['amonesta'] === 'si' ? 1 : 0;
$dni = !empty($data['dni']) ? $data['dni'] : null;
$telefono = !empty($data['telefono']) ? $data['telefono'] : null;
$email = !empty($data['email']) ? $data['email'] : null;
$direccion = !empty($data['direccion']) ? $data['direccion'] : null;
$codigo_postal = !empty($data['codigo_postal']) ? $data['codigo_postal'] : null;
$localidad = !empty($data['localidad']) ? $data['localidad'] : null;
$iban = !empty($data['iban']) ? $data['iban'] : null;
$comentarios_medicos = !empty($data['comentarios_medicos']) ? $data['comentarios_medicos'] : null;
$notas_rapidas = !empty($data['notas_rapidas']) ? $data['notas_rapidas'] : null;

try {   
    $stmt = $connection->prepare("UPDATE alumnos SET nombre = ?, apellidos = ?, esAdulto = ?, esAmonestado = ?, dni = ?, telefono = ?, email = ?, direccion = ?, cp = ?, localidad = ?, iban = ?, comentariosMedicos = ?, notasRapidas = ? WHERE id_alumno = ?");
    $stmt->bind_param('ssiiissssssssi', $nombre, $apellidos, $adulto, $amonesta, $dni, $telefono, $email, $direccion, $codigo_postal, $localidad, $iban, $comentarios_medicos, $notas_rapidas, $id);

    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to update student details.']);
    }

    $stmt->close();
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}

$connection->close();