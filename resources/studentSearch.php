<?php

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
    $query = 'SELECT apellidos, nombre, telefono, dni, email, esAdulto, esAmonestado, comentariosMedicos FROM alumnos';
    $result = mysqli_query(mysql: $connection, query: $query);

    // Output
    echo '<table id="studentSearch">';

    require 'studentSearchGraphics.php';
    while ($row = mysqli_fetch_array(result: $result, mode: MYSQLI_ASSOC)) {

        // Evaluate booleans
        $row_tel = ($row['telefono'] != NULL) ? "<p class='tooltip'>$ico_telTrue<span>Teléfono: $row[telefono]</span></p>" : "<p class='tooltip'>$ico_telFalse<span>No hay número de teléfono registrado</span></p>";
        $row_dni = ($row['dni'] != NULL) ? "<p class='tooltip'>$ico_dniTrue<span>DNI: $row[dni]</span></p>" : "<p class='tooltip'>$ico_dniFalse<span>No hay DNI registrado</span></p>";
        $row_email = ($row['email'] != NULL) ? "<p class='tooltip'>$ico_emailTrue<span>Enail: $row[email]</span></p>" : "<p class='tooltip'>$ico_emailFalse<span>No hay dirección email registrada</span></p>";
        

        if($row['esAdulto'] == 0) echo 'ALERTA';

        if($row['esAmonestado'] == 1) echo 'ALERTA';

        if($row['comentariosMedicos'] != NULL) echo 'Hola';


        // Print results
        echo "<tr>
                <td>$row[apellidos], $row[nombre]</td>
                <td>$row_tel $row_dni $row_email</td>
                <td>$row[esAdulto] - $row[esAmonestado]</td>
                <td>$row[comentariosMedicos]</td>
                <td>+info</td>
            </tr>";
    }
    echo '</table>';

    // Close connection
    mysqli_close(mysql: $connection);
