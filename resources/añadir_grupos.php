<?php include 'components/htmlHead.php'; ?>
<body class="insalumfondo">
    <div class="insalumatras">
        <h1>Datos </h1><br>
        <form name="insgrupo" method="POST" class="insalum" action="resources/insertar_grupos.php">
            <table class="insalum">
                <tr>
                    <td><label for="id_profesor">ID Profesor:</label></td>
                    <td><input type="number" id="id_profesor" name="id_profesor" required></td>
                </tr>
                <tr>
                    <td><label for="nombre">Nombre del grupo:</label></td>
                    <td><input type="text" id="nombre" name="nombre" required></td>
                </tr>
                <tr>
                    <td><label for="asignatura">Asignatura:</label></td>
                    <td><input type="text" id="asignatura" name="asignatura" required></td>
                </tr>
                <tr>
                    <td><label for="modalidad">Modalidad:</label></td>
                    <td><input type="text" id="modalidad" name="modalidad" required></td>
                </tr>
                <tr>
                    <td><label for="horasSemanales">Horas semanales (en medias horas):</label></td>
                    <td><input type="number" step="0.5" id="horasSemanales" name="horasSemanales" required></td>
                </tr>
                <tr>
                    <td><label for="precio">Precio (en céntimos):</label></td>
                    <td><input type="number" id="precio" name="precio" required></td>
                </tr>
                <tr>
                    <td><label for="esActivo">¿Activo?</label></td>
                    <td>
                        <select name="esActivo" id="esActivo" required>
                            <option value="1">Sí</option>
                            <option value="0">No</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td><label for="esIntensivo">¿Intensivo?</label></td>
                    <td>
                        <select name="esIntensivo" id="esIntensivo" required>
                            <option value="1">Sí</option>
                            <option value="0">No</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td><label for="horarioDias">Días (formato JSON):</label></td>
                    <td><input type="text" id="horarioDias" name="horarioDias" placeholder='["Lunes","Miércoles"]' required></td>
                </tr>
                <tr>
                    <td><label for="horarioHoras">Horas (formato JSON):</label></td>
                    <td><input type="text" id="horarioHoras" name="horarioHoras" placeholder='["16:00","17:30"]' required></td>
                </tr>
                <tr>
                    <td><label for="horarioDuraciones">Duraciones (formato JSON):</label></td>
                    <td><input type="text" id="horarioDuraciones" name="horarioDuraciones" placeholder='[60, 90]' required></td>
                </tr>
                <tr>
                    <td colspan="2"><button type="submit">Crear grupo</button></td>
                </tr>
            </table>
        </form>
    </div>
    <button onclick="window.location.href='dashboard.php'" class="cardLink align_left">Volver atrás</button>
</body>
