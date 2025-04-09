<?php

require './dbConnect.php';

$query = "UPDATE alumnos SET notasRapidas = $_POST[notes] WHERE alumnos.id_alumno = $_POST[id]";

$result_emgContact = mysqli_query(mysql: $connection, query: $query);

mysqli_close(mysql: $connection);