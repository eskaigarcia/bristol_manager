<?php
header('Content-Type: application/json');

// Include database connection
require_once 'dbConnect.php';

// Get the JSON input
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    $data = []; // Default to an empty array if JSON is invalid
}

echo json_encode([
    'success' => false,
    'message' => 'Raw JSON input:',
    'raw' => $input,
    'decoded' => $data,
    'json_error' => json_last_error_msg()
]);

// if (!isset($data['id_alumno'])) {
//     echo json_encode(['success' => false, 'message' => 'Student ID is required.']);
//     exit;
// }

$id = $data['id_alumno'];
$nombre = $data['nombre'] ?? null;
$apellidos = $data['apellidos'] ?? null;
$adulto = isset($data['adulto']) && $data['adulto'] === 'si' ? 1 : 0;
$amonesta = isset($data['amonesta']) && $data['amonesta'] === 'si' ? 1 : 0;
$dni = $data['dni'] ?? null;
$telefono = $data['telefono'] ?? null;
$email = $data['email'] ?? null;
$direccion = $data['direccion'] ?? null;
$codigo_postal = $data['codigo_postal'] ?? null;
$localidad = $data['localidad'] ?? null;
$iban = $data['iban'] ?? null;
$comentarios_medicos = $data['comentarios_medicos'] ?? null;
$notas_rapidas = $data['notas_rapidas'] ?? null;

try {   
    $stmt = $conn->prepare("UPDATE alumnos SET nombre = ?, apellidos = ?, esAdulto = ?, esAmonestado = ?, dni = ?, telefono = ?, email = ?, direccion = ?, cp = ?, localidad = ?, iban = ?, comentariosMedicos = ?, notasRapidas = ? WHERE id_alumno = ?");
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

$conn->close();