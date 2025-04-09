<?php

// Incluir el archivo con las funciones de codificación y decodificación de horarios
include_once 'codificadorHorario.php';  // Cambia la ruta según corresponda

// Variables de búsqueda
$s_nombre = $_GET["g_nombre"] ?? '';
$s_asignatura = $_GET["g_asignatura"] ?? '';
$s_modalidad = $_GET["g_modalidad"] ?? '';
$s_precio = $_GET["g_precio"] ?? '';
$s_horasSemanales = $_GET["g_horasSemanales"] ?? '';
$s_esActivo = $_GET["g_esActivo"] ?? '';

// Función para generar la consulta
function parseQuery(): array {
    global $s_nombre, $s_asignatura, $s_modalidad, $s_precio, $s_horasSemanales, $s_esActivo;

    $theCondition = '';
    if ($s_nombre != '') $theCondition .= ($theCondition != '' ? ' AND ' : '') . "nombre LIKE '%$s_nombre%'"; 
    if ($s_asignatura != '') $theCondition .= ($theCondition != '' ? ' AND ' : '') . "asignatura LIKE '%$s_asignatura%'"; 
    if ($s_modalidad != '') $theCondition .= ($theCondition != '' ? ' AND ' : '') . "modalidad LIKE '%$s_modalidad%'"; 
    if ($s_precio != '') $theCondition .= ($theCondition != '' ? ' AND ' : '') . "precio LIKE '$s_precio'"; 
    if ($s_horasSemanales != '') $theCondition .= ($theCondition != '' ? ' AND ' : '') . "horasSemanales LIKE '$s_horasSemanales'"; 
    if ($s_esActivo != '') $theCondition .= ($theCondition != '' ? ' AND ' : '') . "esActivo = $s_esActivo";

    if ($theCondition == '') $theCondition = 1;

    $theQuery = "SELECT id_grupo, nombre, asignatura, modalidad, horasSemanales, creacion, esActivo, esIntensivo, precio, horarioDias, horarioHoras, horarioDuraciones FROM grupos WHERE $theCondition LIMIT 100";
    $theCounter = "SELECT COUNT(id_grupo) FROM grupos WHERE $theCondition LIMIT 100";

    return [$theQuery, $theCounter];
}

// Función para realizar la búsqueda
function doSearch(): void {
    require './resources/dbConnect.php';  // Asegúrate de tener la conexión

    // Ejecutar la consulta
    $query = parseQuery();
    $result = mysqli_query(mysql: $connection, query: $query[0]);
    $resultCount = mysqli_query(mysql: $connection, query: $query[1]);
    $count = mysqli_fetch_row(result: $resultCount)[0];

    // Mostrar el número de resultados
    echo "<h2>$count grupos encontrados</h2>";
    echo '<table id="groupSearch">';
    echo "<tr class='head'>
                <td>Nombre</td>
                <td>Asignatura</td>
                <td>Modalidad</td>
                <td>Horas Semanales</td>
                <td>Creación</td>
                <td>Activo</td>
                <td>Intensivo</td>
                <td>Precio</td>
                <td>Horario Días</td>
                <td>Horario Horas</td>
                <td>Horario Duraciones</td>
            </tr>";

    // Imprimir los resultados de los grupos
    while ($row = mysqli_fetch_array(result: $result, mode: MYSQLI_ASSOC)) {

        // Evaluar el estado de activación e intensidad del grupo
        $row_activado = ($row['esActivo'] == 1) ? "Activo" : "Inactivo";
        $row_intensivo = ($row['esIntensivo'] == 1) ? "Sí" : "No";

        // Decodificar los horarios usando tu función helper
        $horarioDias = decodeHorario($row['horarioDias']);
        $horarioHoras = decodeHorario($row['horarioHoras']);
        $horarioDuraciones = decodeHorario($row['horarioDuraciones']);

        // Depuración
        var_dump($horarioDias);  // Ver qué devuelve
        var_dump($horarioHoras); // Ver qué devuelve
        var_dump($horarioDuraciones); // Ver qué devuelve

        // Imprimir los resultados de los grupos
        echo "<tr>
                <td>$row[nombre]</td>
                <td>$row[asignatura]</td>
                <td>$row[modalidad]</td>
                <td>$row[horasSemanales]</td>
                <td>$row[creacion]</td>
                <td>$row_activado</td>
                <td>$row_intensivo</td>
                <td>$row[precio]</td>
                <td>" . (empty($horarioDias) ? "No disponible" : implode(", ", $horarioDias)) . "</td>
                <td>" . (empty($horarioHoras) ? "No disponible" : implode(", ", $horarioHoras)) . "</td>
                <td>" . (empty($horarioDuraciones) ? "No disponible" : implode(", ", $horarioDuraciones)) . "</td>
            </tr>";
    }
    echo '</table>';

    // Cerrar la conexión
    mysqli_close(mysql: $connection);
}

// Llamar a la función para realizar la búsqueda
doSearch();
?>
