function createGroup() {
    // CONSTRUCCIÓN FINAL DE LA INTERFAZ
    // storage.pendingEdits = true;
    let div = document.createElement('div');
    div.className = 'modal';
    div.id = 'popUpModal';

    div.innerHTML = `
        <div>
            <div class="header">
                <div>
                    <h2>Nuevo Grupo</h2>
                </div>
                <img onclick="removeDetailsModal()" class="iconButton" src="./img/close.png" alt="Cerrar">
            </div>

            <div class="body noMeta">
                <div id="modalBodyView" style="margin-top: 1rem;">
                    <div class="scrollspySection" id="SDVData">
                        <div class="flex clear-between">
                            <h3>Datos de la clase</h3>
                            <p class="requiredAlert">Los campos marcados con <span class="requiredMark">*</span> son obligatorios</p>
                        </div>
                        <form name="insgrupo" method="POST">
                            <div class="flex">
                                <label for="nombre">Nombre del grupo:</label>
                                <input type="text" id="nombre" name="nombre" placeholder="Introduce el nombre del grupo" required>
                            </div>
                            <div class="flex gap-md">
                                <table class="camo">
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
                                                <option value="1.5">1.5 Hora</option>
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
                                </table>
                                <table class="camo">
                                    <tr>
                                        <td><label for="id_profesor">ID del Profesor:</label></td>
                                        <td><input type="number" id="id_profesor" name="id_profesor" placeholder="Introduce el ID del profesor" required></td>
                                    </tr>
                                    <tr>
                                        <td><label for="horarioDias">Días de clase:</label></td>
                                        <td>
                                            <select id="horarioDias" name="horarioDias[]" multiple required>
                                                <option value="Lunes">Lunes</option>
                                                <option value="Martes">Martes</option>
                                                <option value="Miércoles">Miércoles</option>
                                                <option value="Jueves">Jueves</option>
                                                <option value="Viernes">Viernes</option>
                                                <option value="Sábado">Sábado</option>
                                                <option value="Domingo">Domingo</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><label for="horarioHoras">Horas de clase:</label></td>
                                        <td><input type="text" id="horarioHoras" name="horarioHoras" placeholder="Ejemplo: 09:00, 11:00" required></td>
                                    </tr>
                                    <tr>
                                        <td><label for="horarioDuraciones">Duraciones de clase:</label></td>
                                        <td><input type="text" id="horarioDuraciones" name="horarioDuraciones" placeholder="Ejemplo: 60, 90" required></td>
                                    </tr>
                                </table>
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
};


function saveStudentToDatabase() {
    storage.pendingEdits = false;

    // Gather all form data
    const getValue = id => document.getElementById(id)?.value?.trim() || '';
    const getRadio = name => {
        const checked = document.querySelector(`input[name="${name}"]:checked`);
        return checked ? checked.value : '';
    };

    // Student main data
    const data = {
        fecha: getValue('fecha'),
        nombre: getValue('nombre'),
        apellidos: getValue('apellidos'),
        adulto: getRadio('adulto'),
        dni: getValue('dni'),
        telefono: getValue('telefono'),
        email: getValue('email'),
        direccion: getValue('direccion'),
        codigo_postal: getValue('codigo_postal'),
        localidad: getValue('localidad'),
        iban: getValue('iban'),
        comentarios_medicos: getValue('comentarios_medicos'),
        // Emergency contacts
        contact1: {
            name: getValue('contact1_name'),
            phone: getValue('contact1_phone'),
            relation: getValue('contact1_relation')
        },
        contact2: {
            name: getValue('contact2_name'),
            phone: getValue('contact2_phone'),
            relation: getValue('contact2_relation')
        },
        // Guardian (if present)
        guardian: null
    };

    // Check if guardian fields exist (minor or user added guardian)
    if (document.getElementById('guardian_nombre')) {
        data.guardian = {
            nombre: getValue('guardian_nombre'),
            apellidos: getValue('guardian_apellidos'),
            dni: getValue('guardian_dni'),
            telefono: getValue('guardian_telefono'),
            email: getValue('guardian_email'),
            direccion: getValue('guardian_direccion'),
            codigo_postal: getValue('guardian_codigo_postal'),
            localidad: getValue('guardian_localidad'),
            iban: getValue('guardian_iban')
        };
    }

    fetch('./resources/alumnos/newStudent.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(result => {
        if (result.success) {
            // Set flag to show toast after reload
            sessionStorage.setItem('studentAdded', '1');
            document.getElementById('studentDataModal').remove();
            location.reload();
        } else {
            _ex.ui.toast.make('Error al añadir el alumno: ' + (result.message || ''));
        }
    })
    .catch(() => {
        _ex.ui.toast.make('Error al procesar la solicitud.');
    });
}