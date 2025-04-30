<?php

require __DIR__.'/../dbConnect.php';
require __DIR__.'/../graphics.php';

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
        <td>Detalles</td>
        <td>Curso</td>
        <td>H/sem</td>
        <td>Precio</td>
        <td>Info</td>
    </tr>";

while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
    // Calcular el curso a partir de la fecha de creación
    $creacion = $row['creacion']; // formato YYYY-MM-DD
    $year = intval(substr($creacion, 0, 4));
    $mes = intval(substr($creacion, 5, 2));
    if ($mes >= 8) {
        $curso = $year . '/' . ($year + 1);
    } else {
        $curso = ($year - 1) . '/' . $year;
    }

    // Calcular el precio
    $precio = $row['precio'] / 100;

    // Evaluate booleans
    $row_activo = ($row['esActivo'] == 1) ? "<p class='tooltip'>$ico_groupActive<span>Grupo activo</span></p>" : "<p class='tooltip'>$ico_groupInactive<span>Grupo inactivo</span></p>";
    $row_intensivo = ($row['esIntensivo'] == 1) ? "<p class='tooltip'>$ico_groupIntensivo<span>Grupo intensivo</span></p>" : "<p class='tooltip'>$ico_groupRecurrente<span>Grupo recurrente</span></p>";

    echo "<tr>
                <td>{$row['nombre']}</td>
                <td>{$row['asignatura']}</td>
                <td>{$row_activo} {$row_intensivo}</td>
                <td>$curso</td>
                <td>{$row['horasSemanales']}</td>
                <td>{$precio}€</td>
                <td><button onclick='getGroupDetails({$row["id_grupo"]})'>Info</button></td>
            </tr>";
}

echo '</table>';

mysqli_close($connection);