<?php
// Incluir la conexión a la base de datos
require './resources/dbConnect.php';

// Ejecutar la consulta
$query = "SELECT id_grupo, nombre, asignatura, modalidad, horasSemanales, creacion, esActivo, esIntensivo, precio, horario FROM grupos";
$result = mysqli_query($connection, $query);

// Verificar si la consulta tuvo éxito
if (!$result) {
    echo "Error al obtener los grupos: " . mysqli_error($connection);
    exit();
}

// Contar el número de resultados
$count = mysqli_num_rows($result);

// Mostrar el número de resultados encontrados
echo "<h2>$count grupos encontrados</h2>";

// Mostrar la tabla con los resultados
echo '<table id="studentSearch">';
echo "<tr class='head'>
        <td>ID del Grupo</td>
        <td>Nombre</td>
        <td>Asignatura</td>
        <td>Modalidad</td>
        <td>Horas Semanales</td>
        <td>Fecha de Creación</td>
        <td>Activo</td>
        <td>Intensivo</td>
        <td>Precio</td>
        <td>Horario</td>
    </tr>";

while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
    // Convertir los valores de las columnas "esActivo" y "esIntensivo" a un formato legible
    $row_activado = ($row['esActivo'] == 1) ? "Activo" : "Inactivo";
    $row_intensivo = ($row['esIntensivo'] == 1) ? "Sí" : "No";

    // Comprobar si la fecha es válida (no es NULL o '0000-00-00')
    $fechaCreacion = 'No disponible';
    if ($row['creacion'] != NULL && $row['creacion'] != '0000-00-00') {
        // Si la fecha de creación es válida, formatearla
        $fechaCreacion = date('d-m-Y', strtotime($row['creacion']));
    } else {
        // Si la fecha de creación no es válida, asignar la fecha actual
        $fechaCreacion = date('d-m-Y'); // Fecha actual
    }

    // Decodificar el horario (asumiendo que el valor de 'horario' es un JSON)
    $horario = decodeHorario($row['horario']); // Decodificar el horario

    // Mostrar cada fila de resultados
    echo "<tr>
            <td>{$row['id_grupo']}</td> <!-- Aquí se usa 'id_grupo' -->
            <td>{$row['nombre']}</td>
            <td>{$row['asignatura']}</td>
            <td>{$row['modalidad']}</td>
            <td>{$row['horasSemanales']}</td>
            <td>{$fechaCreacion}</td> <!-- Fecha de creación formateada o la actual -->
            <td>$row_activado</td>
            <td>$row_intensivo</td>
            <td>{$row['precio']}€</td>
            <td>" . safeImplode($horario) . "</td> <!-- Muestra el horario decodificado -->
        </tr>";
}

echo '</table>';

// Cerrar la conexión a la base de datos
mysqli_close($connection);

// Función para decodificar el horario desde JSON
function decodeHorario($encodedHorario) {
    if ($encodedHorario == NULL || $encodedHorario == '') {
        return []; // Si el horario es NULL o vacío, devolvemos un array vacío
    }

    // Si el horario es un string JSON, lo decodificamos
    $decoded = json_decode($encodedHorario, true);
    return ($decoded != null) ? $decoded : []; // Si no se puede decodificar, devolvemos un array vacío
}

// Función para convertir un array a un string separado por comas
function safeImplode($array) {
    // Verificamos si es un array y si no está vacío
    if (is_array($array) && count($array) > 0) {
        return implode(', ', $array); // Convierte el array en una cadena separada por comas
    }
    return ''; // Retorna una cadena vacía si no es un array o el array está vacío
}
?>
