<!DOCTYPE html>
<html lang="en">
<head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <?php include 'components/htmlHead.php'; ?>
</head>
<body class="insalumfondo">
<script>
    document.addEventListener("DOMContentLoaded", function() {
        document.getElementById("fecha").value = new Date().toISOString().split("T")[0];
    });
</script>
        <div class="insalumatras">
        <h1 >Datos del alumno</h1><br>
        <form name="insalum" method="POST" class="insalum" action="resources/insertar_alumnos.php">
            <table class="insalum">
                <tr>
                    <td><label for="nombre">Nombre:</label></td>
                    <td><input type="text" id="nombre" name="nombre" placeholder="Introduce el nombre" required></td>
                </tr>
                <tr>
                    <td><label for="apellido">Apellido:</label></td>
                    <td><input type="text" id="apellido" name="apellido" placeholder="Introduce el apellido" required></td>
                </tr>
                <tr>
                    <td><label for="telefono">Teléfono:</label></td>
                    <td><input type="tel" id="telefono" name="telefono" placeholder="Introduce el teléfono"></td>
                </tr>
                <tr>
                    <td><label for="dni">DNI:</label></td>
                    <td><input type="text" id="dni" name="dni" placeholder="Introduce el DNI" required></td>
                </tr>
                <tr >
                    <td><label for="email">Email:</label></td>
                    <td><input type="email" id="email" name="email" placeholder="Introduce el email"></td>
                </tr>
                <tr>
                    <td><label for="direccion">Dirección:</label></td>
                    <td><input type="text" id="direccion" name="direccion" placeholder="Introduce la dirección" required></td>
                </tr>
                <tr>
                    <td><label for="cp">Código Postal:</label></td>
                    <td><input type="text" id="cp" name="cp" placeholder="Introduce el código postal" required></td>
                </tr>
                <tr>
                    <td><label for="localidad">Localidad:</label></td>
                    <td><input type="text" id="localidad" name="localidad" placeholder="Introduce la localidad" required></td>
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
                    <td><textarea style="max-width: 500px; max-height: 200px;" id="medico" name="medico" placeholder="Comentarios médicos" rows="5" ></textarea></td>
                </tr>
                <tr>
                    <td>
                    <label for="fecha"></label>
                    </td>
                    <td>
                    <input type="hidden" id="fecha" name="fecha" readonly>
                    </td>
                </tr>
                <tr>
                    <td colspan="2"><button type="submit">Enviar</button></td>
                </tr>
            </table>
        
        </div>





        <div class="insalumatras">
        <h1 >Contactos de emergencia</h1>
            <table class="insalum">
            <td colspan="2"><h2>Contacto número 1</h2></td>
                <tr>
                    <td><label for="nombreCont">Nombre:</label></td>
                    <td><input type="text" id="nombreCont1" name="nombreCont1" placeholder="Nombre y apellido" required></td>
                </tr>
                <tr>
                    <td><label for="telefonoCont">Teléfono:</label></td>
                    <td><input type="tel" id="telefonoCont1" name="telefonoCont1" placeholder="Introduce el teléfono" required></td>
                </tr>
                <tr>
                    <td><label for="dniCont">Relacion:</label></td>
                    <td><input type="text" id="relacionCont1" name="relacionCont1" placeholder="Relacion con el alumno" required></td>
                </tr>
            <td colspan="2"><h2>Contacto número 2</h2></td>
                <tr>
                    <td><label for="nombreCont">Nombre y apellido:</label></td>
                    <td><input type="text" id="nombreCont2" name="nombreCont2" placeholder="Nombre y apellido" required></td>
                </tr>
                <tr>
                    <td><label for="telefonoCont">Teléfono:</label></td>
                    <td><input type="tel" id="telefonoCont2" name="telefonoCont2" placeholder="Introduce el teléfono" required></td>
                </tr>
                <tr>
                    <td><label for="relacionCont">Relacion:</label></td>
                    <td><input type="text" id="relacionCont2" name="relacionCont2" placeholder="Relacion con el alumno" required></td>
                </tr>
                </tr>
            </table>
        </form>
        </div>
        <button onclick="window.location.href='dashboard.php'" class="cardLink align_left">Volver atrás</button>
</body>
</html>