<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <?php include './components/htmlHead.php'; ?>
</head>
<body>
    <?php
    require "resources/dbConnect.php";
    $conectar=mysqli_connect($db_host,$db_user,$db_pass,$db_name);
    if (mysqli_connect_errno()){
        echo "fallo al conectar con la base de datos";
        exit();
    }
    mysqli_set_charset($conectar, "utf8");
?>
    <div class="insalumatras">
    <h1>datos del alumno</h1>
    <form name="insalum" method="get" class="insalum" action="resources/insertar_alumnos.php">
    <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" placeholder="Introduce el nombre">
    <label for="apellido">apellido:</label>
        <input type="text" id="apellido" name="apellido" placeholder="Introduce el apellido"><br><br>
    <label for="telefono">teléfono:</label>
        <input type="text" id="telefono" name="telefono" placeholder="Introduce el teléfono">
    <label for="dni">dni:</label>
        <input type="text" id="dni" name="dni" placeholder="Introduce el dni"><br><br>
    <label for="email">email:</label>
        <input type="text" id="email" name="email" placeholder="Introduce el email">
    <label for="direccion">dirección:</label>
        <input type="text" id="direccion" name="direccion" placeholder="Introduce la dirección"><br><br>
    <label for="cp">cp:</label>
        <input type="text" id="cp" name="cp" placeholder="Introduce el codigo postal">
    <label for="localidad">localidad:</label>
        <input type="text" id="localidad" name="localidad" placeholder="Introduce la localidad"><br><br>
    <label for="iban">iban:</label>
        <input type="text" id="iban" name="iban" placeholder="Introduce el iban"><br><br>
    <label for="mayor">¿El alumno es mayor de edad?</label><br>
        <input type="radio" id="mayor_si" name="mayoria" value="0">
            <label for="mayor_si">Es mayor</label><br>
        <input type="radio" id="mayor_no" name="mayoria" value="1">
            <label for="mayor_no">Es menor</label><br><br>
    <!--el alumno dudo que empiece siendo amonestado por eso no lo pregunto ya que sera algo que se tenga que modificar  -->
    <label for="comentarios medicos">comentarios medicos:</label><br>
    <textarea id="medico" name="medico" placeholder="Comentarios médicos" rows="5" cols="50"></textarea><br><br>
        <button type="submit">Enviar</button>
    </form>
    </div>

<!--#medico {
        resize: both; /* Permite redimensionar en ambas direcciones */
        max-width: 500px; /* Ancho máximo */
        max-height: 200px; /* Altura máxima */
}-->
    <button onclick="window.location.href='dashboard.php'" class="cardLink align_left">Volver atrás</button>
</body>
</html>