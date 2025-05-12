<?php

require_once realpath(__DIR__ . '/../dbConnect.php');

$nombre = $_GET["nombre"] ?? '';
$tipo_relacion = $_GET["tipo_relacion"] ?? '';
$activo = $_GET["activo"] ?? '';

// Construir la cláusula WHERE
$where = [];
if ($nombre !== '') {
    $where[] = "(a1.nombre LIKE '%$nombre%' OR a2.nombre LIKE '%$nombre%')";
}
if ($tipo_relacion !== '') {
    $where[] = "am.tipoRelacion = '$tipo_relacion'";
}
if ($activo !== '') {
    if ($activo == '1') {
        $where[] = "(am.fechaFin IS NULL OR am.fechaFin > CURDATE())";
    } else {
        $where[] = "am.fechaFin <= CURDATE()";
    }
}

$where_sql = count($where) > 0 ? 'WHERE ' . implode(' AND ', $where) : '';

// Consulta SQL
$query = "
    SELECT 
        am.id_relacion, 
        a1.nombre AS nombre1, 
        a2.nombre AS nombre2, 
        am.tipoRelacion, 
        am.fechaInicio, 
        am.fechaFin
    FROM amigo am
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
echo "<tr class='head'>
        <td>Alumno 1</td>
        <td>Alumno 2</td>
        <td>Tipo</td>
        <td>Estado</td>
        <td>Desde</td>
        <td>Hasta</td>
    </tr>";

while ($row = mysqli_fetch_assoc($result)) {
    $estado = (is_null($row['fechaFin']) || $row['fechaFin'] > date('Y-m-d')) ? 'Activo' : 'Inactivo';
    echo "<tr>
            <td>{$row['nombre1']}</td>
            <td>{$row['nombre2']}</td>
            <td>{$row['tipoRelacion']}</td>
            <td>$estado</td>
            <td>{$row['fechaInicio']}</td>
            <td>{$row['fechaFin'] ?? '---'}</td>
        </tr>";
}

echo '</table>';

mysqli_close($connection);
