<?php
require __DIR__.'/../dbConnect.php';

// Obtener el id del grupo
$id_grupo = $_GET['id'];

// Consultas SQL para obtener los detalles relacionados con el grupo
$query_group = "SELECT id_grupo, nombre, asignatura, modalidad, horasSemanales, esActivo, esIntensivo, precio, horario, creacion, id_profesor FROM grupos WHERE id_grupo = $id_grupo";
$query_profesor = "SELECT nombre, apellidos FROM profesores WHERE id_profesor = (SELECT id_profesor FROM grupos WHERE id_grupo = $id_grupo)";
$query_students = "SELECT a.nombre, a.apellidos FROM alumnos a JOIN alumnosgrupos ag ON a.id_alumno = ag.id_alumno WHERE ag.id_grupo = $id_grupo";

// Ejecutar las consultas
$result_group = mysqli_query($connection, $query_group);
$result_profesor = mysqli_query($connection, $query_profesor);
$result_students = mysqli_query($connection, $query_students);

// Verificar si los resultados existen
if (!$result_group || !$result_profesor || !$result_students) {
    echo json_encode(["error" => "Error en la consulta de los detalles del grupo"]);
    exit();
}

// Obtener los datos de cada consulta
$data_group = mysqli_fetch_assoc($result_group);
$data_profesor = mysqli_fetch_assoc($result_profesor);

// Procesar los estudiantes en un array
$data_students = [];
while ($row = mysqli_fetch_assoc($result_students)) {
    $data_students[] = $row;
}

// Preparar los datos a devolver en formato JSON
$data = [
    'grupo' => $data_group,
    'profesor' => $data_profesor,
    'students' => $data_students,
];

// Cerrar la conexión a la base de datos
mysqli_close($connection);

// Devolver los datos en formato JSON
echo json_encode($data);
?>
