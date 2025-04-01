<?php

require './dbConnect.php';

$id = $_GET['id'];

$query_student = "SELECT id_alumno,  apellidos,  nombre,  telefono,  dni,  email,  esAdulto, esAmonestado,  direccion, cp, localidad, iban, comentariosMedicos FROM alumnos WHERE id_alumno = $id";
$query_legalRep = "SELECT id_responsable, nombre,  apellidos, telefono, dni, email, direccion, cp, localidad, iban FROM responsables WHERE id_alumno = $id";
$query_emgContact = "SELECT id_contacto, nombre, relacion, telefono FROM contactosemergencia WHERE id_alumno = $id";

$result_student = mysqli_query(mysql: $connection, query: $query_student);
$result_legalRep = mysqli_query(mysql: $connection, query: $query_legalRep);
$result_emgContact = mysqli_query(mysql: $connection, query: $query_emgContact);

$data_student = mysqli_fetch_assoc(result: $result_student);
$data_legalRep = mysqli_fetch_assoc(result: $result_legalRep);
$data_emgContact = mysqli_fetch_assoc(result: $result_emgContact);

$data = [
    'student' => $data_student,
    'legalRep' => $data_legalRep,
    'emergency_contact' => $data_emgContact,
];

echo json_encode(value: $data);