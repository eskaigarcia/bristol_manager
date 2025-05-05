function createPayment() {
    // storage.pendingEdits = true;
    let div = document.createElement('div');
    div.className = 'modal';
    div.id = 'popUpModal';

    div.innerHTML = `
        <div>
            <div class="header">
                <div>
                    <h2>Nuevo cobro</h2>
                </div>
                <img onclick="removeDetailsModal()" class="iconButton" src="./img/close.png" alt="Cerrar">
            </div>

            <div class="body noMeta">
                <div id="modalBodyView" style="margin-top: 1rem;">
                    <div class="scrollspySection" id="SDVData">
                        <form id="quickPayment" onchange="triggerQuickPayment()">
                            <table class="camo full">
                                <tr>
                                    <td>
                                        <label for="qp_alumno">Alumno:</label>
                                    </td>
                                    <td>
                                        <input type="text" id="qp_alumno" name="qp_alumno">
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label for="qp_grupo">Grupo:</label>
                                    </td>
                                    <td>
                                        <select id="qp_grupo" name="qp_grupo">
                                            <option value="">Seleccione un grupo</option>
                                            <!-- Add options dynamically or statically here -->
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label>Meses:</label>
                                    </td>
                                    <td>
                                        <div>
                                            <label><input type="checkbox" name="qp_mensualidades[]"> Ene</label>
                                            <label><input type="checkbox" name="qp_mensualidades[]"> Feb</label>
                                            <label><input type="checkbox" name="qp_mensualidades[]"> Mar</label>
                                            <label><input type="checkbox" name="qp_mensualidades[]"> Abr</label>
                                            <label><input type="checkbox" name="qp_mensualidades[]"> May</label>
                                            <label><input type="checkbox" name="qp_mensualidades[]"> Jun</label>
                                            <label><input type="checkbox" name="qp_mensualidades[]"> Jul</label>
                                            <label><input type="checkbox" name="qp_mensualidades[]"> Ago</label>
                                            <label><input type="checkbox" name="qp_mensualidades[]"> Sep</label>
                                            <label><input type="checkbox" name="qp_mensualidades[]"> Oct</label>
                                            <label><input type="checkbox" name="qp_mensualidades[]"> Nov</label>
                                            <label><input type="checkbox" name="qp_mensualidades[]"> Dic</label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label for="qp_precio">Precio/mes:</label>
                                    </td>
                                    <td>
                                        <input type="number" id="qp_precio" name="qp_precio" value="60.00" readonly>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label for="qp_descuento">Desc extra:</label>
                                    </td>
                                    <td>
                                        <input type="number" id="qp_descuento" name="qp_descuento">
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label for="qp_concepto">Concepto:</label>
                                    </td>
                                    <td>
                                        <input type="text" id="qp_concepto" name="qp_concepto">
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label for="qp_tipo">Tipo:</label>
                                    </td>
                                    <td>
                                        <select id="qp_tipo" name="qp_tipo">
                                            <option value="">-- Selecciona tipo --</option>
                                            <option value="bizum">Bizum</option>
                                            <option value="transferencia">Transferencia</option>
                                            <option value="tarjeta">Tarjeta</option>
                                            <option value="efectivo">Efectivo</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label for="qp_fecha">Fecha:</label>
                                    </td>
                                    <td>
                                        <input type="date" id="qp_fecha" name="qp_fecha">
                                        <script>
                                            document.getElementById("qp_fecha").value = new Date().toISOString().split("T")[0]
                                        </script>
                                    </td>
                                </tr>
                            </table>
                            <div id="confirmationDisplay" class="full center"></div>
                            <div id="submitButton" class="full center">
                                <button type="button">Registrar</button>
                            </div>
                        </form>
                    </div>
                    <div class="center gap-md">
                        <button class="warn" onclick="cancelStudentInsertion()">Cancelar inserción</button>
                        <button onclick="submitNewStudent()">Guardar alumno</button>
                    </div>
                </div>
            </div>
        </div>`

    document.querySelector('body').appendChild(div);
    document.getElementById("fecha").value = new Date().toISOString().split("T")[0]
}