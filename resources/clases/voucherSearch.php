<?php

// Get search parameters
$alumno = $_GET["alumno"] ?? '';

function parseVoucherQuery(): array {
    global $alumno;

    $conditions = [];
    if ($alumno != '') {
        $conditions[] = "(a.nombre LIKE '%$alumno%' OR a.apellidos LIKE '%$alumno%' OR CONCAT(a.nombre, ' ', a.apellidos) LIKE '%$alumno%' OR CONCAT(a.apellidos, ' ', a.nombre) LIKE '%$alumno%')";
    }
    $where = count($conditions) > 0 ? 'WHERE ' . implode(' AND ', $conditions) : '';

    $select = "SELECT 
        b.id_bono,
        CONCAT(a.nombre, ' ', a.apellidos) AS nombreCompleto,
        b.cantidadClases,
        b.caducidad,
        (
            SELECT COUNT(*) FROM clasesparticulares c WHERE c.id_bono = b.id_bono
        ) AS clasesUtilizadas
        FROM bonos b
        LEFT JOIN alumnos a ON b.id_alumno = a.id_alumno
        $where
        ORDER BY b.caducidad DESC
        LIMIT 100";

    $count = "SELECT COUNT(*) FROM bonos b
        LEFT JOIN alumnos a ON b.id_alumno = a.id_alumno
        $where";

    return [$select, $count];
}

function doVoucherSearch(): void {
    require __DIR__.'/../dbConnect.php';
    require __DIR__.'/../graphics.php';

    $query = parseVoucherQuery();
    $result = mysqli_query($connection, $query[0]);
    $resultCount = mysqli_query($connection, $query[1]);
    $count = mysqli_fetch_row($resultCount)[0];

    echo "<h2>$count bonos</h2>";
    echo '<table id="searchResult">';
    echo "<tr class='head'>
            <td>Alumno</td>
            <td>Clases (libres)</td>
            <td style='width: 68px;'>Estado</td>
            <td>Info</td>
        </tr>";

    while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
        $id_bono = htmlspecialchars((string)($row['id_bono'] ?? ''));
        $nombreCompleto = htmlspecialchars((string)($row['nombreCompleto'] ?? ''));
        $cantidadClases = htmlspecialchars((string)($row['cantidadClases'] ?? ''));
        $clasesUtilizadas = htmlspecialchars((string)($row['clasesUtilizadas'] ?? ''));
        $caducidadRaw = $row['caducidad'] ?? '';
        $caducidad = '';
        if ($caducidadRaw) {
            $dt = DateTime::createFromFormat('Y-m-d', $caducidadRaw);
            $caducidad = $dt ? $dt->format('j/n/Y') : htmlspecialchars((string)$caducidadRaw);
        }

        $clasesDisponibles = $cantidadClases - $clasesUtilizadas;

        $estado = '';
        if ($caducidadRaw) {
            $now = new DateTime();
            $dt = DateTime::createFromFormat('Y-m-d', $caducidadRaw);
            if ($dt && $dt > $now) {
                $estado = "<p class='tooltip'>$ico_valid<span>Caduca el $caducidad</span></p>";
            } else {
                $estado = "<p class='tooltip'>$ico_groupInactive<span>Caducó el $caducidad</span></p>";
            }
        }

        echo "<tr>
                <td>$nombreCompleto</td>
                <td><strong>$cantidadClases</strong> ($clasesDisponibles)</td>
                <td style='width: 68px;'>$estado</td>
                <td>
                    <p class='tooltip'><img class='action' onclick='getVoucherDetails($id_bono)' src='./img/info.png'><span>Detalles</span></p>
                </td>
            </tr>";
    }
    echo '</table>';

    mysqli_close($connection);
}

doVoucherSearch();
