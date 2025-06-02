<?php

// Get search parameters
$profesor = $_GET["profesor"] ?? '';
$nombre = $_GET["nombre"] ?? '';

function parseClassQuery(): array {
    global $profesor, $nombre;

    $conditions = [];
    if ($profesor != '') {
        $conditions[] = "p.id_profesor = '$profesor'";
    }
    if ($nombre != '') {
        $conditions[] = "(a.nombre LIKE '%$nombre%' OR a.apellidos LIKE '%$nombre%')";
    }
    $where = count($conditions) > 0 ? 'WHERE ' . implode(' AND ', $conditions) : '';

    $select = "SELECT 
        c.id_bono, 
        c.id_profesor, 
        c.fechaHora, 
        c.modalidad, 
        c.duracion, 
        c.asignatura,
        p.nombre AS profesor_nombre,
        b.id_alumno,
        a.nombre AS alumno_nombre,
        a.apellidos AS alumno_apellidos
        FROM clasesparticulares AS c
        LEFT JOIN profesores AS p ON c.id_profesor = p.id_profesor
        LEFT JOIN bonos AS b ON c.id_bono = b.id_bono
        LEFT JOIN alumnos AS a ON b.id_alumno = a.id_alumno
        $where
        ORDER BY c.fechaHora DESC
        LIMIT 100";

    $count = "SELECT COUNT(*) FROM clasesparticulares AS c
        LEFT JOIN profesores AS p ON c.id_profesor = p.id_profesor
        LEFT JOIN bonos AS b ON c.id_bono = b.id_bono
        LEFT JOIN alumnos AS a ON b.id_alumno = a.id_alumno
        $where";

    return [$select, $count];
}

function doClassSearch(): void {
    require __DIR__.'/../dbConnect.php';
    require __DIR__.'/../graphics.php';

    $query = parseClassQuery();
    $result = mysqli_query($connection, $query[0]);
    $resultCount = mysqli_query($connection, $query[1]);
    $count = mysqli_fetch_row($resultCount)[0];

    echo "<h2>$count clases</h2>";
    echo '<table id="searchResult">';
    echo "<tr class='head'>
            <td>Fecha y hora</td>
            <td>Profesor</td>
            <td>Alumno</td>
            <td style='width: 150px;'>Datos</td>
        </tr>";

    while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
        // Format fechaHora as 18:09 9/4/25
        $fechaHoraRaw = $row['fechaHora'];
        $fechaHora = '';
        if ($fechaHoraRaw) {
            $dt = DateTime::createFromFormat('Y-m-d H:i:s', $fechaHoraRaw);
            if ($dt) {
                $fechaHora = $dt->format('H:i j/n/y');
            } else {
                $fechaHora = htmlspecialchars($fechaHoraRaw);
            }
        }
        $profesor = htmlspecialchars($row['profesor_nombre']);
        $alumno = htmlspecialchars($row['alumno_apellidos'] . ', ' . $row['alumno_nombre']);
        $asignatura = htmlspecialchars($row['asignatura']);
        $modalidad = htmlspecialchars($row['modalidad']);
        $duracion = htmlspecialchars($row['duracion']);

        $row_modalidad = '';
        if ($row['modalidad'] === 'online') {
            $row_modalidad = "<p class='tooltip' style='padding: 0'>$ico_modeOnline<span>Clase online</span></p>";
        } elseif ($row['modalidad'] === 'presencial') {
            $row_modalidad = "<p class='tooltip' style='padding: 0'>$ico_modePresential<span>Clase presencial</span></p>";
        } else {
            $row_modalidad = "<p class='tooltip' style='padding: 0'>$ico_modeHybrid<span>Clase híbrida</span></p>";
        }

        echo "<tr>
                <td>$fechaHora</td>
                <td>$profesor</td>
                <td>$alumno</td>
                <td>
                <p class='tooltip' style='padding: 0'>
                    <img src='./img/topic.png'>
                    <span>$asignatura</span>
                </p>
                $row_modalidad
                <p class='tooltip' style='padding: 0'>
                    <img src='./img/clock.png'>
                    <span>$duracion min</span>
                </p>
                </td>
            </tr>";
    }
    echo '</table>';

    mysqli_close($connection);
}

doClassSearch();
