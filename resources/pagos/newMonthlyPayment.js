const paymentStorage = {
    id_alumno: 0,
    amonestado: false,
    monthSelection: null,
}

function createMonthlyPayment() {
    // storage.pendingEdits = true;
    let div = document.createElement('div');
    div.className = 'modal';
    div.id = 'popUpModal';

    div.innerHTML = `
        <div>
            <div class="header">
                <div>
                    <h2>Nuevo cobro de mensualidad</h2>
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
                                        <input type="text" id="qp_alumno" name="qp_alumno" oninput="studentTypeAhead()" onchange="paymentPreview.renderName()">
                                        <div id="typeAhead"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label for="qp_grupo">Grupo:</label>
                                    </td>
                                    <td>
                                        <select id="qp_grupo" name="qp_grupo" onchange="paymentPreview.renderAll()">
                                            <option value="">Introduzca primero un alumno</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td><label>Curso:</label></td>
                                    <td>
                                        <p class="stepper">
                                            <span onclick="courseStepper('prev')"><-</span>
                                            <input id="qp_course" name="qp_course" type="text" value="${courseStepper('init')}" readonly>
                                            <span onclick="courseStepper('next')">-></span>
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label>Mensualidades:</label>
                                    </td>
                                    <td>
                                        <div class="multipicker" id="monthSelection" onchange="paymentPreview.renderAll();">
                                            <label><input type="checkbox" value="8">Ago</label>
                                            <label><input type="checkbox" value="9">Sep</label>
                                            <label><input type="checkbox" value="10">Oct</label>
                                            <label><input type="checkbox" value="11">Nov</label>
                                            <label><input type="checkbox" value="12">Dic</label>
                                            <label><input type="checkbox" value="1">Ene</label>
                                            <label><input type="checkbox" value="2">Feb</label>
                                            <label><input type="checkbox" value="3">Mar</label>
                                            <label><input type="checkbox" value="4">Abr</label>
                                            <label><input type="checkbox" value="5">May</label>
                                            <label><input type="checkbox" value="6">Jun</label>
                                            <label><input type="checkbox" value="7">Jul</label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label for="qp_precio">Precio grupo:</label>
                                    </td>
                                    <td>
                                        <input type="number" id="qp_precio" name="qp_precio" readonly disabled>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label for="qp_descuento">Descuentos:</label>
                                    </td>
                                    <td class="flex gap-xs center">
                                        <span id="discountChip-amigo" class="discountChip" title="">Amigo</span>
                                        <span id="discountChip-familiar" class="discountChip" title="">Familiar</span>
                                        <span id="discountChip-adelantado" class="discountChip" title=""> Adelantado</span>
                                        <span id="discountChip-multi" class="discountChip" title="">Multi-grupo</span>
                                        <img id="amonestacion" class="iconButton mini" onclick="triggerAmonestacion()" src="./img/amonestar.png">
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label for="qp_descuento_extra">Descuento extra:</label>
                                    </td>
                                    <td>
                                        <input type="number" id="qp_descuento_extra" name="qp_descuento_extra" min="0" step="0.5" oninput="paymentPreview.renderAll()">
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
                                <p>por '<span id="qp_previewGroup">___</span>' <span id="qp_previewMonths">___</span>.</p>
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
                        <button onclick="registerPayment()">Guardar pago</button>
                    </div>
                </div>
            </div>
        </div>`

    document.querySelector('body').appendChild(div);
    document.getElementById("qp_fecha").value = new Date().toISOString().split("T")[0]
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
                        paymentPreview.currentStudent = item.id_alumno;
                        getStudentGroups();
                        processStudentDiscounts();
                        document.getElementById("qp_alumno").value = item.nombre_completo;
                        document.getElementById("qp_id_alumno").value = item.id_alumno;
                        suggestionBox.style.display = "none";
                        paymentPreview.renderAll();
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

function getStudentGroups() {
    const node = document.getElementById('qp_grupo');
    if (!node) return;

    // Remove empty option
    const emptyOption = node.querySelector('option[value=""]');
    if (emptyOption && emptyOption.textContent === 'Introduzca primero un alumno') {
        node.removeChild(emptyOption);
    }

    // Clear existing options
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }

    // Add default option
    const defaultOpt = document.createElement('option');
    defaultOpt.value = '';
    defaultOpt.textContent = '-- Seleccione un grupo --';
    node.appendChild(defaultOpt);

    try {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', './resources/pagos/qp_getGroupSelector.php?q=' + encodeURIComponent(paymentPreview.currentStudent), false); // false for synchronous
        xhr.send(null);

        if (xhr.status !== 200) {
            throw new Error(`HTTP error! status: ${xhr.status}`);
        }

        const groups = JSON.parse(xhr.responseText);

        // Must validate if groups are active before applying the discount

        paymentPreview.ongoingCourses = 0;

        groups.forEach(group => {
            const option = document.createElement('option');
            option.textContent = group.nombre;
            option.value = group.id_grupo;
            option.dataset.precio = group.precio; // Attach the price as a data attribute
            node.appendChild(option);
            paymentPreview.ongoingCourses++;
        });

        // Add event listener to update price when a group is selected
        node.addEventListener('change', () => {
            const selectedOption = node.options[node.selectedIndex];
            const price = selectedOption.dataset.precio || 0;
            document.getElementById('qp_precio').value = (parseFloat(price) / 100).toFixed(2);
            paymentPreview.renderAll();
        });
    } catch (error) {
        console.error('Error fetching group selector:', error);
    }
}

function courseStepper(direction) {
    let current;
    switch (direction) {
        case 'init':
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            if (currentDate.getMonth() >= 7) { // Months are 0-indexed, so 7 is August
                return `${currentYear}/${currentYear + 1}`;
            } else {
                return `${currentYear - 1}/${currentYear}`;
            }
        case 'next':
            current = document.getElementById('qp_course').value.split('/');
            document.getElementById('qp_course').value = (parseInt(current[0]) + 1) + '/' + (parseInt(current[1]) + 1);
            break;
        case 'prev':
            current = document.getElementById('qp_course').value.split('/');
            document.getElementById('qp_course').value = (parseInt(current[0]) - 1) + '/' + (parseInt(current[1]) - 1);
            break;
    }
    paymentPreview.renderMonths()
}


const paymentPreview = {
    currentStudent: 0,

    discounts: {
        friend: false,
        family: false,
        advancedPay: false,
        multiCourse: false
    },

    renderAll() {
        paymentPreview.renderName();
        paymentPreview.renderMonths();
        paymentPreview.renderPrice();
        paymentPreview.renderGroup();
        paymentPreview.renderDiscounts();
    },
    
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
        let basePrice = document.getElementById('qp_precio').value;
        let descuento = document.getElementById('qp_descuento_extra').value;

        let monthlyPrice = basePrice;
        if (paymentPreview.discounts.family) monthlyPrice -= 5;

        let defaultPrice = basePrice * paymentPreview.selectedMonths.length;
        let finalPrice = monthlyPrice * paymentPreview.selectedMonths.length;
        
        if (paymentPreview.discounts.friend || paymentPreview.discounts.multiCourse) finalPrice *= 0.9;
        else if (paymentPreview.discounts.advancedPay) finalPrice *= 0.95;

        finalPrice -= descuento;

        if (paymentPreview.esAmonestado) finalPrice = defaultPrice - descuento;
        
        if (defaultPrice != finalPrice && !isNaN(finalPrice)) document.getElementById('qp_previewOPrice').innerText = (defaultPrice).toFixed(2) + '€';
        else document.getElementById('qp_previewOPrice').innerText = '';

        storage.prices = {}
        storage.prices.finalPrice = (!isNaN(finalPrice)) ? finalPrice : 0;
        storage.prices.autoDiscount = descuento;
        
        if (isNaN(finalPrice)) finalPrice = '__';
        else document.getElementById('qp_previewPrice').innerText = (finalPrice).toFixed(2);
    },

    renderGroup() {
        let group = document.getElementById('qp_grupo').options[document.getElementById('qp_grupo').selectedIndex].text;
        if (group == '-- Seleccione un grupo --' || group == 'Introduzca primero un alumno') group = '___';
        document.getElementById('qp_previewGroup').innerText = group;
    },

    renderMonths() {
        let months = '___';

        // Get course years
        let courseValue = document.getElementById('qp_course').value;
        let [year1, year2] = courseValue.split('/').map(Number);

        // Get selected months and annotate with year
        let selectedCheckboxes = Array.from(document.querySelectorAll('#monthSelection input[type="checkbox"]:checked'));
        let selectedMonthsArray = selectedCheckboxes.map(checkbox => {
            let monthNum = Number(checkbox.value);
            let monthName = new Date(2000, monthNum - 1).toLocaleString('es-ES', { month: 'long' });
            let year = (monthNum >= 8) ? year1 : year2;
            return `${monthName} ${year}`;
        });

        let selectedMonths = selectedMonthsArray.length > 1 
            ? selectedMonthsArray.slice(0, -1).join(', ') + ' y ' + selectedMonthsArray[selectedMonthsArray.length - 1] 
            : selectedMonthsArray.join('');

        if (selectedMonths) {
            months = selectedMonths;
            paymentPreview.selectedMonths = selectedMonthsArray;
        } else {
            paymentPreview.selectedMonths = 0;
        }

        document.getElementById('qp_previewMonths').innerText = months;

        // Test for discount
        if (paymentPreview.selectedMonths.length >= 3) paymentPreview.discounts.advancedPay = true;
        else paymentPreview.discounts.advancedPay = false;
    },

    renderDiscounts() {
        let alreadyDiscounted = false;

        if (paymentPreview.esAmonestado) document.getElementById('amonestacion').src = './img/amonestar-true.png';
        else document.getElementById('amonestacion').src = './img/amonestar.png';

        document.getElementById('discountChip-amigo').classList.remove('active');
        document.getElementById('discountChip-familiar').classList.remove('active');
        document.getElementById('discountChip-adelantado').classList.remove('active');
        document.getElementById('discountChip-multi').classList.remove('active');
        document.getElementById('discountChip-adelantado').classList.remove('idle');
        document.getElementById('discountChip-multi').classList.remove('idle');
        document.getElementById('discountChip-amigo').classList.remove('restricted');
        document.getElementById('discountChip-familiar').classList.remove('restricted');
        document.getElementById('discountChip-adelantado').classList.remove('restricted');
        document.getElementById('discountChip-multi').classList.remove('restricted');
        document.getElementById('discountChip-amigo').title = '';
        document.getElementById('discountChip-familiar').title = '';
        document.getElementById('discountChip-adelantado').title = '';
        document.getElementById('discountChip-multi').title = '';

        if (paymentPreview.discounts.family) {
            document.getElementById('discountChip-familiar').classList.add('active');
            document.getElementById('discountChip-familiar').title = 'El descuento de familiares está activo. Se descontarán 5€ de cada mensualidad.';
        }

        if (paymentPreview.discounts.friend) {
            document.getElementById('discountChip-amigo').classList.add('active');
            document.getElementById('discountChip-amigo').title = 'El descuento de amigo está activo. Se descontará un 10% del precio final.';
            alreadyDiscounted = true;
        }

        if (paymentPreview.discounts.multiCourse) {
            if (alreadyDiscounted) {
                document.getElementById('discountChip-multi').classList.add('idle');
                document.getElementById('discountChip-multi').title = 'El descuento por estar inscrito en varios grupos no se aplica porque ya está activo el descuento por traer a un amigo.'
            } else {
                document.getElementById('discountChip-multi').classList.add('active');
                document.getElementById('discountChip-multi').title = 'El alumno está inscrito en varios grupos, se aplica un 10% de descuento sobre el precio final.'
            }
            alreadyDiscounted = true;
        }

        if (paymentPreview.discounts.advancedPay) {
            if (alreadyDiscounted) {
                document.getElementById('discountChip-adelantado').classList.add('idle');
                document.getElementById('discountChip-adelantado').title = 'El descuento de pago por adelantado no se aplica porque ya está activo el descuento por traer un amigo o por estar inscrito en múltiples grupos.'
            } else {
                document.getElementById('discountChip-adelantado').classList.add('active');
                document.getElementById('discountChip-adelantado').title = 'Se está pagando un trimestre por adelantado, se aplica un 5% de descuento sobre el precio final.'
            }
        }

        if (paymentPreview.esAmonestado) {
            if (document.getElementById('discountChip-amigo').classList.contains('active') || 
                document.getElementById('discountChip-amigo').classList.contains('idle')) {
                document.getElementById('discountChip-amigo').classList.remove('active', 'idle');
                document.getElementById('discountChip-amigo').classList.add('restricted');
                document.getElementById('discountChip-amigo').title = 'El descuento por traer a un amigo está inhabilitado porque el estudiante está amonestado.';
            }
            if (document.getElementById('discountChip-familiar').classList.contains('active') || 
            document.getElementById('discountChip-familiar').classList.contains('idle')) {
                document.getElementById('discountChip-familiar').classList.remove('active', 'idle');
                document.getElementById('discountChip-familiar').classList.add('restricted');
                document.getElementById('discountChip-familiar').title = 'El descuento por estudiar con familiares está inhabilitado porque el estudiante está amonestado.';
            }
            if (document.getElementById('discountChip-adelantado').classList.contains('active') || 
            document.getElementById('discountChip-adelantado').classList.contains('idle')) {
                document.getElementById('discountChip-adelantado').classList.remove('active', 'idle');
                document.getElementById('discountChip-adelantado').classList.add('restricted');
                document.getElementById('discountChip-adelantado').title = 'El descuento por pagar un trimestre por adelantado está inhabilitado porque el estudiante está amonestado.';
            }
            if (document.getElementById('discountChip-multi').classList.contains('active') || 
            document.getElementById('discountChip-multi').classList.contains('idle')) {
                document.getElementById('discountChip-multi').classList.remove('active', 'idle');
                document.getElementById('discountChip-multi').classList.add('restricted');
                document.getElementById('discountChip-multi').title = 'El descuento por estar inscrito en múltiples grupos está inhabilitado porque el estudiante está amonestado.';
            }
        }
    }
}

function triggerAmonestacion() {
    if (!paymentPreview.esAmonestado) {
        let text = 'Puedes amonestar un alumno por problemas de comportamiento o en sus pagos. Un alumno amonestado no podrá beneficiarse de ningún tipo de descuento';
        let action = performAmonestacion
        _ex.ui.dialog.make('Amonestar alumno', text, action, 'Amonestar', true)
    } else {
        let text = 'Este alumno fue amonestado previamente y no puede beneficiarse de ningún tipo de descuento. Puedes retirar la amonestación para devolverle el acceso a los descuentos.';
        let action = undoAmonestacion
        _ex.ui.dialog.make('Alumno amonestado', text, action, 'Retirar amonestación', true)
    }
}

async function processStudentDiscounts() {
    // Relational discounts
    const response = await fetch("./resources/pagos/qp_getStudentRelations.php?q=" + encodeURIComponent(paymentPreview.currentStudent));
    const data = await response.json();
    if(data.esAmonestado == 1) paymentPreview.esAmonestado = true;
    else paymentPreview.esAmonestado = false;

    paymentPreview.discounts.family = false;
    paymentPreview.discounts.friend = false;

    for (const item of data.results) {
        let id1 = item.id_alumno1;
        let id2 = item.id_alumno2;
        let otherStudent = (paymentPreview.currentStudent == id1) ? id2 : id1;
        console.log('Student: ' + otherStudent + ' ' + item.tipoRelacion + ' ' + item.fechaFin);

        if(item.tipoRelacion == 'familiar') {
            let test = await _ex.relMgr.testIsActiveStudent(otherStudent);
            if (test) paymentPreview.discounts.family = true;
            console.log('Family: ' + test);
        }   
        if(item.tipoRelacion == 'amigo' && (item.fechaFin == null || new Date(item.fechaFin) > new Date())) {
            let test = await _ex.relMgr.testIsActiveStudent(otherStudent);
            if (test) paymentPreview.discounts.friend = true;
            console.log('Friends: ' + test);
            if(item.tipoRelacion == 'amigo' && item.fechaFin == null && !test){
                _ex.relMgr.endFriendRelationship(item.id_relacion, true)
            }
        }
    }

    // Multicourse
    if (paymentPreview.ongoingCourses >= 2) paymentPreview.discounts.multiCourse = true;
    else paymentPreview.discounts.multiCourse = false;

    paymentPreview.renderAll();
}

function performAmonestacion() {
    fetch("./resources/pagos/amonestarEstudiante.php?q=" + encodeURIComponent(paymentPreview.currentStudent))
        .then(response => response.json())
        .then(_ex.ui.toast.make('Amonestación aplicada correctamente', 'Aceptar', false))
        .then(paymentPreview.esAmonestado = true)
        .then(paymentPreview.renderAll());
}

function undoAmonestacion() {
    fetch("./resources/pagos/desamonestarEstudiante.php?q=" + encodeURIComponent(paymentPreview.currentStudent))
        .then(response => response.json())
        .then( _ex.ui.toast.make('Amonestación retirada correctamente', 'Aceptar', false))
        .then(paymentPreview.esAmonestado = false)
        .then(paymentPreview.renderAll());
}

async function registerPayment() {
    // Collect form data
    const id_alumno = document.getElementById('qp_id_alumno').value;
    // Get selected months and annotate with correct year
    const courseValue = document.getElementById('qp_course').value;
    const [year1, year2] = courseValue.split('/').map(Number);
    const mesesPagados = Array.from(document.querySelectorAll('#monthSelection input[type="checkbox"]:checked')).map(cb => {
        const mes = Number(cb.value);
        const anio = (mes >= 8) ? year1 : year2;
        return `${mes.toString().padStart(2, '0')}/${anio}`;
    });
    const fechaPago = document.getElementById('qp_fecha').value;
    const metodoPago = document.getElementById('qp_tipo').value;
    const precioTotal = storage.prices.finalPrice;
    const descuentoCalculado = storage.prices.autoDiscount;
    const descuentoExtra = document.getElementById('qp_descuento_extra').value || 0;
    const conceptoDescuento = document.getElementById('qp_concepto').value;
    const descripcion = document.getElementById('qp_previewGroup').innerText;

    // Basic validation
    if (!id_alumno || !mesesPagados.length || !fechaPago || !metodoPago) {
        _ex.ui.toast.make('Por favor, rellena todos los campos obligatorios.', 'Aceptar', false);
        return;
    }

    // Prepare payload
    const payload = {
        id_alumno: id_alumno,
        tipoPago: 'mensualidad',
        mesesPagados: mesesPagados,
        descripcion: descripcion,
        fechaPago: fechaPago,
        metodoPago: metodoPago,
        precioTotal: precioTotal * 100,
        descuentoCalculado: descuentoCalculado * 100,
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
            _ex.ui.toast.make('Pago registrado correctamente', 'Aceptar', false);
            removeDetailsModal();
        } else {
            _ex.ui.toast.make('Error al registrar el pago: ' + (result.message || 'Error desconocido'), 'Aceptar', false);
        }
    } catch (e) {
        _ex.ui.toast.make('Error de red al registrar el pago.', 'Aceptar', false);
    }
}