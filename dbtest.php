<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
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
        $result = mysqli_query(mysql: $connection, query: "SELECT nombre, apellidos FROM alumnos");

        // Output row by row
        // echo '<table>';
        // while ($fila = mysqli_fetch_row(result: $result)) {
        //     echo "<tr><td>$fila[0]</td><td>$fila[1]</td></tr>";
        // }
        // echo '</table>';

        // Output using array
        echo '<table>';
        while ($fila = mysqli_fetch_array(result: $result, mode: MYSQLI_ASSOC)) {
            echo "<tr><td>$fila[nombre]</td><td>$fila[apellidos]</td></tr>";
        }
        echo '</table>';

        // Close connection
        mysqli_close(mysql: $connection);

    ?>


</body>
</html>