let selectedDays;

function createGroup() {
    storage.pendingEdits = true;
    let div = document.createElement('div');
    div.className = 'modal';
    div.id = 'popUpModal';
    selectedDays = [];

    div.innerHTML = `
        <div>
            <div class="header">
                <div>
                    <h2>Nuevo Grupo</h2>
                </div>
                <img onclick="tryCloseGroupModal()" class="iconButton" src="./img/close.png" alt="Cerrar">
            </div>
            <div class="body noMeta">
                <div id="modalBodyView" style="margin-top: 1rem;">
                    <div class="scrollspySection" id="SDVData">
                        <div class="flex clear-between">
                            <h3>Datos de la clase</h3>
                            <p class="requiredAlert">Los campos marcados con <span class="requiredMark">*</span> son obligatorios</p>
                        </div>

                        <form name="insgrupo" id="groupForm" method="POST">
                            <table class="camo inputMode">
                                <tr>
                                    <td><label for="ng_nombre">Nombre del grupo:<span class="requiredMark">*</span></label></td>
                                    <td><input type="text" id="ng_nombre" name="ng_nombre" placeholder="Introduce el nombre del grupo" required></td>
                                </tr>
                            </table>
                            <div class="flex gap-md">
                                <table class="camo inputMode">
                                    <tr>
                                        <td><label for="ng_profesor">Profesor:<span class="requiredMark">*</span></label></td>
                                        <td>
                                            <select id="ng_profesor" name="ng_profesor" required></select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><label for="ng_modalidad">Modalidad:</label></td>
                                        <td>
                                            <select id="ng_modalidad" name="ng_modalidad">
                                                <option value="">-- Selecciona modalidad --</option>
                                                <option value="presencial">Presencial</option>
                                                <option value="online">Online</option>
                                                <option value="hibrido">Híbrido</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><label for="ng_precio">Precio (en euros):<span class="requiredMark">*</span></label></td>
                                        <td><input type="number" id="ng_precio" name="ng_precio" min="0" step="0.01" required></td>
                                    </tr>
                                    <tr>
                                        <td><label for="ng_esIntensivo">Intensivo</label></td>
                                        <td>
                                            <input type="checkbox" id="ng_esIntensivo" name="ng_esIntensivo" value="1">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><label for="ng_creacion" id="creacion" name="creacion">Fecha de creación:</td>
                                        <td>
                                            <input type="date" id="ng_fecha" name="ng_fecha">
                                        </td>
                                    </tr>
                                </table>

                                <table class="camo inputMode">
                                    <tr>
                                        <td><label for="ng_horasSemanales">Horas semanales:</label></td>
                                        <td>
                                            <input type="number" id="ng_horasSemanales" name="ng_horasSemanales">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><label>Días:</label></td>
                                        <td>
                                            <div class="multipicker" id="dayMultipicker" onchange="updateScheduleInput()">
                                                <label><input type="checkbox" value="Lunes">L</label>
                                                <label><input type="checkbox" value="Martes">M</label>
                                                <label><input type="checkbox" value="Miércoles">X</label>
                                                <label><input type="checkbox" value="Jueves">J</label>
                                                <label><input type="checkbox" value="Viernes">V</label>
                                                <label><input type="checkbox" value="Sábado">S</label>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Horarios:</td>
                                        <td>
                                            <table id="scheduleBuilder"></table>
                                        </td>
                                    </tr>
                                </table>
                            </div>

                            <div class="center gap-md" style="margin-top: 1rem;">
                                <button class="warn" onclick="closeGroupModal()" type="button">Cancelar inserción</button>
                                <button onclick="validateGroup()" type="button">Guardar grupo</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>`;

    document.body.appendChild(div);
    document.getElementById("ng_fecha").value = new Date().toISOString().split("T")[0]
    getTeachersForNG()
}

function tryCloseGroupModal() {
    if (storage.pendingEdits) {
        _ex.ui.toast.make('Tienes cambios sin guardar');
        return;
    }
    closeGroupModal();
}

function closeGroupModal() {
    storage.pendingEdits = false;
    const modal = document.getElementById('popUpModal');
    if (modal) modal.remove();
}

function updateScheduleInput () {
    const display = document.getElementById('scheduleBuilder');
    const dayPicker = document.getElementById('dayMultipicker');
    const currentPick = Array.from(dayPicker.querySelectorAll('input[type="checkbox"]'))
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

    // Find days to add and remove
    const daysToAdd = currentPick.filter(day => !selectedDays.includes(day));
    const daysToRemove = selectedDays.filter(day => !currentPick.includes(day));

    // Remove rows for unchecked days
    daysToRemove.forEach(day => {
        const existingRow = display.querySelector(`tr[data-day="${day}"]`);
        if (existingRow) existingRow.remove();
    });

    // Add rows for newly checked days
    daysToAdd.forEach(day => {
        // Map full day names to their short codes
        const dayMap = {
            'Lunes': 'L',
            'Martes': 'M',
            'Miércoles': 'X',
            'Jueves': 'J',
            'Viernes': 'V',
            'Sábado': 'S'
        };
        const shortDay = dayMap[day] || day;

        const row = document.createElement('tr');
        row.setAttribute('data-day', day);
        row.innerHTML = `
        <td>
            <label for="scheduleStart_${shortDay}">${shortDay} de: </label>
            <input type="text" id="scheduleStart_${shortDay}" name="horarioHoras[]" placeholder="00:00"><br>
        </td>
        <td>
            <label for="scheduleEnd_${shortDay}"><b>a:</b></label>
            <input type="text" id="scheduleEnd_${shortDay}" name="horarioHorasFin[]" placeholder="00:00">
        </td>
        `;
        display.appendChild(row);
    });

    selectedDays = currentPick;
}

function validateGroup() {
    const existingAlert = document.getElementById('alertMissingData');
    if (existingAlert) {
        existingAlert.remove();
    }

    const requiredFields = [
        document.getElementById('ng_nombre'),
        document.getElementById('ng_profesor'),
        document.getElementById('ng_precio')
    ];
    let missingValues = requiredFields.some(field => !field || !field.value.trim());

    if(missingValues && storage.warnings) {
        _ex.ui.dialog.make('Grupo con posibles errores', 'El grupo que intentas añadir tiene errores. Pulsa volver para revisar los datos o pulsa continuar de todas formas si quieres añadir el grupo a pesar de los errores.', saveGroupToDatabase, 'Continuar de todas formas', true, 'Volver');
    } else if (missingValues) {
        storage.warnings = true;
        const groupForm = document.getElementById('groupForm');
        const warningDiv = document.createElement('div');
        warningDiv.className = 'inlineFormWarning';
        warningDiv.id="alertMissingData"
        warningDiv.innerHTML = `
            <p>Faltan datos</p>
            <p>Los campos marcados con asterisco son obligatorios</p>
        `;
        groupForm.insertBefore(warningDiv, groupForm.querySelector('div').nextSibling);
    } else {
        saveGroupToDatabase()
    }
}

function saveGroupToDatabase() {
    storage.warnings = false;


    // Get values from the form using .value and .checked
    const data = {
        nombre_grupo: document.getElementById('ng_nombre').value,
        id_profesor: document.getElementById('ng_profesor').value,
        modalidad: document.getElementById('ng_modalidad').value,
        precio: document.getElementById('ng_precio').value,
        esIntensivo: document.getElementById('ng_esIntensivo').checked ? 1 : 0,
        fecha: document.getElementById('ng_fecha').value,
        horasSemanales:  document.getElementById('ng_horasSemanales').value * 2,
    };

    const dayCheckboxes = document.querySelectorAll('#dayMultipicker input[type="checkbox"]:checked');
    const diasSeleccionados = Array.from(dayCheckboxes).map(cb => cb.labels[0].textContent.trim());
    const horariosInicio = [];
    const horariosFin = [];

    diasSeleccionados.forEach(dia => {
        const startInput = document.getElementById(`scheduleStart_${dia}`);
        const endInput = document.getElementById(`scheduleEnd_${dia}`);
        horariosInicio.push(startInput ? startInput.value : '');
        horariosFin.push(endInput ? endInput.value : '');
    });

    const horariosUnificados = diasSeleccionados.map((dia, idx) => [
        dia,
        horariosInicio[idx] || '',
        horariosFin[idx] || ''
    ]);
    
    console.log(horariosUnificados)



    closeGroupModal()
}