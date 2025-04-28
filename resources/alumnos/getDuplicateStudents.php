<?php
header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', 1);

try {
    $data = json_decode(file_get_contents('php://input'), true);
    $nombre = trim($data['nombre'] ?? '');
    $apellidos = trim($data['apellidos'] ?? '');
    $dni = trim($data['dni'] ?? '');

    require __DIR__.'/../dbConnect.php';

    if (!isset($connection) || !$connection) {
        throw new Exception('Database connection not established.');
    }

    $duplicate = false;

    if ($nombre && $apellidos) {
        $stmt = $connection->prepare("SELECT COUNT(*) FROM alumnos WHERE nombre = ? AND apellidos = ?");
        $stmt->bind_param('ss', $nombre, $apellidos);
        $stmt->execute();
        $stmt->bind_result($count);
        $stmt->fetch();
        if ($count > 0) {
            $duplicate = true;
        }
        $stmt->close();
    }

    if (!$duplicate && $dni) {
        $stmt = $connection->prepare("SELECT COUNT(*) FROM alumnos WHERE dni = ?");
        $stmt->bind_param('s', $dni);
        $stmt->execute();
        $stmt->bind_result($count);
        $stmt->fetch();
        if ($count > 0) {
            $duplicate = true;
        }
        $stmt->close();
    }

    echo json_encode(['duplicate' => $duplicate]);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        'duplicate' => false,
        'error' => true,
        'message' => $e->getMessage(),
        'trace' => $e->getTraceAsString()
    ]);
}
