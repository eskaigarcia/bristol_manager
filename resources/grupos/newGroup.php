<?php
// Habilitar errores (para desarrollo)
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Devolver respuestas en formato JSON
header('Content-Type: application/json');

// ----------------------------------------
// 1. Conexión con la base de datos (PDO)
// ----------------------------------------
try {
    $pdo = new PDO('mysql:host=localhost;dbname=bristol_alumnos;charset=utf8', 'root', '');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error de conexión: ' . $e->getMessage()]);
    exit;
}

// ----------------------------------------
// 2. Recibir y decodificar los datos JSON
// ----------------------------------------
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    echo json_encode(['success' => false, 'message' => 'No se recibió ningún dato válido.']);
    exit;
}

// ----------------------------------------
// 3. Validar que todos los campos estén presentes
// ----------------------------------------
// Si "asignatura" no está en el formulario, no se marca como obligatorio.
$campos_obligatorios = [
    'nombre', 'modalidad',
    'horasSemanales', 'precio', 'esActivo', 'esIntensivo',
    'id_profesor', 'horarioDias', 'horarioHoras', 'horarioDuraciones'
];

foreach ($campos_obligatorios as $campo) {
    if (!isset($data[$campo])) {
        echo json_encode([
            'success' => false,
            'message' => "Falta el campo obligatorio: '$campo'."
        ]);
        exit;
    }
}

// ----------------------------------------
// 4. Comprobar que el profesor existe
// ----------------------------------------
try {
    $stmt_check = $pdo->prepare("SELECT COUNT(*) FROM profesores WHERE id_profesor = ?");
    $stmt_check->execute([$data['id_profesor']]);

    if ($stmt_check->fetchColumn() == 0) {
        echo json_encode(['success' => false, 'message' => 'El profesor no existe.']);
        exit;
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error verificando profesor: ' . $e->getMessage()]);
    exit;
}

// ----------------------------------------
// 5. Construir el campo horario como JSON
// ----------------------------------------
$horario = json_encode([
    'dias' => $data['horarioDias'],
    'horas' => $data['horarioHoras'],
    'duraciones' => $data['horarioDuraciones']
]);

// ----------------------------------------
// 6. Insertar el grupo
// ----------------------------------------
try {
    $stmt = $pdo->prepare("
        INSERT INTO grupos (
            nombre, asignatura, modalidad,
            horasSemanales, precio,
            esActivo, esIntensivo,
            id_profesor, horario
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ");

    // Si "asignatura" no está en el formulario, pasa un valor por defecto (puede ser NULL o cualquier valor que necesites)
    $asignatura = isset($data['asignatura']) ? $data['asignatura'] : null;

    $stmt->execute([
        $data['nombre'],
        $asignatura,  // Puede ser NULL si no se proporciona
        $data['modalidad'],
        $data['horasSemanales'],
        $data['precio'],
        (int) $data['esActivo'],
        (int) $data['esIntensivo'],
        $data['id_profesor'],
        $horario
    ]);

    echo json_encode(['success' => true, 'message' => 'Grupo creado correctamente.']);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Error al insertar el grupo: ' . $e->getMessage()
    ]);
}
?>
