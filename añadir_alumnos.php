<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <?php include './components/htmlHead.php'; ?>
</head>
<body class="insalumfondo">
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
    <h1 >Datos del alumno</h1>
    <form name="insalum" method="get" class="insalum" action="resources/insertar_alumnos.php">
    <table class="insalum">
      <tr>
        <td><label for="nombre">Nombre:</label></td>
        <td><input type="text" id="nombre" name="nombre" placeholder="Introduce el nombre"></td>
    </tr>
    <tr>
        <td><label for="apellido">Apellido:</label></td>
        <td><input type="text" id="apellido" name="apellido" placeholder="Introduce el apellido"></td>
      </tr>
      <tr>
        <td><label for="telefono">Teléfono:</label></td>
        <td><input type="text" id="telefono" name="telefono" placeholder="Introduce el teléfono"></td>
        </tr>
        <tr>
        <td><label for="dni">DNI:</label></td>
        <td><input type="text" id="dni" name="dni" placeholder="Introduce el DNI"></td>
      </tr>
      <tr >
        <td><label for="email">Email:</label></td>
        <td><input type="text" id="email" name="email" placeholder="Introduce el email"></td>
        </tr>
        <tr>
        <td><label for="direccion">Dirección:</label></td>
        <td><input type="text" id="direccion" name="direccion" placeholder="Introduce la dirección"></td>
      </tr>
      <tr>
        <td><label for="cp">Código Postal:</label></td>
        <td><input type="text" id="cp" name="cp" placeholder="Introduce el código postal"></td>
        </tr>
        <tr>
        <td><label for="localidad">Localidad:</label></td>
        <td><input type="text" id="localidad" name="localidad" placeholder="Introduce la localidad"></td>
      </tr>
      <tr>
        <td><label for="iban">IBAN:</label></td>
        <td><input type="text" id="iban" name="iban" placeholder="Introduce el IBAN"></td>
      </tr>
      <tr>
        <td><label for="mayoria">¿El alumno es mayor?</label></td>
        <td>
          <input type="radio" id="mayor_si" name="mayoria" value="0">
          <label for="mayor_si">Es mayor</label>
          <input type="radio" id="mayor_no" name="mayoria" value="1">
          <label for="mayor_no">Es menor</label>
        </td>
      </tr>
      <tr>
        <td><label for="medico">Comentarios médicos:</label></td>
        <td><textarea style="max-width: 500px; max-height: 200px;" id="medico" name="medico" placeholder="Comentarios médicos" rows="5"></textarea></td>
      </tr>
      <tr>
        <td colspan="2"><button type="submit">Enviar</button></td>
      </tr>
    </table>
    </form>
    </div>

    <button onclick="window.location.href='dashboard.php'" class="cardLink align_left">Volver atrás</button>
</body>
</html>