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
                    <div class="ticketView">
                        <form id="quickPayment" onchange="updateNewPaymentFrontend()">
                            <table class="camo inputMode">
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
                                        <label>Mensualidades:</label>
                                    </td>
                                    <td>
                                        <div class="multipicker" id="monthSelection">
                                            <label><input type="checkbox" value="1">Ene</label>
                                            <label><input type="checkbox" value="2">Feb</label>
                                            <label><input type="checkbox" value="3">Mar</label>
                                            <label><input type="checkbox" value="4">Abr</label>
                                            <label><input type="checkbox" value="5">May</label>
                                            <label><input type="checkbox" value="6">Jun</label>
                                            <label><input type="checkbox" value="7">Jul</label>
                                            <label><input type="checkbox" value="8">Ago</label>
                                            <label><input type="checkbox" value="9">Sep</label>
                                            <label><input type="checkbox" value="10">Oct</label>
                                            <label><input type="checkbox" value="11">Nov</label>
                                            <label><input type="checkbox" value="12">Dic</label>
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
                                        <label for="qp_descuento">Descuento extra/mes:</label>
                                    </td>
                                    <td>
                                        <input type="number" id="qp_descuento" name="qp_descuento">
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label for="qp_concepto">Concepto descuento:</label>
                                    </td>
                                    <td>
                                        <input type="text" id="qp_concepto" name="qp_concepto">
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label for="qp_tipo">Método de pago:</label>
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
                                        <label for="qp_fecha">Fecha del pago:</label>
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
                        </form>
                        <div>
                            <div class="blockHighlight" id="paymentInputOverview"></div>
                            <div>
                                Cursos en los que estoy activo
                                Clases futuras si las tengo
                                Pagos recientes o pendientes
                                Descuentos previos y correspondientesç
                                No está inscrita en ningún grupo: inscribir en grupo en su lugar o vender bono
                            </div>
                        </div>
                    </div>
                    <div class="center gap-md">
                        <button class="warn" onclick="cancelStudentInsertion()">Cancelar pago</button>
                        <button onclick="submitNewStudent()">Guardar pago</button>
                    </div>
                </div>
            </div>
        </div>`

    document.querySelector('body').appendChild(div);
    document.getElementById("qp_fecha").value = new Date().toISOString().split("T")[0]
}

function updateNewPaymentFrontend() {
    let name = document.getElementById('qp_alumno').value;
    let group = document.getElementById('qp_grupo').options[document.getElementById('qp_grupo').selectedIndex].text;
    let months = '___';
    let money;
    if (!isNaN(parseFloat(document.getElementById('qp_descuento').value))) {
        money = (parseFloat(document.getElementById('qp_precio').value) - parseFloat(document.getElementById('qp_descuento').value)).toFixed(2);
    } else {
        money = parseFloat(document.getElementById('qp_precio').value).toFixed(2);
    }
    

    if (name == '') name = '___';
    else {
        let parts = name.split('​'); // THERE IS A ZERO WIDTH SPACE HERE
        name = parts[0] + ' ' + (parts[1] ? parts[1].trim().charAt(0) : '' + '.');
    }

    if (group == 'Seleccione un grupo') group = '___';

    let selectedMonthsArray = Array.from(document.querySelectorAll('#monthSelection input[type="checkbox"]:checked'))
        .map(checkbox => new Date(2000, checkbox.value - 1).toLocaleString('es-ES', { month: 'long' }));
    let selectedMonths = selectedMonthsArray.length > 1 
        ? selectedMonthsArray.slice(0, -1).join(', ') + ' y ' + selectedMonthsArray[selectedMonthsArray.length - 1] 
        : selectedMonthsArray.join('');

    if (selectedMonths) months = selectedMonths;

    if (money == 'NaN') money = '___';
    else {
        money *= selectedMonthsArray.length
    }

    // Build the summary safely
    const overview = document.getElementById('paymentInputOverview');
    overview.innerHTML = ''; // Clear previous content

    const p = document.createElement('p');
    const span = document.createElement('span');
    span.textContent = `${name} paga ${money}€`;
    p.appendChild(span);

    p.appendChild(document.createElement('br'));

    const text = document.createTextNode(`por "${group}" ${months}`);
    p.appendChild(text);

    overview.appendChild(p);
}