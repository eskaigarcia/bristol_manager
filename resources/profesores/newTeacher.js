let selectedDays;

function createTeacher() {
    storage.pendingEdits = true;
    let div = document.createElement('div');
    div.className = 'modal';
    div.id = 'popUpModal';
    selectedDays = [];

    div.innerHTML = `
        <div>
            <div class="header">
                <div>
                    <h2>Nuevo Profesor</h2>
                </div>
                <img onclick="tryCloseGroupModal()" class="iconButton" src="./img/close.png" alt="Cerrar">
            </div>
            <div class="body noMeta">
                <div id="modalBodyView" style="margin-top: 1rem;">
                    <div class="scrollspySection" id="SDVData">
                        <div class="flex clear-between">
                            <h3>Datos del profesor</h3>
                            <p class="requiredAlert">Los campos marcados con <span class="requiredMark">*</span> son obligatorios</p>
                        </div>

                        <form name="insgrupo" id="groupForm" method="POST">
                            <table class="camo inputMode">
                                <tr>
                                    <td><label for="ng_nombre">Nombre del prfesro:<span class="requiredMark">*</span></label></td>
                                    <td><input type="text" id="ng_nombre" name="ng_nombre" placeholder="Introduce el nombre del grupo" required></td>
                                </tr>
                            </table>
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
        precio: parseInt(parseFloat(document.getElementById('ng_precio').value) / 100),
        esIntensivo: document.getElementById('ng_esIntensivo').checked ? 1 : 0,
        fecha: document.getElementById('ng_fecha').value,
        horasSemanales:  parseInt(document.getElementById('ng_horasSemanales').value) * 2,
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
    
    data.horario = JSON.stringify(_ex.schedule.encode(horariosUnificados));

    // Push to database 
    fetch('./resources/grupos/newGroup.php', {
        method: 'POST',
        headers:
         {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(async response => {
        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message || 'Error desconocido');
        }
        return result;
    })
    .then(result => {
        if (result.success) {
            _ex.ui.toast.make('Grupo guardado correctamente', 'Ok', false);
        } else {
            console.error('Error al guardar:', result.message);
            _ex.ui.toast.make('Error al guardar el grupo: ' + (result.message || ''));
        }
    })
    .catch(err => {
        try {
            const phpError = JSON.parse(err.message);
            console.error('Error SQL:', phpError);
            _ex.ui.toast.make('Error de base de datos: ' + phpError.error);
        } catch {
            console.error('Error completo:', err);
            _ex.ui.toast.make('Error de conexión al guardar el grupo');
        }
    });

    closeGroupModal()
}