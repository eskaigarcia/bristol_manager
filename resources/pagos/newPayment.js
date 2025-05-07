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
                        <input style="display: none;" id="qp_id_alumno" name="qp_id_alumno">
                            <table class="camo inputMode">
                                <tr>
                                    <td>
                                        <label for="qp_alumno">Alumno:</label>
                                    </td>
                                    <td>
                                        <input type="text" id="qp_alumno" name="qp_alumno" oninput="studentTypeAhead()">
                                        <div id="typeAhead"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label for="qp_grupo">Grupo:</label>
                                    </td>
                                    <td>
                                        <select id="qp_grupo" name="qp_grupo">
                                            <option value="">Introduzca primero un alumno</option>
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
                                        <input type="number" id="qp_precio" name="qp_precio" readonly disabled>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label for="qp_descuento">Descuento/mes:</label>
                                    </td>
                                    <td>
                                        <input type="number" id="qp_descuento" name="qp_descuento" readonly disabled>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label for="qp_descuento_extra">Descuento extra/mes:</label>
                                    </td>
                                    <td>
                                        <input type="number" id="qp_descuento_extra" name="qp_descuento_extra" min="0" step="0.5">
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

    // Process money
    let price = (isNaN(parseFloat(document.getElementById('qp_precio').value)))
    ? 0 : parseFloat(document.getElementById('qp_precio').value);

    let discount = (isNaN(parseFloat(document.getElementById('qp_descuento').value)))
    ? 0 : parseFloat(document.getElementById('qp_descuento').value);

    let extraDiscount = (isNaN(parseFloat(document.getElementById('qp_descuento_extra').value)))
    ? 0 : parseFloat(document.getElementById('qp_descuento_extra').value);


    let money = (price - discount - extraDiscount).toFixed(2);
    

    if (name == '') name = '___';
    else {
        let parts = name.split('​'); // THERE IS A ZERO WIDTH SPACE HERE
        name = parts[0] + ' ' + (parts[1] ? parts[1].trim().charAt(0) : '') + '.';
    }

    if (group == '-- Seleccione un grupo --' || group == 'Introduzca primero un alumno') group = '___';

    let selectedMonthsArray = Array.from(document.querySelectorAll('#monthSelection input[type="checkbox"]:checked'))
        .map(checkbox => new Date(2000, checkbox.value - 1).toLocaleString('es-ES', { month: 'long' }));
    let selectedMonths = selectedMonthsArray.length > 1 
        ? selectedMonthsArray.slice(0, -1).join(', ') + ' y ' + selectedMonthsArray[selectedMonthsArray.length - 1] 
        : selectedMonthsArray.join('');

    if (selectedMonths) months = selectedMonths;

    if (money == 0) money = '___';
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

function studentTypeAhead() {
    const query = document.getElementById('qp_alumno').value.replace(/\u200B/g, '');
    const suggestionBox = document.getElementById("typeAhead");

    if(query.length >= 3) {
    fetch("./resources/pagos/qp_studentTypeAhead.php?q=" + encodeURIComponent(query))
        .then(response => response.json())
        .then(data => {
            suggestionBox.innerHTML = "";
            if (data.results.length > 0) {
                data.results.forEach(item => {
                    console.log(item)
                    const div = document.createElement("div");
                    div.textContent = item.nombre_completo;
                    div.style.cursor = "pointer";
                    div.addEventListener("click", () => {
                        document.getElementById("qp_alumno").value = item.nombre_completo;
                        document.getElementById("qp_id_alumno").value = item.id_alumno;
                        suggestionBox.style.display = "none";
                        updateNewPaymentFrontend();
                        getStudentGroups(item.id_alumno);
                    });
                    suggestionBox.appendChild(div);
                });
                suggestionBox.style.display = "block";
            } else {
                const div = document.createElement("div");
                div.textContent = 'Ningún resultado';
                div.style.cursor = "default"; // Make it non-clickable
                suggestionBox.style.display = "block";
                suggestionBox.appendChild(div);
            }
        });
    } else {
        suggestionBox.style.display = "none";
    }
}

async function getStudentGroups(id_alumno) {
    const node = document.getElementById('qp_grupo');
    if (!node) return;

    // Remove empty option
    const emptyOption = node.querySelector('option[value=""]');
    if (emptyOption && emptyOption.textContent === 'Introduzca primero un alumno') {
        node.removeChild(emptyOption);
    }

    // Add default option
    const defaultOpt = document.createElement('option');
    defaultOpt.value = '';
    defaultOpt.textContent = '-- Seleccione un grupo --';
    node.appendChild(defaultOpt);

    try {
        const response = await fetch('./resources/pagos/qp_getGroupSelector.php?q=' + encodeURIComponent(id_alumno));
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const groups = await response.json();
        groups.forEach(group => {
            const option = document.createElement('option');
            option.textContent = group.nombre;
            option.value = group.id_grupo;
            option.dataset.precio = group.precio; // Attach the price as a data attribute
            node.appendChild(option);
        });

        // Add event listener to update price when a group is selected
        node.addEventListener('change', () => {
            const selectedOption = node.options[node.selectedIndex];
            const price = selectedOption.dataset.precio || 0;
            document.getElementById('qp_precio').value = parseFloat(price).toFixed(2);
            updateNewPaymentFrontend();
        });
    } catch (error) {
        console.error('Error fetching group selector:', error);
    }
}