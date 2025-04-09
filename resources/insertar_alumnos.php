<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php
    ob_start();
    include "../annadir_alumnos.php";
    require "dbConnect.php";
    $nombre=$_POST["nombre"];
    $apellido=$_POST["apellido"];
    $telefono = !empty($_POST["telefono"]) ? $_POST["telefono"] : "NULL";
    $dni=!empty($_POST["dni"]) ? $_POST["dni"] : "NULL";
    $email = !empty($_POST["email"]) ? $_POST["email"] : "NULL";
    $direccion=!empty($_POST["direccion"]) ? $_POST["direccion"] : "NULL";
    $cp=!empty($_POST["cp"]) ? $_POST["cp"] : "NULL";
    $localidad=!empty($_POST["localidad"]) ? $_POST["localidad"] : "NULL";
    $iban = !empty($_POST["iban"]) ? $_POST["iban"] : "NULL";
    $mayoria=$_POST["mayoria"];
    $medico = !empty($_POST["medico"]) ? $_POST["medico"] : "NULL";
    $fecha =$_POST["fecha"];
    $datos="INSERT INTO alumnos (nombre, apellidos, telefono, dni, email, direccion, cp, localidad, iban,esAdulto,comentariosMedicos,fechaInclusion) VALUES ('$nombre', '$apellido', '$telefono', '$dni', '$email', '$direccion', '$cp', '$localidad', '$iban', '$mayoria', '$medico','$fecha')";
    $datos=mysqli_query($connection,$datos);
    if ($datos) { 
        $id_alumno = mysqli_insert_id($connection); 
    
        echo "El ID del alumno es: " . $id_alumno;
    } else {
        echo "Error al insertar el alumno: " . mysqli_error($connection);
    }
    
    $nombreCont1=!empty($_POST["nombreCont1"]) ? $_POST["nombreCont1"] : "NULL";
    $telefonoCont1=!empty($_POST["telefonoCont1"]) ? $_POST["telefonoCont1"] : "NULL";
    $relacionCont1=!empty($_POST["relacionCont1"]) ? $_POST["relacionCont1"] : "NULL";
    $datosCont1="INSERT INTO contactosemergencia (id_alumno, nombre, alumno, relacion) VALUES ('$id_alumno','$nombreCont1','$telefonoCont1', '$relacionCont1')";
    
    $nombreCont2=!empty($_POST["nombreCont2"]) ? $_POST["nombreCont2"] : "NULL";
    $telefonoCont2=!empty($_POST["telefonoCont2"]) ? $_POST["telefonoCont2"] : "NULL";
    $relacionCont2=!empty($_POST["relacionCont2"]) ? $_POST["relacionCont2"] : "NULL";
    $datosCont2="INSERT INTO contactosemergencia (id_alumno, nombre, alumno, relacion) VALUES ('$id_alumno','$nombreCont2','$telefonoCont2', '$relacionCont2')";
   
    $datosContacto1=mysqli_query($connection,$datosCont1);
    $datosContacto2=mysqli_query($connection,$datosCont2);
    
        if($id_alumno&&$datosContacto1&&$datosContacto2){
            header("Location: ../annadir_alumnos.php?success=1");   
            exit();
        }else{
            echo "Error al añadir el alumno: " . mysqli_error($connection);
        }
    ?>
</body>
</html>