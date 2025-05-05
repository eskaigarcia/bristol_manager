function createStudent() {
    // CONSTRUCCIÓN FINAL DE LA INTERFAZ
    storage.pendingEdits = true;
    let div = document.createElement('div');
    div.className = 'modal';
    div.id = 'popUpModal';

    div.innerHTML = `
        <div>
            <div class="header">
                <div>
                    <h2>Nuevo alumno</h2>
                </div>
                <img onclick="removeDetailsModal()" class="iconButton" src="./img/close.png" alt="Cerrar">
            </div>

            <div class="body noMeta">
                ${doTabBar_newStudent()}
                <div id="modalBodyView">
                    <div class="scrollspySection" id="SDVData">
                        <div class="flex clear-between">
                            <h3>Datos personales</h3>
                            <p class="requiredAlert">Los campos marcados con <span class="requiredMark">*</span> son obligatorios</p>
                        </div>
                        ${buildNewStudent()}
                    </div>
                    <div class="scrollspySection" id="SDVEmergencies">
                        ${buildNewEmgContacts()}
                    </div>
                    <div class="scrollspySection" id="SDVGuardian"></div>
                    <div class="scrollspySection" id="SDVFriends">
                        <h3>Amigos y familiares</h3>
                        ${buildNewRelations()}
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

    buildNewGuardian(false);
    startScrollSpy();
};

function doTabBar_newStudent() {
    return `<div class="tabs-scrollspy">
                    <a href="#SDVData">
                        <img src="./img/contactInfo.png" alt="Información y datos del alumno">
                        <span>Datos</span>
                    </a>
                    <a href="#SDVEmergencies">
                        <img src="./img/emergencyContact.png" alt="Contactos de emergencia">
                        <span>C. emergencia</span>
                    </a>
                    <a href="#SDVGuardian">
                        <img src="./img/guardian.png" alt="Responsable legal">
                        <span>Responsable legal</span>
                    </a>
                    <a href="#SDVFriends">
                        <img src="./img/group.png" alt="Amigos">
                        <span>Amigos</span>
                    </a>
                </div>`;
}


function buildNewStudent() {
    return `
        <form>
            <div class="flex gap-md">
                <table class="camo">
                    <tr>
                        <td><label for="fecha">Fecha de inscripción:<span class="requiredMark">*</span></label></td>
                        <td><input type="date" id="fecha" name="fecha" required></td>
                    </tr>
                    <tr>
                        <td><label for="nombre">Nombre:<span class="requiredMark">*</span></label></td>
                        <td><input type="text" id="nombre" name="nombre" required></td>
                    </tr>
                    <tr>
                        <td><label for="apellidos">Apellidos:<span class="requiredMark">*</span></label></td>
                        <td><input type="text" id="apellidos" name="apellidos" required></td>
                    </tr>
                    <tr>
                        <td><label>Mayor de edad:<span class="requiredMark">*</span></label></td>
                        <td class="unlarge">
                            <input type="radio" id="adulto_si" name="adulto" value="si" onchange="buildNewGuardian(false)">
                            <label for="adulto_si">Sí</label>
                            <input type="radio" id="adulto_no" name="adulto" value="no" onchange="buildNewGuardian(true)">
                            <label for="adulto_no">No</label>
                        </td>
                    </tr>
                    <tr>
                        <td><label for="dni">DNI:</label></td>
                        <td><input type="text" id="dni" name="dni"></td>
                    </tr>
                    <tr>
                        <td><label for="telefono">Teléfono:</label></td>
                        <td><input type="tel" id="telefono" name="telefono"></td>
                    </tr>
                    <tr>
                        <td><label for="email">Email:</label></td>
                        <td><input type="email" id="email" name="email"></td>
                    </tr>
                </table>
                <table class="camo">
                    <tr>
                        <td><label for="direccion">Dirección:</label></td>
                        <td><input type="text" id="direccion" name="direccion"></td>
                    </tr>
                    <tr>
                        <td><label for="codigo_postal">Código Postal:</label></td>
                        <td><input type="text" id="codigo_postal" name="codigo_postal"></td>
                    </tr>
                    <tr>
                        <td><label for="localidad">Localidad:</label></td>
                        <td><input type="text" id="localidad" name="localidad"></td>
                    </tr>
                    <tr>
                        <td><label for="iban">IBAN:</label></td>
                        <td><input type="text" id="iban" name="iban"></td>
                    </tr>
                    <tr>
                        <td><label for="comentarios_medicos">Comentarios Médicos:</label></td>
                        <td><textarea id="comentarios_medicos" name="comentarios_medicos"></textarea></td>
                    </tr>
                </table>
            </div>
        </form>
    `;
}

function buildNewEmgContacts() {
    return `
        <h3>Contactos de emergencia</h3>
        <div class="flex gap-md">
            <table class="camo">
                <tr>
                    <td><label for="contact1_name">Nombre:</label></td>
                    <td><input type="text" id="contact1_name" name="contact_name" required></td>
                </tr>
                <tr>
                    <td><label for="contact1_phone">Teléfono:</label></td>
                    <td><input type="tel" id="contact1_phone" name="contact_phone" required></td>
                </tr>
                <tr>
                    <td><label for="contact1_relation">Relación:</label></td>
                    <td><input type="text" id="contact1_relation" name="contact_relation" required></td>
                </tr>
            </table>
            <table class="camo">
                <tr>
                    <td><label for="contact2_name">Nombre:</label></td>
                    <td><input type="text" id="contact2_name" name="contact_name" required></td>
                </tr>
                <tr>
                    <td><label for="contact2_phone">Teléfono:</label></td>
                    <td><input type="tel" id="contact2_phone" name="contact_phone" required></td>
                </tr>
                <tr>
                    <td><label for="contact2_relation">Relación:</label></td>
                    <td><input type="text" id="contact2_relation" name="contact_relation" required></td>
                </tr>
            </table>
        </div>
    `;
}

function buildNewGuardian(active) {
    const display = document.getElementById('SDVGuardian');

    if (!active) { display.innerHTML = `
        <h3>Responsable legal</h3>
        <div class="center">
            <button onclick="buildNewGuardian(1)">Incluir responsable legal</button>
        </div>
    `; } else { 
        display.innerHTML = `
        <div class="flex clear-between">
            <h3>Responsable legal</h3>
            <p class="requiredAlert">Los campos marcados con <span class="requiredMark">*</span> son obligatorios</p>
        </div>
        <form>
            <div class="flex gap-md">
                <table class="camo">
                    <tr>
                        <td><label for="nombre">Nombre:<span class="requiredMark">*</span></label></td>
                        <td><input type="text" id="guardian_nombre" name="guardian_nombre" required></td>
                    </tr>
                    <tr>
                        <td><label for="apellidos">Apellidos:<span class="requiredMark">*</span></label></td>
                        <td><input type="text" id="guardian_apellidos" name="guardian_apellidos" required></td>
                    </tr>
                    <tr>
                        <td><label for="dni">DNI:<span class="requiredMark">*</span></label></td>
                        <td><input type="text" id="guardian_dni" name="guardian_dni" required></td>
                    </tr>
                    <tr>
                        <td><label for="telefono">Teléfono:<span class="requiredMark">*</span></label></td>
                        <td><input type="tel" id="guardian_telefono" name="guardian_telefono" required></td>
                    </tr>
                    <tr>
                        <td><label for="email">Email:<span class="requiredMark">*</span></label></td>
                        <td><input type="email" id="guardian_email" name="guardian_email" required></td>
                    </tr>
                </table>
                <table class="camo">
                    <tr>
                        <td><label for="direccion">Dirección:<span class="requiredMark">*</span></label></td>
                        <td><input type="text" id="guardian_direccion" name="guardian_direccion" required></td>
                    </tr>
                    <tr>
                        <td><label for="codigo_postal">Código Postal:<span class="requiredMark">*</span></label></td>
                        <td><input type="text" id="guardian_codigo_postal" name="guardian_codigo_postal" required></td>
                    </tr>
                    <tr>
                        <td><label for="localidad">Localidad:<span class="requiredMark">*</span></label></td>
                        <td><input type="text" id="guardian_localidad" name="guardian_localidad" required></td>
                    </tr>
                    <tr>
                        <td><label for="iban">IBAN:</label></td>
                        <td><input type="text" id="guardian_iban" name="guardian_iban"></td>
                    </tr>
                </table>
            </div>
        </form>
    `;}
}

function buildNewRelations() {
    return 'Temporalmente inhabilitado';
}


function alertNoEmgContacts() {
    const emergenciesSection = document.getElementById('SDVEmergencies');
    const warningDiv = document.createElement('div');
    warningDiv.className = 'inlineFormWarning';
    warningDiv.id="alertNoEmgContacts"
    warningDiv.innerHTML = `
        <p>Ningún contacto de emergencia</p>
        <p>Es recomendable que los alumnos dispongan de al menos un contacto de emergencia</p>
    `;
    emergenciesSection.insertBefore(warningDiv, emergenciesSection.querySelector('div'));
}

function alertNoAddress() {
    const dataSection = document.getElementById('SDVData');
    const warningDiv = document.createElement('div');
    warningDiv.className = 'inlineFormWarning';
    warningDiv.id="alertNoData"
    warningDiv.innerHTML = `
        <p>Ninguna dirección física</p>
        <p>El alumno, o en su defecto su responsable legal, debe tener una dirección física en su ficha.</p>
    `;
    dataSection.insertBefore(warningDiv, dataSection.querySelector('div form'));
}

function alertNoGuardian() {
    const guardianSection = document.getElementById('SDVGuardian');
    const warningDiv = document.createElement('div');
    warningDiv.className = 'inlineFormWarning';
    warningDiv.id="alertNoGuardian"
    warningDiv.innerHTML = `
        <p>Ningún responsable legal</p>
        <p>Los menores de edad deben tener al menos un responsable legal</p>
    `;
    guardianSection.insertBefore(warningDiv, guardianSection.querySelector('div').nextSibling);
}

function removealerts() {
    const alertNoEmgContacts = document.getElementById('alertNoEmgContacts');
    if (alertNoEmgContacts) alertNoEmgContacts.remove();

    const alertNoGuardian = document.getElementById('alertNoGuardian');
    if (alertNoGuardian) alertNoGuardian.remove();

    const alertNoData = document.getElementById('alertNoData');
    if (alertNoData) alertNoData.remove();
}

function cancelStudentInsertion() {
    storage.pendingEdits = false;
    document.getElementById('popUpModal').remove()
}

function validateNewStudent() {
    let emptyInputs = false;
    let missingContacts = false;
    let missingAdress = false;
    let noGuardian = false;

    removealerts();

    // Comprobar que todos los campos requeridos están rellenos
        let inputs = document.querySelectorAll('form input');

        for (let input of inputs) {
            if (input.required === true && input.value === '') emptyInputs = true;
        }

        const adultoSi = document.getElementById('adulto_si');
        const adultoNo = document.getElementById('adulto_no');
        if (!adultoSi.checked && !adultoNo.checked) {
            emptyInputs = true;
        }

        if (emptyInputs == true) {
            _ex.ui.toast.make('Hay campos obligatorios sin rellenar.')
        }

    // If minor, must have guardian
    if (adultoNo.checked) {
        const guardianInputs = document.querySelectorAll('#SDVGuardian input[required]');
        const isGuardianComplete = Array.from(guardianInputs).every(input => input.value.trim() !== '');

        if (!isGuardianComplete) {
            alertNoGuardian();
            noGuardian = true;
        }
    }

    // Ensure at least one emergency contact is available and complete
        const emergencyContacts = [
            {
                name: document.getElementById('contact1_name').value.trim(),
                phone: document.getElementById('contact1_phone').value.trim(),
                relation: document.getElementById('contact1_relation').value.trim()
            },
            {
                name: document.getElementById('contact2_name').value.trim(),
                phone: document.getElementById('contact2_phone').value.trim(),
                relation: document.getElementById('contact2_relation').value.trim()
            }
        ];

        const hasValidEmergencyContact = emergencyContacts.some(contact => 
            contact.name && contact.phone && contact.relation
        );

        if (!hasValidEmergencyContact) {
            alertNoEmgContacts();
            missingContacts = true;
        }

    // Ensure at least one of cp, localidad, or direccion is filled
        const studentFields = ['codigo_postal', 'localidad', 'direccion'].map(id => document.getElementById(id).value.trim());
        const guardianFields = ['guardian_codigo_postal', 'guardian_localidad', 'guardian_direccion'].map(id => document.getElementById(id)?.value.trim() || '');
        const isAddressValid = studentFields.some(value => value) || guardianFields.some(value => value);

        if (!isAddressValid) {
            alertNoAddress();
            missingAdress = true;
        }

    return [emptyInputs, missingContacts, noGuardian, missingAdress];
}

function validateDuplicateStudents() {
    const nombre = document.getElementById('nombre')?.value.trim() || '';
    const apellidos = document.getElementById('apellidos')?.value.trim() || '';
    const dni = document.getElementById('dni')?.value.trim() || '';

    if (!nombre && !apellidos && !dni) return false;

    let duplicate = false;
    const xhr = new XMLHttpRequest();
    xhr.open('POST', './resources/alumnos/getDuplicateStudents.php', false); // synchronous
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({ nombre, apellidos, dni }));

    if (xhr.status === 200) {
        try {
            const result = JSON.parse(xhr.responseText);
            if (result.duplicate) {
                duplicate = true;
            }
        } catch (e) {
            _ex.ui.toast.make(e);
        }
    } else {
        _ex.ui.toast.make('No se pudo comprobar duplicados.');
    }
    return duplicate;
}

function submitNewStudent() {
    // Check for duplicates before proceeding
    let duplication = validateDuplicateStudents();
    if (duplication) {
        _ex.ui.dialog.makeNotice('Posible duplicado', 'Hemos encontrado un alumno que ya existe con estos nombre y apellidos o con este DNI. Asegúrate de no estar incluyendo un alumno duplicado de forma accidental antes de continuar.')
    }

    let checks = validateNewStudent()
    if (checks.some(check => check)) {
        if (storage.warnings) {
            _ex.ui.dialog.make('Alumno con posibles errores', 'El alumno que intentas añadir tiene errores en su ficha. Pulsa vovler para volver a revisar la ficha o pulsa continuar de todas formas si quieres añadir el alumno a pesar de los errores.', saveStudentToDatabase, 'Continuar de todas formas', true, 'Volver');
        } else {
            storage.warnings = true;
        }
        return;
    }

    storage.warnings = false;
    saveStudentToDatabase()
}

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
            document.getElementById('popUpModal').remove();
            location.reload();
        } else {
            _ex.ui.toast.make('Error al añadir el alumno: ' + (result.message || ''));
        }
    })
    .catch(() => {
        _ex.ui.toast.make('Error al procesar la solicitud.');
    });
}