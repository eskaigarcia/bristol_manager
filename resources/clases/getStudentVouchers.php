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

// Only select valid, non-expired vouchers with clasesLibres > 0
$query = "
    SELECT 
        b.id_bono, 
        b.cantidadClases,
        b.caducidad,
        b.fechaPago,
        (b.cantidadClases - (
            SELECT COUNT(*) 
            FROM clasesparticulares cp 
            WHERE cp.id_bono = b.id_bono
        )) AS clasesLibres
    FROM bonos b
    WHERE b.id_alumno = $id
      AND (b.cantidadClases - (
            SELECT COUNT(*) 
            FROM clasesparticulares cp 
            WHERE cp.id_bono = b.id_bono
        )) > 0
      AND b.caducidad > NOW()
";

$result = mysqli_query($connection, $query);

if (!$result) {
    echo json_encode(["error" => "Error en la consulta de bonos"]);
    exit;
}

$vouchers = [];
while ($row = mysqli_fetch_assoc($result)) {
    $vouchers[] = $row;
}

mysqli_close($connection);

echo json_encode($vouchers);
?>
