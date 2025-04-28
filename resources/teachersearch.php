<?php 
require "dbConnect.php";
$query = "SELECT id_profesor, nombre FROM profesores";
$result = mysqli_query($connection, $query);

// Verificar si la consulta tuvo éxito
if (!$result) {
    echo "Error al obtener los maestros: " . mysqli_error($connection);
    exit();
}
$count = mysqli_num_rows($result);



echo "<h2>$count profesores encontrados</h2>";
echo '<table id="studentSearch" >';
echo "<tr class='head'>
        <td style='width:13%;'>id</td> 
        <td>Nombre del maestro</td>
        <td style='width:23%;'>Grupos</td>
        <td style='width:23%;'>Asignatura</td>
        </tr>";//hace falta poner los grupos en los que esta el maestro tambien 
    //hace falta hacer que la busqueda sea algo mas interesante ya que hay poco 
    //Intentar de alguna forma ver que asignaturas da el profesor segun a que 
    //grupo pertenece
    //alomejor dividir las clases en inviduales y grupales aunque alomejor queda raro porque 
    while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
        echo "<tr>
            <td>{$row['id_profesor']}</td> 
            <td>{$row['nombre']}</td>
            <td>prueba</td>
            <td>prueba</td>
            </tr>";



    }
?>