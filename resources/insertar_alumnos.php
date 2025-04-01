<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php
    include "../añadir_alumnos.php";
    require "dbConnect.php";
    $conectar=mysqli_connect($db_host,$db_user,$db_pass,$db_name);
    $nombre=$_GET["nombre"];
    $apellido=$_GET["apellido"];
    $telefono=$_GET["telefono"];
    $dni=$_GET["dni"];
    $email=$_GET["email"];
    $direccion=$_GET["direccion"];
    $cp=$_GET["cp"];
    $localidad=$_GET["localidad"];
    $iban=$_GET["iban"];
    $mayoria=$_GET["mayoria"];
    $medico=$_GET["medico"];
    $datos="INSERT INTO alumnos (nombre, apellidos, telefono, dni, email, direccion, cp, localidad, iban,esAdulto,comentariosMedicos) VALUES ('$nombre', '$apellido', '$telefono', '$dni', '$email', '$direccion', '$cp', '$localidad', '$iban', '$mayoria', '$medico')";
    $datos=mysqli_query($conectar,$datos);
        if($datos){
            echo "Alumno añadido correctamente";
            header("Location: ../añadir_alumnos.php?success=1");
            exit();
        }else{
            echo "Error al añadir el alumno: " . mysqli_error($conectar);
        }
    ?>
</body>
</html>