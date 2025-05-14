<?php
session_start();
require __DIR__.'/../dbConnect.php';

$nombre = $_POST['nombre'];
$asignatura = $_POST['asignatura'];
$modalidad = $_POST['modalidad'];
$horasSemanales = $_POST['horasSemanales'];
$precio = $_POST['precio'];

$id_profesor = $_POST['id_profesor'];

$sql_check_profesor = "SELECT id_profesor FROM profesores WHERE id_profesor = '$id_profesor'";
$result_check_profesor = mysqli_query($connection, $sql_check_profesor);

if (mysqli_num_rows($result_check_profesor) > 0) {
    $sql = "INSERT INTO grupos (nombre, asignatura, modalidad, horasSemanales, esActivo, precio, horario, id_profesor) 
            VALUES ('$nombre', '$asignatura', '$modalidad', '$horasSemanales', '$esActivo', '$precio', '$horarioJson', $id_profesor)";

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
