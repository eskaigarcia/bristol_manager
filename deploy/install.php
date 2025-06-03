<?php
    $db_host = 'localhost';
    $db_name = 'bristol_manager';
    $db_user = 'root';
    $db_pass = '';
    $sql_file = __DIR__ . '/bManager3.0.sql';

    // Connect to MySQL server (no database yet)
    $connection = mysqli_connect($db_host, $db_user, $db_pass);

    if(mysqli_connect_errno()) {
        echo "Error connecting to database.";
        exit();
    }

    // Create database if not exists
    $create_db_query = "CREATE DATABASE IF NOT EXISTS `$db_name` CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;";
    if (!mysqli_query($connection, $create_db_query)) {
        echo "Error creating database: " . mysqli_error($connection);
        exit();
    }

    // Select the database
    mysqli_select_db($connection, $db_name) or die ('Base de datos no encontrada.');
    mysqli_set_charset($connection, 'utf8');

    // Import SQL file
    if (!file_exists($sql_file)) {
        echo "SQL file not found: $sql_file";
        exit();
    }
    $sql = file_get_contents($sql_file);
    if (!$sql) {
        echo "Could not read SQL file.";
        exit();
    }

    // Execute SQL (may contain multiple queries)
    if (mysqli_multi_query($connection, $sql)) {
        do {
            // flush multi_query results
            if ($result = mysqli_store_result($connection)) {
                mysqli_free_result($result);
            }
        } while (mysqli_next_result($connection));
        echo "<h1 style='font-family: sans-serif'>Instalación completada correctamente</h1>";
        echo "<p style='font-family: sans-serif'>Puedes cerrar esta página.</p>";
    } else {
        echo "Error importing database: " . mysqli_error($connection);
    }

    mysqli_close($connection);