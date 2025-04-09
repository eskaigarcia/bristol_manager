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
$horarioDias = $_POST['horarioDias'];
$horarioHoras = $_POST['horarioHoras'];
$horarioDuraciones = $_POST['horarioDuraciones'];

// Función para convertir cadenas separadas por comas en arrays
function convertirAArray($valor) {
    if (is_string($valor)) {
        // Si es una cadena, separamos por comas y eliminamos espacios extra
        return array_map('trim', explode(',', $valor));
    }
    return $valor; // Si ya es un array, no lo tocamos
}

// Función para decodificar solo si el valor es una cadena
function decodificarSiEsString($valor) {
    if (is_string($valor)) {
        return json_decode($valor, true);
    }
    return $valor; // Si ya es un array, no lo decodificamos
}

// Decodificar las cadenas de horarioDias, horarioHoras y horarioDuraciones si es necesario
$horarioDias = decodificarSiEsString($horarioDias) ?: [];
$horarioHoras = convertirAArray($horarioHoras);  // Convertir si es una cadena
$horarioDuraciones = convertirAArray($horarioDuraciones);  // Convertir si es una cadena

// Codificar los valores a JSON para almacenarlos en la base de datos
$horarioDiasJson = json_encode($horarioDias);
$horarioHorasJson = json_encode($horarioHoras);
$horarioDuracionesJson = json_encode($horarioDuraciones);

// Capturar si es intensivo, si está marcado en el formulario, se establece a 1, de lo contrario a 0
$esIntensivo = isset($_POST['esIntensivo']) ? 1 : 0;

// Obtener el ID del profesor
$id_profesor = $_POST['id_profesor'];

// Verificar si el ID del profesor existe en la base de datos
$sql_check_profesor = "SELECT id_profesor FROM profesores WHERE id_profesor = '$id_profesor'";
$result_check_profesor = mysqli_query($connection, $sql_check_profesor);

if (mysqli_num_rows($result_check_profesor) > 0) {
    // Si el profesor existe, proceder con la inserción del grupo
    $sql = "INSERT INTO grupos (nombre, asignatura, modalidad, horasSemanales, esActivo, precio, horarioDias, horarioHoras, horarioDuraciones, esIntensivo, id_profesor) 
            VALUES ('$nombre', '$asignatura', '$modalidad', '$horasSemanales', '$esActivo', '$precio', '$horarioDiasJson', '$horarioHorasJson', '$horarioDuracionesJson', $esIntensivo, $id_profesor)";

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
