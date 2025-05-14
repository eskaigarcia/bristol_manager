<?php
require_once realpath(__DIR__ . '/../dbConnect.php');

$nombre = isset($_GET["nombre"]) ? mysqli_real_escape_string($connection, $_GET["nombre"]) : '';
$tipo_relacion = isset($_GET["tipo_relacion"]) ? mysqli_real_escape_string($connection, $_GET["tipo_relacion"]) : '';
$activo = isset($_GET["activo"]) ? mysqli_real_escape_string($connection, $_GET["activo"]) : '';

$where = [];

if ($nombre !== '') {
    $where[] = "(a1.nombre LIKE '%$nombre%' OR a2.nombre LIKE '%$nombre%')";
}

if ($tipo_relacion !== '' && $tipo_relacion !== 'cualquiera') {
    $where[] = "am.tipoRelacion = '$tipo_relacion'";
}

if ($activo !== '' && $activo !== 'cualquiera') {
    if ($activo == '1') {
        $where[] = "(am.fechaFin IS NULL OR am.fechaFin > CURDATE())";
    } elseif ($activo == '0') {
        $where[] = "am.fechaFin <= CURDATE()";
    }
}

$where_sql = count($where) > 0 ? 'WHERE ' . implode(' AND ', $where) : '';

$query = "
    SELECT 
        am.id_relacion, 
        a1.nombre AS nombre1, 
        a2.nombre AS nombre2, 
        am.tipoRelacion, 
        am.fechaInicio, 
        am.fechaFin
    FROM relaciones am
    INNER JOIN alumnos a1 ON am.id_alumno1 = a1.id_alumno
    INNER JOIN alumnos a2 ON am.id_alumno2 = a2.id_alumno
    $where_sql
    ORDER BY am.fechaInicio DESC
    LIMIT 100
";

$result = mysqli_query($connection, $query);

if (!$result) {
    echo "Error al obtener las relaciones: " . mysqli_error($connection);
    exit();
}

$count = mysqli_num_rows($result);
echo "<h2>$count relaciones encontradas</h2>";

echo '<table id="searchResult">';
echo "<thead>
        <tr class='head'>
            <th>Alumno 1</th>
            <th>Alumno 2</th>
            <th>Tipo</th>
            <th>Estado</th>
            <th>Desde</th>
            <th>Hasta</th>
            <th>Info</th>
        </tr>
      </thead><tbody>";

while ($row = mysqli_fetch_assoc($result)) {
    $estado = (is_null($row['fechaFin']) || $row['fechaFin'] > date('Y-m-d')) ? 'Activo' : 'Inactivo';
    $fechaFin = $row['fechaFin'] ? $row['fechaFin'] : '---';

    echo "<tr>
            <td>{$row['nombre1']}</td>
            <td>{$row['nombre2']}</td>
            <td>{$row['tipoRelacion']}</td>
            <td>$estado</td>
            <td>{$row['fechaInicio']}</td>
            <td>$fechaFin</td>
            <td>
                <p class='tooltip'>
                    <img class='action' src='./img/info.png' onclick='getFriendDetails({$row["id_relacion"]})'>
                    <span>Ver detalles</span>
                </p>
            </td>
        </tr>";
}

echo '</tbody></table>';

mysqli_close($connection);
?>
