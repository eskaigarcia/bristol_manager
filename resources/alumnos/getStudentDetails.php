<?php

require __DIR__.'/../dbConnect.php';

// Get the selected student id for querying
$id = $_GET['id'];

// Set of database queries to perform
    $query_emgContact = "SELECT id_contacto, nombre, relacion, telefono FROM contactosemergencia WHERE id_alumno = $id";
    $query_guardian = "SELECT nombre, apellidos, telefono, dni, email, direccion, cp, localidad, iban FROM responsables WHERE id_alumno = $id";
    $query_groups = "SELECT g.nombre, g.modalidad, g.precio FROM alumnosgrupos t JOIN grupos g ON t.id_grupo = g.id_grupo WHERE t.id_alumno = $id AND t.fechaFin IS NULL";
    $query_payments = "SELECT p.tipoPago, p.fechaPago, p.metodoPago, p.precioTotal, p.descuentoCalculado, p.descuentoExtra, p.conceptoDescuento, p.mesesPagados, p.descripcion FROM pagos p WHERE p.id_alumno = $id;";
    $query_relations = "SELECT r.fechaInicio, r.tipoRelacion, r.fechaFin, a1.nombre AS a1Nombre, a1.apellidos AS a1Apellidos, a1.id_alumno AS a1ID, a2.nombre AS a2Nombre, a2.apellidos AS a2Apellidos, a1.id_alumno AS a2ID FROM relaciones r JOIN alumnos a1 ON r.id_alumno1 = a1.id_alumno JOIN alumnos a2 ON r.id_alumno2 = a2.id_alumno WHERE r.id_alumno1 = $id OR r.id_alumno2 = $id";
    $query_student = "SELECT id_alumno,  apellidos,  nombre,  telefono,  dni,  email,  esAdulto, esAmonestado,  direccion, cp, localidad, iban, comentariosMedicos, fechaInclusion, notasRapidas FROM alumnos WHERE id_alumno = $id";
    $query_vouchers = "SELECT id_bono, cantidadClases, esTransferido, caducidad, fechaPago FROM bonos WHERE id_alumno = $id";
    $query_clasesparticulares = "SELECT c.fechaHora, p.nombre AS profesor, c.duracion, c.modalidad, c.asignatura
        FROM clasesparticulares c
        JOIN profesores p ON c.id_profesor = p.id_profesor
        WHERE c.id_bono IN (SELECT id_bono FROM bonos WHERE id_alumno = $id)";

// Database connections
    $result_emgContact = mysqli_query(mysql: $connection, query: $query_emgContact);
    $result_guardian = mysqli_query(mysql: $connection, query: $query_guardian);
    $result_groups = mysqli_query(mysql: $connection, query: $query_groups);
    $result_payments = mysqli_query(mysql: $connection, query: $query_payments);
    $result_relations = mysqli_query(mysql: $connection, query: $query_relations);
    $result_student = mysqli_query(mysql: $connection, query: $query_student);
    $result_vouchers = mysqli_query(mysql: $connection, query: $query_vouchers);
    $result_clasesparticulares = mysqli_query($connection, $query_clasesparticulares);

// PHP Processing of the query results that resturn one row
$data_guardian = mysqli_fetch_assoc(result: $result_guardian);
$data_student = mysqli_fetch_assoc(result: $result_student);

// PHP processing of the query results that can return multiple rows
    $data_emgContact = [];
    while ($row = mysqli_fetch_assoc(result: $result_emgContact)) { $data_emgContact[] = $row; }

    $data_groups = [];
    while ($row = mysqli_fetch_assoc(result: $result_groups)) { $data_groups[] = $row; }

    $data_payments = [];
    while ($row = mysqli_fetch_assoc(result: $result_payments)) { $data_payments[] = $row; }

    $data_relations = [];
    while ($row = mysqli_fetch_assoc(result: $result_relations)) { $data_relations[] = $row; }

    $data_vouchers = [];
    while ($row = mysqli_fetch_assoc(result: $result_vouchers)) { $data_vouchers[] = $row; }

    $data_clasesparticulares = [];
    while ($row = mysqli_fetch_assoc($result_clasesparticulares)) { $data_clasesparticulares[] = $row; }

// Additional processing of vouchers for used count
foreach ($data_vouchers as &$voucher) {
    $id_bono = $voucher['id_bono'];
    $query_usedVouchers = "SELECT COUNT(c.id_clase) AS usedClases 
                        FROM bonos b 
                        LEFT JOIN clasesparticulares c ON b.id_bono = c.id_bono 
                        WHERE b.id_bono = $id_bono 
                        GROUP BY b.id_bono";
    $result_usedVouchers = mysqli_query($connection, $query_usedVouchers);
    $usedVoucherData = mysqli_fetch_assoc($result_usedVouchers);
    $voucher['usedClases'] = $usedVoucherData['usedClases'] ?? 0;
}
unset($voucher); // break reference

// End connection
    mysqli_close(mysql: $connection);

// Store data in an object and echo + json it
    $data = [
        'alumno' => $data_student,
        'contacts' => $data_emgContact,
        'groups' => $data_groups,
        'guardian' => $data_guardian,
        'payments' => $data_payments,
        'relations' => $data_relations,
        'vouchers' =>  $data_vouchers,
        'classes' => $data_clasesparticulares,
    ];

    echo json_encode(value: $data);