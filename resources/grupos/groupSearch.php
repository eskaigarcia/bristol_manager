<?php

require __DIR__.'/../dbConnect.php';

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
    $activo = ($row['esActivo'] == 1) ? "Activo" : "Inactivo";
    $intensivo = ($row['esIntensivo'] == 1) ? "Sí" : "No";

    $fechaSolo = substr($row['creacion'], 0, 10);

    echo "<tr>
                <td>{$row['nombre']}</td>
                <td>{$row['asignatura']}</td>
                <td> </td>
                <td>{$fechaSolo}</td>
                <td>{$row['horasSemanales']}</td>
                <td>{$row['precio']}€</td>
                <td><button onclick='getGroupDetails({$row["id_grupo"]})'>Info</button></td>
            </tr>";
}

echo '</table>';

mysqli_close($connection);