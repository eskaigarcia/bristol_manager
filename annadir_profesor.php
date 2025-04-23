<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    
    <?php require "resources/dbConnect.php";?>
    <?php include "components/htmlHead.php"; 
    if (isset($_GET['message'])) {
        echo "<p style='color: green; font-weight: bold;'>" . htmlspecialchars($_GET['message']) . "</p>";
    }?>

</head>
<body class="insalumfondo">
    <h1>Nuevo profesor</h1>
    <div class="insalumatras">
    <form name="insalum" method="POST" class="insalum" action="resources/insertar_profesor.php">
            <label for="nombre">Nombre y apellido:</label>
            <input type="text" id="nombre" name="nombre" placeholder="Introduce el nombre y apellido" required>
            <button class="cardLink align_left" type="submit">Enviar</button><br><br><br><br><br>
        </div>
    
    
    <button onclick="window.location.href='profesores.php'" class="cardLink align_left">Volver atrás</button>

</body>
</html>