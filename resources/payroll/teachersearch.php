<?php

require __DIR__.'/../dbConnect.php';
require __DIR__.'/../graphics.php';

// Complex query: get profesores, count of active groups and unique students, split by esIntensivo
$query = "
SELECT 
    p.id_profesor,
    p.nombre,
    -- Grupos normales (esIntensivo = 0)
    COUNT(DISTINCT CASE WHEN g.esIntensivo = 0 THEN g.id_grupo END) AS total_grupos,
    COUNT(DISTINCT CASE WHEN g.esIntensivo = 0 THEN ag.id_alumno END) AS total_alumnos,
    -- Grupos intensivos (esIntensivo = 1)
    COUNT(DISTINCT CASE WHEN g.esIntensivo = 1 THEN g.id_grupo END) AS total_intensivos,
    COUNT(DISTINCT CASE WHEN g.esIntensivo = 1 THEN ag.id_alumno END) AS total_alumnos_intensivos,
    -- Particulares: clases and unique alumnos this month
    COUNT(DISTINCT CASE WHEN MONTH(cp.FechaHora) = MONTH(CURDATE()) AND YEAR(cp.FechaHora) = YEAR(CURDATE()) THEN cp.id_clase END) AS total_particulares,
    COUNT(DISTINCT CASE WHEN MONTH(cp.FechaHora) = MONTH(CURDATE()) AND YEAR(cp.FechaHora) = YEAR(CURDATE()) THEN b.id_alumno END) AS total_alumnos_particulares
FROM profesores p
LEFT JOIN grupos g 
    ON p.id_profesor = g.id_profesor
    AND g.esActivo = 1
LEFT JOIN alumnosgrupos ag 
    ON g.id_grupo = ag.id_grupo
LEFT JOIN clasesparticulares cp
    ON p.id_profesor = cp.id_profesor
LEFT JOIN bonos b
    ON cp.id_bono = b.id_bono
GROUP BY p.id_profesor, p.nombre
ORDER BY p.nombre
";

$result = mysqli_query($connection, $query);

if (!$result) {
    echo "Error en la consulta: " . mysqli_error($connection);
    exit();
}

$count = mysqli_num_rows($result);

echo "<h2>$count profesores encontrados</h2>";
echo '<table id="searchResult">';
echo "<tr class='head'>
        <td>Profesor</td>
        <td class='longData'>Grupos (Alumnos)</td>
        <td class='longData'>Grupos intensivos (alumnos)</td>
        <td class='longData'>Alumnos particulares (sesiones)</td>
        <td>info</td>
      </tr>";

while ($row = mysqli_fetch_assoc($result)) {
    echo "<tr>
            <td>{$row['nombre']}</td>
            <td><strong>{$row['total_grupos']}</strong> ({$row['total_alumnos']})</td>
            <td><strong>{$row['total_intensivos']}</strong> ({$row['total_alumnos_intensivos']})</td>
            <td><strong>{$row['total_alumnos_particulares']}</strong> ({$row['total_particulares']})</td>
            <td>
                <p class='tooltip'><img class='action' onclick='getTeacherStats({$row['id_profesor']})' src='./img/info.png'><span>Detalles</span></p>
            </td>
          </tr>";          
}

echo "</table>";

mysqli_close($connection);