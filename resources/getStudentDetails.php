<?php

require './dbConnect.php';

$id = $_GET['id'];

$query = "SELECT nombre, apellidos, telefono FROM alumnos WHERE id_alumno = $id";

$result = mysqli_query(mysql: $connection, query: $query);

$data = mysqli_fetch_assoc(result: $result);

echo json_encode(value: $data);