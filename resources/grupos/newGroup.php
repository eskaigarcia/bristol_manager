<?php 
// Mostrar errores para depuración
ini_set('display_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');

try {
    $pdo = new PDO('mysql:host=localhost;dbname=bristol_alumnos;charset=utf8', 'root', '');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error de conexión: ' . $e->getMessage()]);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

if (!$data || empty($data['nombre']) || empty($data['asignatura'])) {
    echo json_encode(['success' => false, 'message' => 'Datos incompletos']);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO grupos 
        (nombre, asignatura, modalidad, horasSemanales, precio, esActivo, esIntensivo, id_profesor, horario)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
    
    $stmt->execute([
        $data['nombre'],
        $data['asignatura'],
        $data['modalidad'],
        $data['horasSemanales'],
        $data['precio'],
        $data['esActivo'],
        $data['esIntensivo'],
        $data['id_profesor'],
        json_encode([
            'dias' => $data['horarioDias'],
            'horas' => $data['horarioHoras'],
            'duraciones' => $data['horarioDuraciones']
        ]) 
    ]);
    
    echo json_encode(['success' => true]);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Error SQL: ' . $e->getMessage(),
        'data' => $data 
    ]);
}
?>
