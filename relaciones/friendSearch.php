<?php

require __DIR__.'/../dbConnect.php'; // Asegúrate de que la conexión a la base de datos es correcta

// Parse filters from GET (ahora para amigos)
$nombre = $_GET["nombre"] ?? '';
$tipo_relacion = $_GET["tipo_relacion"] ?? '';
$activo = $_GET["activo"] ?? '';

// Build WHERE clause (esto va a filtrar las relaciones de amigos)
$where = '';
if ($nombre !== '') $where .= ($where ? ' AND ' : '') . "nombre LIKE '%$nombre%'";
if ($tipo_relacion !== '') $where .= ($where ? ' AND ' : '') . "tipo_relacion = '$tipo_relacion'";
if ($activo !== '') $where .= ($where ? ' AND ' : '') . "activo = " . (intval($activo));

// Si no hay filtros, buscamos todos
if ($where === '') $where = '1';

// Query para obtener las relaciones de amigos
$query = "SELECT id_amigo, nombre, tipo_relacion, estado 
          FROM amigos 
          WHERE $where LIMIT 100";  // Cambia la tabla y los campos según tu base de datos
$result = mysqli_query($connection, $query);

if (!$result) {
    echo "Error al obtener los amigos: " . mysqli_error($connection);
    exit();
}

$count = mysqli_num_rows($result);
echo "<h2>$count amigos encontrados</h2>";

echo '<table id="searchResult">';
echo "<tr class='head'>
        <td>Nombre</td>
        <td>Tipo de Relación</td>
        <td>Estado</td>
        <td>Detalles</td>
    </tr>";

while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
    // Formatear el estado
    $estado = ($row['estado'] == 1) ? 'Activo' : 'Inactivo';

    echo "<tr>
            <td>{$row['nombre']}</td>
            <td>{$row['tipo_relacion']}</td>
            <td>$estado</td>
            <td>
                <p class='tooltip'>
                    <img class='action' onclick='getFriendDetails({$row['id_amigo']})' src='./img/info.png'>
                    <span>Detalles</span>
                </p>
            </td>
        </tr>";
}

echo '</table>';

mysqli_close($connection);
?>
