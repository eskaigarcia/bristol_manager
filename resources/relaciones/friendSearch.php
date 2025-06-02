<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once realpath(__DIR__ . '/../dbConnect.php');
require_once __DIR__ . '/../graphics.php';

// Sanitización de parámetros
$nombre = isset($_GET["nombre"]) ? trim(mysqli_real_escape_string($connection, $_GET["nombre"])) : '';
$tipo_relacion = isset($_GET["tipo_relacion"]) ? trim(mysqli_real_escape_string($connection, $_GET["tipo_relacion"])) : '';
$activo = isset($_GET["activo"]) ? trim(mysqli_real_escape_string($connection, $_GET["activo"])) : '';

$where = [];

// Filtro por nombre (case insensitive)
if ($nombre !== '') {
    $where[] = "(LOWER(a1.nombre) LIKE LOWER('%" . $nombre . "%') OR LOWER(a2.nombre) LIKE LOWER('%" . $nombre . "%'))";
}

// Filtro por tipo de relación
if ($tipo_relacion !== '' && $tipo_relacion !== 'cualquiera') {
    $where[] = "am.tipoRelacion = '$tipo_relacion'";
}

// Filtro por estado activo/inactivo
if ($activo !== '' && $activo !== 'cualquiera') {
    if ($activo == '1') {
        $where[] = "(am.fechaFin IS NULL OR am.fechaFin > CURDATE())";
    } elseif ($activo == '0') {
        $where[] = "(am.fechaFin IS NOT NULL AND am.fechaFin <= CURDATE())";
    }
}

$where_sql = count($where) > 0 ? 'WHERE ' . implode(' AND ', $where) : '';

// Consulta principal
$query = "
    SELECT 
        am.id_relacion, 
        am.id_alumno1,
        am.id_alumno2,
        CONCAT(a1.apellidos, ', ', a1.nombre) AS nombre1, 
        CONCAT(a2.apellidos, ', ', a2.nombre) AS nombre2, 
        am.tipoRelacion, 
        am.fechaInicio, 
        am.fechaFin,
        CASE 
            WHEN am.fechaFin IS NULL OR am.fechaFin > CURDATE() THEN 'Activo'
            ELSE 'Inactivo'
        END as estado_calculado
    FROM relaciones am
    INNER JOIN alumnos a1 ON am.id_alumno1 = a1.id_alumno
    INNER JOIN alumnos a2 ON am.id_alumno2 = a2.id_alumno
    $where_sql
    ORDER BY am.fechaInicio DESC
    LIMIT 100
";

// Debug de la consulta
error_log("Query ejecutada: " . $query);

$result = mysqli_query($connection, $query);

if (!$result) {
    echo "Error al obtener las relaciones: " . mysqli_error($connection);
    exit();
}

$count = mysqli_num_rows($result);
echo "<h2>$count relaciones encontradas</h2>";

// Tabla de resultados
echo '<table id="searchResult" class="doubledMainCol">';
echo "<tr class='head'>
        <td>Alumno 1</td>
        <td>Alumno 2</td>
        <td style='width: 60px'>Tipo</td>
        <td>Estado</td>
        <td style='width: 120px'>Acciones</td>
    </tr>";

while ($row = mysqli_fetch_assoc($result)) {
    $row_type = ($row['tipoRelacion'] == 'amigo') ? "<p class='tooltip'>$ico_relAmistad<span>Amigos</span></p>" : "<p class='tooltip'>$ico_relFamiliares<span>Familiares</span></p>";
    // Formatear fechas a MM/YYYY
    $fechaInicioFmt = $row['fechaInicio'] ? date('m/Y', strtotime($row['fechaInicio'])) : '';
    $fechaFinFmt = $row['fechaFin'] ? date('m/Y', strtotime($row['fechaFin'])) : '';
    // Estado: activa si fechaFin es null o futura, finalizó si fechaFin es pasada
    if (is_null($row['fechaFin']) || $row['fechaFin'] === '' || $row['fechaFin'] > date('Y-m-d')) {
        $row_estado = "Activa desde " . $fechaInicioFmt;
    } else {
        $row_estado = "Finalizó el " . $fechaFinFmt;
    }

    echo "<tr>
        <td>$row[nombre1]</td>
        <td>$row[nombre2]</td>
        <td style='width: 60px'>$row_type</td>
        <td style='width: 240px'>$row_estado</td>
        <td style='width: 120px'>
            <p class='tooltip' style='cursor: pointer;'>$ico_relcheck<span>Comprobar estado de la relación</span></p>
            <p class='tooltip' style='cursor: pointer;'>$ico_relterminate<span>Terminar relación</span></p>
        </td>
    </tr>";

}

echo '</table>';

mysqli_close($connection);