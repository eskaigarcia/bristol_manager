<?php //alomejor tiar de un contador boton abajo que me mande a la informacion completa sobre todo
require "dbConnect.php";

// Capturar el nombre del formulario
$nombre = $_POST['prof_nombre'] ?? '';

// Construir la consulta SQL solo con el filtro de nombre
$query = "SELECT id_profesor, nombre FROM profesores WHERE 1=1";

if (!empty($nombre)) {
    $query .= " AND nombre LIKE '%" . mysqli_real_escape_string($connection, $nombre) . "%'";
}


$query = "SELECT p.id_profesor, p.nombre, 
                 COALESCE(COUNT(DISTINCT g.id_grupo), 0) AS total_grupos,
                 COALESCE(COUNT(DISTINCT c.id_clase), 0) AS total_clases
          FROM profesores p
          LEFT JOIN grupos g ON p.id_profesor = g.id_profesor
          LEFT JOIN clasesparticulares c ON p.id_profesor = c.id_profesor
          GROUP BY p.id_profesor";


$result = mysqli_query($connection, $query);

if (!$result) {
    echo "Error al obtener los maestros: " . mysqli_error($connection);
    exit();
}


$count = mysqli_num_rows($result);

echo "<h2>$count profesores encontrados</h2>";
echo '<table id="studentSearch">';
echo "<tr class='head'>
        <td style='width:13%;'>ID</td> 
        <td>Nombre del maestro</td>
        <td>grupo</td>
        <td>clases particulares</td>
      </tr>";

while ($row = mysqli_fetch_assoc($result)) {
    echo "<tr>
            <td>{$row['id_profesor']}</td> 
            <td>{$row['nombre']}</td>
            <td>{$row['total_grupos']}</td>
            <td>{$row['total_clases']}</td>
          </tr>";
}

echo "</table>";
?>