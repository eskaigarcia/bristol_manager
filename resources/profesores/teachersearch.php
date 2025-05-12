
<?php //alomejor tiar de un contador boton abajo que me mande a la informacion completa sobre todo
require "./resources/dbConnect.php";
$nombre = $_POST['prof_nombre'] ?? '';
$grupos = $_POST['prof_grupos'] ?? '';
$particulares = $_POST['prof_particulares'] ?? '';
$alumnos = $_POST['prof_alumnos'] ?? ''; 

$query = "SELECT p.id_profesor, p.nombre, 
                 COALESCE(COUNT(DISTINCT g.id_grupo), 0) AS total_grupos,
                 COALESCE(COUNT(DISTINCT c.id_clase), 0) AS total_clases,
                 COALESCE(COUNT(DISTINCT ag.id_alumno), 0) + 
                 COALESCE(COUNT(DISTINCT c.id_clase), 0) AS total_alumnos
          FROM profesores p
          LEFT JOIN grupos g ON p.id_profesor = g.id_profesor
          LEFT JOIN alumnosgrupos ag ON g.id_grupo = ag.id_grupo
          LEFT JOIN clasesparticulares c ON p.id_profesor = c.id_profesor
          WHERE 1=1";

if (!empty($nombre)) {
    $query .= " AND p.nombre LIKE '%" . mysqli_real_escape_string($connection, $nombre) . "%'";
}

if (!empty($grupos)) {
    $query .= " AND (SELECT COUNT(*) FROM grupos WHERE grupos.id_profesor = p.id_profesor) = " . mysqli_real_escape_string($connection, $grupos);
}

if (!empty($particulares)) {
    $query .= " AND (SELECT COUNT(*) FROM clasesparticulares WHERE clasesparticulares.id_profesor = p.id_profesor) = " . mysqli_real_escape_string($connection, $particulares);
}

if (!empty($alumnos)) { 
    $query .= " AND (
                    COALESCE((SELECT COUNT(DISTINCT ag.id_alumno) FROM alumnosgrupos ag 
                              JOIN grupos g ON ag.id_grupo = g.id_grupo WHERE g.id_profesor = p.id_profesor), 0) + 
                    COALESCE((SELECT COUNT(DISTINCT c.id_clase) FROM clasesparticulares c 
                              WHERE c.id_profesor = p.id_profesor), 0)
                ) = " . mysqli_real_escape_string($connection, $alumnos);
}

$query .= " GROUP BY p.id_profesor";

$havingConditions = [];

if ($grupos === '0') { 
    $havingConditions[] = "total_grupos = 0";
} elseif (!empty($grupos)) { 
    $havingConditions[] = "total_grupos = " . mysqli_real_escape_string($connection, $grupos);
}

if ($particulares === '0') { 
    $havingConditions[] = "total_clases = 0";
} elseif (!empty($particulares)) { 
    $havingConditions[] = "total_clases = " . mysqli_real_escape_string($connection, $particulares);
}

if ($alumnos === '0') { 
    $havingConditions[] = "total_alumnos = 0";
} elseif (!empty($alumnos)) { 
    $havingConditions[] = "total_alumnos = " . mysqli_real_escape_string($connection, $alumnos);
}

// Agregar HAVING solo si hay condiciones
if (!empty($havingConditions)) {
    $query .= " HAVING " . implode(" AND ", $havingConditions);
}
$result = mysqli_query($connection, $query);

if (!$result) {
    echo "Error en la consulta: " . mysqli_error($connection);
    exit;
}

$count = mysqli_num_rows($result);

echo "<h2>$count profesores encontrados</h2>";
echo '<table id="searchResult">';
echo "<tr class='head'>
        <td style='width:13%;'>ID</td> 
        <td>Nombre del maestro</td>
        <td style='width:13%;'>grupo</td>
        <td style='width:13%;'>clases particulares</td>
        <td>alumnos</td>
        <td>info</td>
      </tr>";

while ($row = mysqli_fetch_assoc($result)) {
    echo "<tr>
            <td>{$row['id_profesor']}</td> 
            <td>{$row['nombre']}</td>
            <td>{$row['total_grupos']}</td>
            <td>{$row['total_clases']}</td>
            <td>{$row['total_alumnos']}</td>
            <td><img class='action' onclick='mostrarDatosProfe({$row['id_profesor']})' src='./img/info.png'></td>
          </tr>";//relllenar el onclick con el archivo que despues haga
          //investigar con los archivos de alumnos que hacer despues para que la info salga 
          
}

echo "</table>";
?>
<script src="/bristol_alumnos/resources/profesores/teacherview.js"></script>