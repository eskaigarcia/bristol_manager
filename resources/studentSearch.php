<?php

$s_name = $_GET["a_nombre"] ?? '';
$s_surn = $_GET["a_apellidos"] ?? '';
$s_mail = $_GET["a_mail"] ?? '';
$s_dni = $_GET["a_dni"] ?? '';
$s_tel = $_GET["a_tel"] ?? '';

function parseQuery(): array {
    global $s_name, $s_surn, $s_mail, $s_dni, $s_tel;

    $theCondition = '';
    if ($s_name != '') $theCondition .= ($theCondition != '' ? ' AND ' : '') . "nombre LIKE '%$s_name%'"; 
    if ($s_surn != '') $theCondition .= ($theCondition != '' ? ' AND ' : '') . "apellidos LIKE '%$s_surn%'"; 
    if ($s_mail != '') $theCondition .= ($theCondition != '' ? ' AND ' : '') . "email LIKE '$s_mail'"; 
    if ($s_dni != '') $theCondition .= ($theCondition != '' ? ' AND ' : '') . "dni LIKE '$s_dni'"; 
    if ($s_tel != '') $theCondition .= ($theCondition != '' ? ' AND ' : '') . "telefono LIKE '%$s_tel%'"; 

    if ($theCondition == '') $theCondition = 1;

    $theQuery = "SELECT id_alumno, apellidos, nombre, telefono, dni, email, esAdulto, esAmonestado, comentariosMedicos FROM alumnos WHERE $theCondition LIMIT 100";

    $theCounter = "SELECT COUNT(id) FROM alumnos WHERE $theCondition LIMIT 100";

    return [$theQuery, $theCounter];
}
function doSearch(): void {

    require './resources/dbConnect.php';
    $connection = mysqli_connect(hostname: $db_host, username: $db_user, password: $db_pass);

    // Error handling
    if(mysqli_connect_errno()) {
        echo "Error connecting to database.";
        exit();
    }

    // Connection configuration
    mysqli_select_db(mysql: $connection, database: $db_name) or die ('Base de datos no encontrada.');
    mysqli_set_charset(mysql: $connection, charset: 'utf8');

    // Query performing
    $query = parseQuery();
    $result = mysqli_query(mysql: $connection, query: $query[0]);
    $resultCount = mysqli_query(mysql: $connection, query: $query[1]);
    $count = mysqli_fetch_row(result: $resultCount)[0];

    // Output
    echo "<h2>$count alumnos</h2>";
    echo '<table id="studentSearch">';
    echo "<tr class = 'head'>
                <td>Nombre completo</td>
                <td>Datos</td>
                <td>Avisos</td>
                <td>Acciones</td>
            </tr>";

    require 'studentSearchGraphics.php';

    while ($row = mysqli_fetch_array(result: $result, mode: MYSQLI_ASSOC)) {
        
        // Evaluate booleans
        $row_tel = ($row['telefono'] != NULL) ? "<p class='tooltip'>$ico_telTrue<span>Teléfono: $row[telefono]</span></p>" : "<p class='tooltip'>$ico_telFalse<span>No hay número de teléfono registrado</span></p>";
        $row_dni = ($row['dni'] != NULL) ? "<p class='tooltip'>$ico_dniTrue<span>DNI: $row[dni]</span></p>" : "<p class='tooltip'>$ico_dniFalse<span>No hay DNI registrado</span></p>";
        $row_email = ($row['email'] != NULL) ? "<p class='tooltip'>$ico_emailTrue<span>Email: $row[email]</span></p>" : "<p class='tooltip'>$ico_emailFalse<span>No hay dirección email registrada</span></p>";
        
        $row_minor = ($row['esAdulto'] == 0) ? "<p class='tooltip'>$ico_minor<span>Menor de edad</span></p>" : "";
        $row_warn = ($row['esAmonestado'] == 1) ? "<p class='tooltip'>$ico_amonestado<span>Estudiante amonestado</span></p>" : "";
        $row_safety = ($row['comentariosMedicos'] != NULL) ? "<p class='tooltip'>$ico_healthSafety<span>$row[comentariosMedicos]</span></p>" : "";
        
        // Print results
        echo "<tr>
                <td>$row[apellidos], $row[nombre]</td>
                <td>$row_tel $row_dni $row_email</td>
                <td>$row_minor $row_warn $row_safety</td>
                <td>
                    <p class='tooltip'><img class='action' onclick='' src='./img/info.png'><span>Detalles</span></p>
                    <p class='tooltip'><img class='action' onclick='' src='./img/edit.png'><span>Editar</span></p>
                </td>
            </tr>";
    }
    echo '</table>';

    // Close connection
    mysqli_close(mysql: $connection);

}

doSearch();