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
    $telefono =$_POST["telefono"];
    $dni=$_POST["dni"];
    $email =$_POST["email"];
    $direccion=$_POST["direccion"];
    $cp=$_POST["cp"];
    $localidad=$_POST["localidad"];
    $iban =$_POST["iban"];
    $mayoria=$_POST["mayoria"];
    $medico = $_POST["medico"];
    $fecha =$_POST["fecha"];
    $datos="INSERT INTO alumnos (nombre, apellidos, telefono, dni, email, direccion, cp, localidad, iban,esAdulto,comentariosMedicos,fechaInclusion) VALUES (NULLIF('$nombre', ''), NULLIF('$apellido', ''), NULLIF('$telefono', ''), NULLIF('$dni', ''), NULLIF('$email', ''),  NULLIF('$direccion', ''), NULLIF('$cp', ''), NULLIF('$localidad', ''), NULLIF('$iban', ''), '$mayoria', NULLIF('$medico', ''), '$fecha')";
    $datos=mysqli_query($connection,$datos);
    if ($datos) { 
        $id_alumno = mysqli_insert_id($connection); 
    
        echo "El ID del alumno es: " . $id_alumno;
    } else {
        echo "Error al insertar el alumno: " . mysqli_error($connection);
    }
    
    $nombreCont1=$_POST["nombreCont1"];
    $telefonoCont1=$_POST["telefonoCont1"];
    $relacionCont1=$_POST["relacionCont1"];
    $datosCont1="INSERT INTO contactosemergencia (id_alumno, nombre, telefono, relacion) VALUES ('$id_alumno','$nombreCont1','$telefonoCont1', '$relacionCont1')";
    
    $nombreCont2=$_POST["nombreCont2"];
    $telefonoCont2=$_POST["telefonoCont2"];
    $relacionCont2=$_POST["relacionCont2"];
    $datosCont2="INSERT INTO contactosemergencia (id_alumno, nombre, telefono, relacion) VALUES ('$id_alumno','$nombreCont2','$telefonoCont2', '$relacionCont2')";
   
    $datosContacto1=mysqli_query($connection,$datosCont1);
    $datosContacto2=mysqli_query($connection,$datosCont2);
    
        if($id_alumno&&$datosContacto1&&$datosContacto2){
            header("Location: ../annadir_alumnos.php?success=1&message=Alumno añadido correctamente");   
            exit();
        }else{
            echo "Error al añadir el alumno: " . mysqli_error($connection);
        }
        mysqli_close($connection);
    ?>
</body>
</html>