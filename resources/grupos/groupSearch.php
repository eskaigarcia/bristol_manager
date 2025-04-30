<?php

require __DIR__.'/../dbConnect.php';
require __DIR__.'/../graphics.php';

// Parse filters from GET
$nombre = $_GET["nombre"] ?? '';
$profesor = $_GET["profesor"] ?? '';
$precio_min = $_GET["precio_min"] ?? '';
$precio_max = $_GET["precio_max"] ?? '';
$horasSemanales = $_GET["horasSemanales"] ?? '';
$curso = $_GET["curso"] ?? '';
$modalidad = $_GET["modalidad"] ?? '';
$intensivo = $_GET["intensivo"] ?? '';

// Build WHERE clause
$where = '';
if ($nombre !== '') $where .= ($where ? ' AND ' : '') . "nombre LIKE '%$nombre%'";
// if ($profesor !== '') $where .= ($where ? ' AND ' : '') . "id_profesor = '$profesor'";
if ($precio_min !== '') $where .= ($where ? ' AND ' : '') . "precio >= " . (intval($precio_min) * 100);
if ($precio_max !== '') $where .= ($where ? ' AND ' : '') . "precio <= " . (intval($precio_max) * 100);
if ($horasSemanales !== '') $where .= ($where ? ' AND ' : '') . "horasSemanales = " . (floatval($horasSemanales) * 2);
if ($modalidad !== '') $where .= ($where ? ' AND ' : '') . "modalidad = '$modalidad'";
// if ($intensivo !== '') $where .= ($where ? ' AND ' : '') . "esIntensivo = " . (intval($intensivo));

// Curso (año académico)
if ($curso !== '') {
    // $curso format: "2024"
    $year = intval($curso);
    $start_date = ($year - 1) . "-08-01";
    $end_date = ($year + 1) . "-07-31";
    $where .= ($where ? ' AND ' : '') . "(creacion >= '$start_date' AND creacion <= '$end_date')";
}

if ($where === '') $where = '1';

$query = "SELECT id_grupo, id_profesor, nombre, modalidad, creacion, horasSemanales, esActivo, esIntensivo, precio, horario FROM grupos WHERE $where LIMIT 100";
$result = mysqli_query($connection, $query);

if (!$result) {
    echo "Error al obtener los grupos: " . mysqli_error($connection);
    exit();
}

$count = mysqli_num_rows($result);
echo "<h2>$count grupos encontrados</h2>";

echo '<table id="searchResult">';
echo "<tr class='head'>
        <td>Nombre</td>
        <td>Profesor</td>
        <td>Curso</td>
        <td class='mini'>H/sem</td>
        <td class='mini'>Precio</td>
        <td>Detalles</td>
        <td>Info</td>
    </tr>";

while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
    // Calcular el curso a partir de la fecha de creación
    $creacion = $row['creacion'];
    $year = intval(substr($creacion, 0, 4));
    $mes = intval(substr($creacion, 5, 2));
    if ($mes >= 8) {
        $curso = $year . '/' . ($year + 1);
    } else {
        $curso = ($year - 1) . '/' . $year;
    }

    // Calcular las horas de clase
    $horas = $row['horasSemanales'] / 2 . 'h';

    // Calcular el precio
    $precio = $row['precio'] / 100;

    // Evaluate booleans
    $row_activo = ($row['esActivo'] == 1) ? "<p class='tooltip'>$ico_groupActive<span>Grupo activo</span></p>" : "<p class='tooltip'>$ico_groupInactive<span>Grupo inactivo</span></p>";
    $row_intensivo = ($row['esIntensivo'] == 1) ? "<p class='tooltip'>$ico_groupIntensivo<span>Grupo intensivo</span></p>" : "<p class='tooltip'>$ico_groupRecurrente<span>Grupo recurrente</span></p>";
    $row_modalidad = '';
    if ($row['modalidad'] === 'online') {
        $row_modalidad = "<p class='tooltip'>$ico_modeOnline<span>Grupo online</span></p>";
    } elseif ($row['modalidad'] === 'presencial') {
        $row_modalidad = "<p class='tooltip'>$ico_modePresential<span>Grupo presencial</span></p>";
    } else {
        $row_modalidad = "<p class='tooltip'>$ico_modeHybrid<span>Grupo híbrido</span></p>";
    }

    echo "<tr>
            <td>{$row['nombre']}</td>
            <td> </td>
            <td>$curso</td>
            <td class='mini'>{$horas}</td>
            <td class='mini'>{$precio}€</td>
            <td>{$row_modalidad} {$row_intensivo} {$row_activo}</td>
            <td>
                <p class='tooltip'><img class='action' onclick='getGroupDetails($row[id_grupo])' src='./img/info.png'><span>Detalles</span></p>
            </td>
        </tr>";
}

echo '</table>';

mysqli_close($connection);