<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
header('Content-Type: application/json');

require __DIR__.'/../dbConnect.php';

$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if (!$id) {
    echo json_encode(["error" => "ID de profesor no proporcionado"]);
    exit;
}

// Obtener datos del profesor
$query_prof = "SELECT id_profesor, nombre FROM profesores WHERE id_profesor = $id";
$result_prof = mysqli_query($connection, $query_prof);
if (!$result_prof || mysqli_num_rows($result_prof) == 0) {
    echo json_encode(["error" => "Profesor no encontrado"]);
    exit;
}
$profesor = mysqli_fetch_assoc($result_prof);

// Obtener grupos activos (normales e intensivos) y sus alumnos
$query_groups = "
    SELECT 
        g.id_grupo, g.nombre AS grupo_nombre, g.modalidad, g.esIntensivo, g.horario,
        a.id_alumno, a.nombre AS alumno_nombre, a.apellidos
    FROM grupos g
    LEFT JOIN alumnosgrupos ag ON g.id_grupo = ag.id_grupo
    LEFT JOIN alumnos a ON ag.id_alumno = a.id_alumno
    WHERE g.id_profesor = $id AND g.esActivo = 1
    ORDER BY g.esIntensivo DESC, g.nombre, a.nombre
";
$result_groups = mysqli_query($connection, $query_groups);

$groups = [];
while ($row = mysqli_fetch_assoc($result_groups)) {
    $gid = $row['id_grupo'];
    if (!isset($groups[$gid])) {
        $groups[$gid] = [
            'id_grupo' => $gid,
            'nombre' => $row['grupo_nombre'],
            'modalidad' => $row['modalidad'],
            'esIntensivo' => $row['esIntensivo'],
            'horario' => $row['horario'],
            'alumnos' => []
        ];
    }
    if ($row['id_alumno']) {
        $groups[$gid]['alumnos'][] = [
            'id_alumno' => $row['id_alumno'],
            'nombre' => $row['alumno_nombre'],
            'apellidos' => $row['apellidos']
        ];
    }
}
$groups = array_values($groups);

// Obtener clases particulares de este mes con nombre de alumno
$query_particulares = "
    SELECT 
        cp.id_clase, cp.FechaHora, b.id_alumno, a.nombre AS alumno_nombre, a.apellidos,
        cp.asignatura, cp.modalidad, cp.duracion
    FROM clasesparticulares cp
    LEFT JOIN bonos b ON cp.id_bono = b.id_bono
    LEFT JOIN alumnos a ON b.id_alumno = a.id_alumno
    WHERE cp.id_profesor = $id
      AND MONTH(cp.FechaHora) = MONTH(CURDATE())
      AND YEAR(cp.FechaHora) = YEAR(CURDATE())
    ORDER BY cp.FechaHora DESC
";
$result_particulares = mysqli_query($connection, $query_particulares);

$particulares = [];
while ($row = mysqli_fetch_assoc($result_particulares)) {
    $particulares[] = [
        'id_clase' => $row['id_clase'],
        'FechaHora' => $row['FechaHora'],
        'id_alumno' => $row['id_alumno'],
        'nombre' => $row['alumno_nombre'],
        'apellidos' => $row['apellidos'],
        'asignatura' => $row['asignatura'],
        'modalidad' => $row['modalidad'],
        'duracion' => $row['duracion']
    ];
}

mysqli_close($connection);

echo json_encode([
    'profesor' => $profesor,
    'grupos' => $groups,
    'particulares' => $particulares
]);
?>