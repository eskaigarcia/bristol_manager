<?php

require './dbConnect.php';

// Get the selected student id for querying
$id = $_GET['id'];

// Set of database queries to perform
$query_student = "SELECT id_alumno,  apellidos,  nombre,  telefono,  dni,  email,  esAdulto, esAmonestado,  direccion, cp, localidad, iban, comentariosMedicos, fechaInclusion FROM alumnos WHERE id_alumno = $id";
$query_guardian = "SELECT nombre, apellidos, telefono, dni, email, direccion, cp, localidad, iban FROM responsables WHERE id_alumno = $id";
$query_emgContact = "SELECT nombre, relacion, telefono FROM contactosemergencia WHERE id_alumno = $id";
$query_groups = "SELECT g.nombre, g.modalidad, g.precio -- TODO: ADD DATES (Pending Joshua)
                 FROM alumnosgrupos t JOIN grupos g ON t.id_grupo = g.id_grupo WHERE t.id_alumno = $id AND t.fechaFin IS NULL";
$query_vouchers = "SELECT id_bono, cantidadClases, esTransferido, caducidad, fechaPago FROM bonos WHERE id_alumno = $id";
$query_payments = "SELECT g.nombre, m.fecha, p.fechaPago, p.metodoPago, p.precioTotal, p.descuentoCalculado, p.descuentoPersonal FROM pagos p JOIN mensualidades m ON p.id_mensualidad = m.id_mensualidad JOIN grupos g ON m.id_grupo = g.id_grupo WHERE p.id_alumno = $id;";

// Database connections
$result_student = mysqli_query(mysql: $connection, query: $query_student);
$result_guardian = mysqli_query(mysql: $connection, query: $query_guardian);
$result_emgContact = mysqli_query(mysql: $connection, query: $query_emgContact);
$result_groups = mysqli_query(mysql: $connection, query: $query_groups);
$result_payments = mysqli_query(mysql: $connection, query: $query_payments);
$result_vouchers = mysqli_query(mysql: $connection, query: $query_vouchers);

// PHP Processing of the query results
$data_student = mysqli_fetch_assoc(result: $result_student);
$data_guardian = mysqli_fetch_assoc(result: $result_guardian);
$data_emgContact = [];
while ($row = mysqli_fetch_assoc(result: $result_emgContact)) {
    $data_emgContact[] = $row;
}
$data_groups = [];
while ($row = mysqli_fetch_assoc(result: $result_groups)) {
    $data_groups[] = $row;
}
$data_payments = [];
while ($row = mysqli_fetch_assoc(result: $result_payments)) {
    $data_payments[] = $row;
}
$data_vouchers = [];
while ($row = mysqli_fetch_assoc(result: $result_vouchers)) {
    $data_vouchers[] = $row;
}

$data_usedVouchers = [];
foreach ($data_vouchers as $voucher) {
    $id_bono = $voucher['id_bono'];
    $query_usedVouchers = "SELECT b.id_bono, COUNT(c.id_clase) AS used_classes 
                           FROM bonos b 
                           LEFT JOIN clasesparticulares c ON b.id_bono = c.id_bono 
                           WHERE b.id_bono = $id_bono 
                           GROUP BY b.id_bono";
    $result_usedVouchers = mysqli_query(mysql: $connection, query: $query_usedVouchers);
    $usedVoucherData = mysqli_fetch_assoc($result_usedVouchers);
    foreach ($data_vouchers as &$voucher) {
        if ($voucher['id_bono'] == $id_bono) {
            $voucher['used_classes'] = $usedVoucherData['used_classes'] ?? 0;
            break;
        }
    }
}

$data['usedVouchers'] = $data_usedVouchers;

mysqli_close(mysql: $connection);

$data = [
    'alumno' => $data_student,
    'guardian' => $data_guardian,
    'contacts' => $data_emgContact,
    'groups' => $data_groups,
    'payments' => $data_payments,
    'vouchers' =>  $data_vouchers,
];

echo json_encode(value: $data);