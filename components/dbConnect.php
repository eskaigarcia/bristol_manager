<?php
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