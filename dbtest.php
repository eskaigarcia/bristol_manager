<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
    <?php

        // Database connection
        $db_host = 'localhost';
        $db_name = 'bristol_alumnos';
        $db_user = 'root';
        $db_pass = '';

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

        // Output
        while ($fila = mysqli_fetch_row(result: $result)) {
            echo "$fila[0] $fila[1] <br>";
        }

        // Close connection
        mysqli_close(mysql: $connection);

    ?>


</body>
</html>