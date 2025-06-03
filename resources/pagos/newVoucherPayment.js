function createVoucherPayment() {
    // storage.pendingEdits = true;
    let div = document.createElement('div');
    div.className = 'modal';
    div.id = 'popUpModal';

    div.innerHTML = `
        <div>
            <div class="header">
                <div>
                    <h2>Nuevo bono</h2>
                </div>
                <img onclick="removeDetailsModal()" class="iconButton" src="./img/close.png" alt="Cerrar">
            </div>

            <div class="body noMeta">
                <div id="modalBodyView" style="margin-top: 1rem;">
                    <div class="ticketView">
                        <form id="quickPayment">
                        <input style="display: none;" id="qp_id_alumno" name="qp_id_alumno">
                            <table class="camo inputMode">
                                <tr>
                                    <td>
                                        <label for="qp_alumno">Alumno:</label>
                                    </td>
                                    <td>
                                        <input type="text" id="qp_alumno" name="qp_alumno" oninput="studentTypeAheadVoucher()" onchange="voucherPreview.renderName()">
                                        <div id="typeAhead"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label for="qp_amt">Cantidad de clases (horas):</label>
                                    </td>
                                    <td>
                                        <input type="number" id="qp_amt" name="qp_amt" min="1" oninput="voucherPreview.renderPrice()">
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label for="qp_precio_por_clase">Precio por hora:</label>
                                    </td>
                                    <td>
                                        <input type="number" id="qp_precio_por_clase" name="qp_precio_por_clase" min="0" step="1" oninput="voucherPreview.renderPrice()">
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label for="qp_descuento_extra">Descuento extra:</label>
                                    </td>
                                    <td>
                                        <input type="number" id="qp_descuento_extra" name="qp_descuento_extra" min="0" step="0.5" oninput="">
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
                                            <option value="efectivo">Efectivo</option>
                                            <option value="otro">Otro</option>
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
                            <div class="blockHighlight" id="paymentInputOverview">
                                <p class="qp_previewHighlight"><span id="qp_previewName">___</span> paga <span id="qp_previewOPrice"></span><span id="qp_previewPrice">___</span>€</p>
                                <p>por <span id="qp_previewAmt">___</span> clases individuales.</p>
                            </div>
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
                        <button class="warn" onclick="removeDetailsModal()">Cancelar pago</button>
                        <button onclick="registerPaymentVoucher()">Guardar pago y bono</button>
                    </div>
                </div>
            </div>
        </div>`

    document.querySelector('body').appendChild(div);
    document.getElementById("qp_fecha").value = new Date().toISOString().split("T")[0]
}

function studentTypeAheadVoucher() {
    const query = document.getElementById('qp_alumno').value.replace(/\u200B/g, '');
    const suggestionBox = document.getElementById("typeAhead");

    if(query.length >= 3) {
    fetch("./resources/pagos/qp_studentTypeAhead.php?q=" + encodeURIComponent(query))
        .then(response => response.json())
        .then(data => {
            suggestionBox.innerHTML = "";
            if (data.results.length > 0) {
                data.results.forEach(item => {
                    const div = document.createElement("div");
                    div.textContent = item.nombre_completo;
                    div.style.cursor = "pointer";
                    div.addEventListener("click", () => {
                        document.getElementById("qp_alumno").value = item.nombre_completo;
                        document.getElementById("qp_id_alumno").value = item.id_alumno;
                        suggestionBox.style.display = "none";
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

const voucherPreview = {
    currentStudent: 0,

    renderName() {
        let name = document.getElementById('qp_alumno').value;
        if (name == '') name = '___';
        else {
            let parts = name.split('​'); // THERE IS A ZERO WIDTH SPACE HERE
            name = parts[0] + ' ' + (parts[1] ? parts[1].trim().charAt(0) : '') + '.';
        }
        document.getElementById('qp_previewName').innerText = name;
    },

    renderPrice() {
        const amt = document.getElementById('qp_amt').value;
        const customprice = document.getElementById('qp_precio_por_clase').value

        storage.prices = {}
        storage.prices.amt = amt
        
        if(customprice != '') {
            const basePrice = (amt * customprice);
            const discount = document.getElementById('qp_descuento_extra').value;
            const finalPrice = basePrice - discount;
            storage.prices.finalPrice = finalPrice
            document.getElementById('qp_previewPrice').innerText = finalPrice.toFixed(2);
            document.getElementById('qp_previewAmt').innerText = amt;
            return
        }
        
        const blocks = parseInt(amt/5);
        const extras = parseInt(amt%5);
        const basePrice = (blocks * 80) + (extras * 18);
        
        const discount = document.getElementById('qp_descuento_extra').value;
        const finalPrice = basePrice - discount;
        document.getElementById('qp_previewPrice').innerText = finalPrice.toFixed(2);
        document.getElementById('qp_previewAmt').innerText = amt;
        storage.prices.finalPrice = finalPrice
    },

}


async function registerPaymentVoucher() {
    // Collect form data
    const id_alumno = document.getElementById('qp_id_alumno').value;
    const fechaPago = document.getElementById('qp_fecha').value;
    const metodoPago = document.getElementById('qp_tipo').value;
    const precioTotal = storage.prices.finalPrice;
    const descuentoExtra = document.getElementById('qp_descuento_extra').value || 0;
    const conceptoDescuento = document.getElementById('qp_concepto').value;
    const descripcion = 'Bono de ' + storage.prices.amt + ' clases individuales';

    // Basic validation
    if (!id_alumno || !fechaPago || !metodoPago) {
        _ex.ui.toast.make('Por favor, rellena todos los campos obligatorios.', 'Aceptar', false);
        return;
    }

    // Prepare payload
    const payload = {
        id_alumno: id_alumno,
        descripcion: descripcion,
        tipoPago: 'bono',
        fechaPago: fechaPago,
        metodoPago: metodoPago,
        precioTotal: precioTotal * 100,
        descuentoExtra: descuentoExtra * 100,
        conceptoDescuento: conceptoDescuento
    };

    try {
        const response = await fetch('./resources/pagos/insertPayment.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const result = await response.json();
        if (result.success) {
            registerVoucher()
        } else {
            _ex.ui.toast.make('Error al registrar el pago: ' + (result.message || 'Error desconocido'), 'Aceptar', false);
        }
    } catch (e) {
        _ex.ui.toast.make('Error de red al registrar el pago.', 'Aceptar', false);
    }
}

async function registerVoucher() {
    const id_alumno = document.getElementById('qp_id_alumno').value;
    const cantidadClases = document.getElementById('qp_amt').value;
    const fechaPago = document.getElementById('qp_fecha').value;
    const metodoPago = document.getElementById('qp_tipo').value;
    const precioTotal = storage.prices.finalPrice;

    // Calculate caducidad (expiry date): 1 year from payment date
    let caducidad = '';
    if (fechaPago) {
        const d = new Date(fechaPago);
        d.setFullYear(d.getFullYear() + 1);
        // Set caducidad to the closest upcoming 31st of July (academic year end)
        let year = d.getMonth() > 6 ? d.getFullYear() + 1 : d.getFullYear();
        caducidad = `${year}-07-31`;
    }

    // Basic validation
    if (!id_alumno || !cantidadClases || !fechaPago || !metodoPago || !precioTotal) {
        _ex.ui.toast.make('Faltan datos para registrar el bono.', 'Aceptar', false);
        return;
    }

    const payload = {
        id_alumno: id_alumno,
        cantidadClases: cantidadClases,
        caducidad: caducidad,
        precioTotal: precioTotal * 100,
        fechaPago: fechaPago,
        metodoPago: metodoPago
    };

    try {
        const response = await fetch('./resources/pagos/registerVoucher.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const result = await response.json();
        if (result.success) {
            _ex.ui.toast.make('Bono registrado correctamente', 'Aceptar', false);
            removeDetailsModal();
        } else {
            _ex.ui.toast.make('Error al registrar el bono: ' + (result.message || 'Error desconocido'), 'Aceptar', false);
        }
    } catch (e) {
        _ex.ui.toast.make('Error de red al registrar el bono.', 'Aceptar', false);
    }
}