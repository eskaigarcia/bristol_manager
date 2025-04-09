<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Añadir Grupo</title>
    <?php include 'components/htmlHead.php'; ?>
</head>
<body class="insalumatras">
    <div class="insalumatras">
        <h1>Datos del Grupo</h1><br>
        <form name="insgrupo" method="POST" class="insalum" action="resources/insertar_grupos.php">
            <table class="insalum">
                <tr>
                    <td><label for="nombre">Nombre del grupo:</label></td>
                    <td><input type="text" id="nombre" name="nombre" placeholder="Introduce el nombre del grupo" required></td>
                </tr>
                <tr>
                    <td><label for="asignatura">Asignatura:</label></td>
                    <td><input type="text" id="asignatura" name="asignatura" placeholder="Introduce la asignatura" required></td>
                </tr>
                <tr>
                    <td><label for="modalidad">Modalidad:</label></td>
                    <td>
                        <select id="modalidad" name="modalidad" required>
                            <option value="presencial">Presencial</option>
                            <option value="online">Online</option>
                            <option value="hibrido">Híbrido</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td><label for="horasSemanales">Horas semanales:</label></td>
                    <td>
                        <select id="horasSemanales" name="horasSemanales" required>
                            <option value="1">1 Hora</option>
                            <option value="1.5">1:30 Hora</option>
                            <option value="2">2 Horas</option>
                            <option value="3">3 Horas</option>
                            <option value="4">4 Horas</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td><label for="precio">Precio (en euros):</label></td>
                    <td><input type="number" id="precio" name="precio" placeholder="Introduce el precio" required></td>
                </tr>
                <tr>
                    <td><label for="esActivo">¿Está activo?</label></td>
                    <td>
                        <input type="checkbox" id="esActivo" name="esActivo" value="1">
                        <label for="esActivo">Activo</label>
                    </td>
                </tr>
                <tr>
                    <td><label for="esIntensivo">¿Es intensivo?</label></td>
                    <td>
                        <input type="checkbox" id="esIntensivo" name="esIntensivo" value="1">
                        <label for="esIntensivo">Intensivo</label>
                    </td>
                </tr>
                <tr>
                    <td><label for="id_profesor">ID del Profesor:</label></td>
                    <td><input type="number" id="id_profesor" name="id_profesor" placeholder="Introduce el ID del profesor" required></td>
                </tr>
                <tr>
                    <td><label for="horarioDias">Días de clase:</label></td>
                    <td>
                        <select id="horarioDias" name="horarioDias[]" multiple required>
                            <option value="L">Lunes</option>
                            <option value="M">Martes</option>
                            <option value="X">Miércoles</option>
                            <option value="J">Jueves</option>
                            <option value="V">Viernes</option>
                            <option value="S">Sábado</option>
                            <option value="D">Domingo</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td><label for="horarioHoras">Horas de clase:</label></td>
                    <td>
                        <input type="text" id="horarioHoras" name="horarioHoras" placeholder="Ejemplo: 09:00, 11:00" required>
                    </td>
                </tr>
                <tr>
                    <td><label for="horarioDuraciones">Duraciones de clase:</label></td>
                    <td>
                        <input type="text" id="horarioDuraciones" name="horarioDuraciones" placeholder="Ejemplo: 60, 90" required>
                    </td>
                </tr>
                <tr>
                    <td colspan="2"><button type="submit">Crear Grupo</button></td>
                </tr>
            </table>
        </form>
    </div>
    <button onclick="window.location.href='dashboard.php'" class="cardLink align_left">Volver atrás</button>
</body>
</html>
