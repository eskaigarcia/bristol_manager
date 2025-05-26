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
        a1.nombre AS nombre1, 
        a2.nombre AS nombre2, 
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
echo '<table id="searchResult">';
echo "<tr class='head'>
        <td>Alumno 1</td>
        <td>Alumno 2</td>
        <td>Tipo</td>
        <td>Estado</td>
        <td>Desde</td>
        <td>Hasta</td>
        <td>Acciones</td>
    </tr>";

while ($row = mysqli_fetch_assoc($result)) {
    $estado = $row['estado_calculado'];
    $fechaFin = $row['fechaFin'] ? htmlspecialchars($row['fechaFin']) : '---';

    echo "<tr data-idrelacion='" . intval($row['id_relacion']) . "'>
            <td style='width: 120px; max-width: 120px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;' 
                title='" . htmlspecialchars($row['nombre1']) . "'>" . 
                htmlspecialchars($row['nombre1']) . 
            "</td>
            <td>" . htmlspecialchars($row['nombre2']) . "</td>
            <td>" . htmlspecialchars($row['tipoRelacion']) . "</td>
            <td class='estado-celda'>" . $estado . "</td>
            <td style='white-space: nowrap;'>" . htmlspecialchars($row['fechaInicio']) . "</td>
            <td style='white-space: nowrap;'>" . $fechaFin . "</td>
            <td>
                <div style='margin-bottom: 4px;'>
                    <button onclick='relMgr.testIsActiveStudentPrompt(" . intval($row['id_alumno1']) . ")' 
                            data-idalumno1='" . intval($row['id_alumno1']) . "' 
                            data-idalumno2='" . intval($row['id_alumno2']) . "'>
                        Ver estado
                    </button>
                </div>
                <div>
                    <button onclick='relMgr.endFriendRelationshipConfirm(" . intval($row['id_relacion']) . ")'>
                        Finalizar
                    </button>
                </div>
            </td>
        </tr>";
}

echo '</table>';

mysqli_close($connection);
?>