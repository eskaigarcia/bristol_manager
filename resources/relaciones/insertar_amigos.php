<?php
session_start();
require __DIR__ . '/../dbConnect.php';

// Recoger datos del formulario
$id_alumno1 = $_POST['id_alumno1'];
$id_alumno2 = $_POST['id_alumno2'];
$fechaInicio = $_POST['fechaInicio'];
$fechaFin = !empty($_POST['fechaFin']) ? $_POST['fechaFin'] : null;
$tipoRelacion = $_POST['tipoRelacion'];

// Validar que los alumnos existen (opcional pero recomendable)
$check1 = mysqli_query($connection, "SELECT id_alumno FROM alumnos WHERE id_alumno = '$id_alumno1'");
$check2 = mysqli_query($connection, "SELECT id_alumno FROM alumnos WHERE id_alumno = '$id_alumno2'");

if (mysqli_num_rows($check1) > 0 && mysqli_num_rows($check2) > 0) {
    // Preparar inserción
    $sql = "INSERT INTO relaciones (id_alumno1, id_alumno2, fechaInicio, fechaFin, tipoRelacion)
            VALUES (?, ?, ?, ?, ?)";

    $stmt = mysqli_prepare($connection, $sql);
    mysqli_stmt_bind_param($stmt, 'iisss', $id_alumno1, $id_alumno2, $fechaInicio, $fechaFin, $tipoRelacion);

    if (mysqli_stmt_execute($stmt)) {
        header("Location: ../relaciones.php?success=1");
        exit();
    } else {
        echo "Error al crear la relación: " . mysqli_error($connection);
    }
} else {
    echo "Uno o ambos alumnos no existen en la base de datos.";
}

mysqli_close($connection);
?>
