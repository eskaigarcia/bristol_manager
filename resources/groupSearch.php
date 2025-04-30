<?php

function doGroupSearch(): void {
    require './resources/dbConnect.php';

    $query = "SELECT id_grupo, nombre, asignatura, modalidad, creacion, horasSemanales, esActivo, esIntensivo, precio, horario FROM grupos";
    $result = mysqli_query($connection, $query);

    if (!$result) {
        echo "Error al obtener los grupos: " . mysqli_error($connection);
        exit();
    }

    $count = mysqli_num_rows($result);
    echo "<h2>$count grupos encontrados</h2>";

    echo '<table id="studentSearch">';
    echo "<tr class='head'>
            <td>Nombre</td>
            <td>Asignatura</td>
            <td>Modalidad</td>
            <td>Fecha de creación</td>
            <td>Horas Semanales</td>
            <td>Activo</td>
            <td>Intensivo</td>
            <td>Precio</td>
            <td>Horario</td>
        </tr>";

    while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
        echo printGroupRow($row);
    }

    echo '</table>';

    mysqli_close($connection);
}

function printGroupRow(array $row): string {
    $activo = ($row['esActivo'] == 1) ? "Activo" : "Inactivo";
    $intensivo = ($row['esIntensivo'] == 1) ? "Sí" : "No";

    $horario = decodeHorario($row['horario']);
    $horarioFormateado = formatHorario($horario);

    $fechaSolo = substr($row['creacion'], 0, 10);

    return "<tr>
                
                <td>{$row['nombre']}</td>
                <td>{$row['asignatura']}</td>
                <td>{$row['modalidad']}</td>
                <td>{$fechaSolo}</td>
                <td>{$row['horasSemanales']}</td>
                <td>{$activo}</td>
                <td>{$intensivo}</td>
                <td>{$row['precio']}€</td>
                <td>{$horarioFormateado}</td>
            </tr>";
}

function decodeHorario(?string $encodedHorario): array {
    if (empty($encodedHorario)) return [];
    $decoded = json_decode($encodedHorario, true);
    return $decoded ?? [];
}

function formatHorario(array $horario): string {
    if (empty($horario)) return 'No disponible';

    $dias = isset($horario['dias']) ? implode(', ', $horario['dias']) : '';
    $horas = isset($horario['horas']) ? implode(', ', $horario['horas']) : '';
    $duraciones = isset($horario['duraciones']) ? implode(', ', $horario['duraciones']) : '';

    return "Días: $dias<br>Horas: $horas<br>Duraciones: $duraciones min";
}

doGroupSearch();

?>