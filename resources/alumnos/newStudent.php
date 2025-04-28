<?php
header('Content-Type: application/json');
require __DIR__.'/../dbConnect.php';

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    echo json_encode(['success' => false, 'message' => 'No data received or JSON invalid.']);
    exit;
}

// Prepare and sanitize student data
$fecha = $data['fecha'] ?? null;
$nombre = !empty(trim($data['nombre'] ?? '')) ? trim($data['nombre']) : null;
$apellidos = !empty(trim($data['apellidos'] ?? '')) ? trim($data['apellidos']) : null;
$adulto = ($data['adulto'] ?? '') === 'si' ? 1 : 0;
$dni = !empty(trim($data['dni'] ?? '')) ? trim($data['dni']) : null;
$telefono = !empty(trim($data['telefono'] ?? '')) ? trim($data['telefono']) : null;
$email = !empty(trim($data['email'] ?? '')) ? trim($data['email']) : null;
$direccion = !empty(trim($data['direccion'] ?? '')) ? trim($data['direccion']) : null;
$codigo_postal = !empty(trim($data['codigo_postal'] ?? '')) ? trim($data['codigo_postal']) : null;
$localidad = !empty(trim($data['localidad'] ?? '')) ? trim($data['localidad']) : null;
$iban = !empty(trim($data['iban'] ?? '')) ? trim($data['iban']) : null;
$comentarios_medicos = !empty(trim($data['comentarios_medicos'] ?? '')) ? trim($data['comentarios_medicos']) : null;

// Prepare and sanitize contact information
foreach (['contact1', 'contact2'] as $key) {
    if (!empty($data[$key])) {
        $data[$key]['name'] = !empty(trim($data[$key]['name'] ?? '')) ? trim($data[$key]['name']) : null;
        $data[$key]['phone'] = !empty(trim($data[$key]['phone'] ?? '')) ? trim($data[$key]['phone']) : null;
        $data[$key]['relation'] = !empty(trim($data[$key]['relation'] ?? '')) ? trim($data[$key]['relation']) : null;
    }
}

// Prepare and sanitize guardian data
if (!empty($data['guardian'])) {
    $data['guardian']['nombre'] = !empty(trim($data['guardian']['nombre'] ?? '')) ? trim($data['guardian']['nombre']) : null;
    $data['guardian']['apellidos'] = !empty(trim($data['guardian']['apellidos'] ?? '')) ? trim($data['guardian']['apellidos']) : null;
    $data['guardian']['dni'] = !empty(trim($data['guardian']['dni'] ?? '')) ? trim($data['guardian']['dni']) : null;
    $data['guardian']['telefono'] = !empty(trim($data['guardian']['telefono'] ?? '')) ? trim($data['guardian']['telefono']) : null;
    $data['guardian']['email'] = !empty(trim($data['guardian']['email'] ?? '')) ? trim($data['guardian']['email']) : null;
    $data['guardian']['direccion'] = !empty(trim($data['guardian']['direccion'] ?? '')) ? trim($data['guardian']['direccion']) : null;
    $data['guardian']['codigo_postal'] = !empty(trim($data['guardian']['codigo_postal'] ?? '')) ? trim($data['guardian']['codigo_postal']) : null;
    $data['guardian']['localidad'] = !empty(trim($data['guardian']['localidad'] ?? '')) ? trim($data['guardian']['localidad']) : null;
    $data['guardian']['iban'] = !empty(trim($data['guardian']['iban'] ?? '')) ? trim($data['guardian']['iban']) : null;
}

// Insert student
try {
    $stmt = $connection->prepare("INSERT INTO alumnos (fechaInclusion, nombre, apellidos, esAdulto, dni, telefono, email, direccion, cp, localidad, iban, comentariosMedicos) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    if (!$stmt) throw new Exception($connection->error);
    $stmt->bind_param(
        'ssssssssssss',
        $fecha, $nombre, $apellidos, $adulto, $dni, $telefono, $email, $direccion, $codigo_postal, $localidad, $iban, $comentarios_medicos
    );
    if (!$stmt->execute()) throw new Exception($stmt->error);
    $id_alumno = $stmt->insert_id;
    $stmt->close();

    // Insert emergency contacts if present
    foreach (['contact1', 'contact2'] as $key) {
        $c = $data[$key] ?? [];
        if (!empty($c['name']) && !empty($c['phone']) && !empty($c['relation'])) {
            $stmt = $connection->prepare("INSERT INTO contactosemergencia (id_alumno, nombre, telefono, relacion) VALUES (?, ?, ?, ?)");
            if ($stmt) {
                $stmt->bind_param('isss', $id_alumno, $c['name'], $c['phone'], $c['relation']);
                $stmt->execute();
                $stmt->close();
            }
        }
    }

    // Insert guardian if present
    if (!empty($data['guardian']) && !empty($data['guardian']['nombre'])) {
        $g = $data['guardian'];
        $stmt = $connection->prepare("INSERT INTO responsables (nombre, apellidos, dni, telefono, email, direccion, cp, localidad, iban, id_alumno) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        if ($stmt) {
            $stmt->bind_param(
                'sssssssssi',
                $g['nombre'], $g['apellidos'], $g['dni'], $g['telefono'], $g['email'],
                $g['direccion'], $g['codigo_postal'], $g['localidad'], $g['iban'], $id_alumno
            );
            $stmt->execute();
            $stmt->close();
        }
    }

    echo json_encode(['success' => true, 'id' => $id_alumno]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
$connection->close();
