<?php
session_start();
require 'dbConnect.php';

$nombre = $_POST['nombre'];
$asignatura = $_POST['asignatura'];
$modalidad = $_POST['modalidad'];
$horasSemanales = $_POST['horasSemanales'];
$esActivo = isset($_POST['esActivo']) ? 1 : 0;
$precio = $_POST['precio'];
$horarioDias = json_decode($_POST['horarioDias'], true);
$horarioHoras = json_decode($_POST['horarioHoras'], true);
$horarioDuraciones = json_decode($_POST['horarioDuraciones'], true);

$horarioDiasJson = json_encode($horarioDias);
$horarioHorasJson = json_encode($horarioHoras);
$horarioDuracionesJson = json_encode($horarioDuraciones);

$id_profesor = $_POST['id_profesor'];

$sql_check_profesor = "SELECT id_profesor FROM profesores WHERE id_profesor = '$id_profesor'";
$result_check_profesor = mysqli_query($connection, $sql_check_profesor);

if (mysqli_num_rows($result_check_profesor) > 0) {
    $sql = "INSERT INTO grupos (nombre, asignatura, modalidad, horasSemanales, esActivo, precio, horarioDias, horarioHoras, horarioDuraciones, id_profesor) 
            VALUES ('$nombre', '$asignatura', '$modalidad', '$horasSemanales', '$esActivo', '$precio', '$horarioDiasJson', '$horarioHorasJson', '$horarioDuracionesJson', $id_profesor)";

    if (mysqli_query($connection, $sql)) {
        header("Location: ../grupos.php?success=1");
        exit();
    } else {
        echo "Error al crear el grupo: " . mysqli_error($connection);
    }
} else {
    echo "El profesor seleccionado no existe en la base de datos.";
}

mysqli_close($connection);
?>
