<?php
require __DIR__ . '/../dbConnect.php';

$id_grupo = $_GET['id'];

$query = "SELECT nombre, modalidad, esIntensivo, esActivo, horario FROM grupos WHERE id_grupo = $id_grupo";
$result = mysqli_query($connection, $query);

if (!$result) {
    echo json_encode(["error" => "Error en la consulta"]);
    exit;
}

$data = mysqli_fetch_assoc($result);
mysqli_close($connection);

echo json_encode($data);
?>
