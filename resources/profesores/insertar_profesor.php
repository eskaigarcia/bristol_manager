
<?php
    ob_start();
    require "dbConnect.php";
    
   
    
    $nombre=$_POST["nombre"]; 
    
    
    $datosmaestro="INSERT INTO profesores (nombre) VALUES ('$nombre')";
    $datomaestro=mysqli_query($connection,$datosmaestro);
    if($datomaestro) {
        header("Location: ../annadir_profesor.php?success=1&message=Porfesor añadido correctamente");   
        exit();
    }else{
        echo "Error al añadir el profesor: " . mysqli_error($connection);
    }
    mysqli_close($connection);
?>
