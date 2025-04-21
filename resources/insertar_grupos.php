<?php
session_start();
require 'dbConnect.php';  // Conexión a la base de datos

// Obtener los datos del formulario
$nombre = $_POST['nombre'];
$asignatura = $_POST['asignatura'];
$modalidad = $_POST['modalidad'];
$horasSemanales = $_POST['horasSemanales'];
$esActivo = isset($_POST['esActivo']) ? 1 : 0;
$precio = $_POST['precio'];
$horario = $_POST['horario']; // Días de clase
$horarioHoras = $_POST['horarioHoras']; // Horas de clase
$horarioDuraciones = $_POST['horarioDuraciones']; // Duraciones de clase

// Función para convertir cadenas separadas por comas en arrays
function convertirAArray($valor) {
    if (is_string($valor)) {
        return array_map('trim', explode(',', $valor));
    }
    return $valor; // Si ya es un array, no lo tocamos
}

// Convertir días, horas y duraciones a arrays
$horario = convertirAArray($horario);
$horarioHoras = convertirAArray($horarioHoras);
$horarioDuraciones = convertirAArray($horarioDuraciones);

// Codificar los valores a JSON para almacenarlos en la base de datos
$horarioJson = json_encode(['dias' => $horario, 'horas' => $horarioHoras, 'duraciones' => $horarioDuraciones]);

// Capturar si es intensivo, si está marcado en el formulario, se establece a 1, de lo contrario a 0
$esIntensivo = isset($_POST['esIntensivo']) ? 1 : 0;

// Obtener el ID del profesor
$id_profesor = $_POST['id_profesor'];

// Verificar si el ID del profesor existe en la base de datos
$sql_check_profesor = "SELECT id_profesor FROM profesores WHERE id_profesor = '$id_profesor'";
$result_check_profesor = mysqli_query($connection, $sql_check_profesor);

if (mysqli_num_rows($result_check_profesor) > 0) {
    // Si el profesor existe, proceder con la inserción del grupo
    $sql = "INSERT INTO grupos (nombre, asignatura, modalidad, horasSemanales, esActivo, precio, horario, esIntensivo, id_profesor) 
            VALUES ('$nombre', '$asignatura', '$modalidad', '$horasSemanales', '$esActivo', '$precio', '$horarioJson', $esIntensivo, $id_profesor)";

    if (mysqli_query($connection, $sql)) {
        // Si la inserción es exitosa, redirigir al listado de grupos con éxito
        header("Location: ../grupos.php?success=1");
        exit();
    } else {
        // Si hubo un error en la inserción, mostrar mensaje de error
        echo "Error al crear el grupo: " . mysqli_error($connection);
    }
} else {
    // Si el profesor no existe, mostrar mensaje de error
    echo "El profesor seleccionado no existe en la base de datos.";
}

// Cerrar la conexión a la base de datos
mysqli_close($connection);
?>
