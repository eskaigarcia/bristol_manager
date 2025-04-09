<?php

$s_nombre = $_GET["g_nombre"] ?? '';
$s_asignatura = $_GET["g_asignatura"] ?? '';
$s_modalidad = $_GET["g_modalidad"] ?? '';
$s_precio = $_GET["g_precio"] ?? '';
$s_horasSemanales = $_GET["g_horasSemanales"] ?? '';
$s_esActivo = $_GET["g_esActivo"] ?? '';

function decodeHorario($encodedHorario) {
    if ($encodedHorario == NULL) {
        return [];
    }

    $decoded = json_decode($encodedHorario, true);

    if ($decoded === null) {
        return [];
    }

    return $decoded;
}

// Define la función safeImplode fuera del ciclo
function safeImplode($array) {
    // Verifica si el valor es un array y si no es vacío, lo convierte en una cadena
    if (is_array($array)) {
        return implode(', ', $array);
    }
    return ''; // Si no es un array, devuelve una cadena vacía
}

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

function doSearch(): void {
    require './resources/dbConnect.php';  

    $query = parseQuery();
    $result = mysqli_query(mysql: $connection, query: $query[0]);
    $resultCount = mysqli_query(mysql: $connection, query: $query[1]);
    $count = mysqli_fetch_row(result: $resultCount)[0];

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

    while ($row = mysqli_fetch_array(result: $result, mode: MYSQLI_ASSOC)) {

        $row_activado = ($row['esActivo'] == 1) ? "Activo" : "Inactivo";
        $row_intensivo = ($row['esIntensivo'] == 1) ? "Sí" : "No";

        $horarioDias = decodeHorario($row['horarioDias']);
        $horarioHoras = decodeHorario($row['horarioHoras']);
        $horarioDuraciones = decodeHorario($row['horarioDuraciones']);

        echo "<tr>
                <td>$row[nombre]</td>
                <td>$row[asignatura]</td>
                <td>$row[modalidad]</td>
                <td>$row[horasSemanales]</td>
                <td>$row[creacion]</td>
                <td>$row_activado</td>
                <td>$row_intensivo</td>
                <td>$row[precio]</td>
                <td>" . safeImplode($horarioDias) . "</td>
                <td>" . safeImplode($horarioHoras) . "</td>
                <td>" . safeImplode($horarioDuraciones) . "</td>
            </tr>";
    }
    echo '</table>';

    mysqli_close(mysql: $connection);
}

doSearch();

?>
