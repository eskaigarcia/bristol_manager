const storage = {
    activeStudent: 0,
    pendingEdits: false,
    studentData: null,
}

function removeDetailsModal() {
    if (storage.pendingEdits) {
        _ex.ui.toast.make('Tienes cambios sin guardar.')
    } else {
        document.getElementById('studentDataModal').remove()
    }
}

function toggleIBAN() {
    const field = document.getElementById('IBANField');
    const button = document.getElementById('IBANButton');

    if (field.type == 'text') {
        field.type = 'password';
        button.innerText = 'Mostrar';
    } else { 
        field.type = 'text'
        button.innerText = 'Ocultar';
    } 
}

function toggleIBAN2() {
    const field = document.getElementById('IBANField2');
    const button = document.getElementById('IBANButton2');

    if (field.type == 'text') {
        field.type = 'password';
        button.innerText = 'Mostrar';
    } else { 
        field.type = 'text'
        button.innerText = 'Ocultar';
    } 
}

const quickNotes = {
    // BUG: NEEDS TO BE FIXED
    discard() {
        storage.pendingEdits = false;
        document.querySelector('#quickNotes textarea').value = storage.studentData.alumno.notasRapidas;
        document.querySelector('#quickNotes div').classList.add('hidden');
    },

    save() {
        // CURRENTLY BROKEN
        let notes = document.querySelector('#quickNotes textarea').value;
        let id = storage.activeStudent;
        
        fetch('./resources/alumnos/updateQuickNotes.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify({ notes, id }),
        })
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => { console.log('Success:', data); })
        .catch(error => { console.error('Error:', error); });

        document.querySelector('#quickNotes div').classList.add('hidden');
        storage.pendingEdits = false;
    },

    trigger() {
        storage.pendingEdits = true;
        document.querySelector('#quickNotes div').classList.remove('hidden');
    }
} 


const triggerEdit = {
    mainDetails() {
        storage.pendingEdits = true;
        const display = document.querySelector('#studentDataModal div');
        display.innerHTML = `<div class="header">
                <div>
                    <p>Editando alumno:</p>
                    <h2>${storage.studentData.alumno.apellidos}, ${storage.studentData.alumno.nombre}</h2>
                    <div class="spaced-items-sm">${buildChips(storage.studentData.alumno)}</div>
                </div>
                <img onclick="removeDetailsModal()" class="iconButton" src="./img/close.png" alt="Cerrar">
            </div>
            
            <div class="body">
                <div class="editView">
                    <h3>Modificar datos personales:</h3>
                    <form id="editStudentDetails">
                        <table class="camo">
                            <tr>
                                <td><label for="nombre">Nombre:</label></td>
                                <td><input type="text" id="nombre" name="nombre" value="${storage.studentData.alumno.nombre}"></td>
                            </tr>
                            <tr>
                                <td><label for="apellidos">Apellidos:</label></td>
                                <td><input type="text" id="apellidos" name="apellidos" value="${storage.studentData.alumno.apellidos}"></td>
                            </tr>
                            <tr>
                                <td><label>Mayor de edad:</label></td>
                                <td class="unlarge">
                                    <input type="radio" id="adulto_si" name="adulto" value="si" ${(storage.studentData.alumno.esAdulto == 1) ? 'checked' : ''}>
                                    <label for="adulto_si">Sí</label>
                                    <input type="radio" id="adulto_no" name="adulto" value="no" ${(storage.studentData.alumno.esAdulto == 0) ? 'checked' : ''}>
                                    <label for="adulto_no">No</label>
                                </td>
                            </tr>
                            <tr>
                                <td><label>Amonestado:</label></td>
                                <td class="unlarge">
                                    <input type="radio" id="amonesta_si" name="amonesta" value="si" ${(storage.studentData.alumno.esAmonestado == 1) ? 'checked' : ''}>
                                    <label for="amonesta_si">Sí</label>
                                    <input type="radio" id="amonesta_no" name="amonesta" value="no" ${(storage.studentData.alumno.esAmonestado == 0) ? 'checked' : ''}>
                                    <label for="amonesta_no">No</label>
                                </td>
                            </tr>
                            <tr>
                                <td><label for="dni">DNI:</label></td>
                                <td><input type="text" id="dni" name="dni" value="${storage.studentData.alumno.dni}"></td>
                            </tr>
                            <tr>
                                <td><label for="telefono">Teléfono:</label></td>
                                <td><input type="tel" id="telefono" name="telefono" value="${storage.studentData.alumno.telefono}"></td>
                            </tr>
                            <tr>
                                <td><label for="email">Email:</label></td>
                                <td><input type="email" id="email" name="email" value="${storage.studentData.alumno.email}"></td>
                            </tr>
                            <tr>
                                <td><label for="direccion">Dirección:</label></td>
                                <td><input type="text" id="direccion" name="direccion" value="${storage.studentData.alumno.direccion}"></td>
                            </tr>
                            <tr>
                                <td><label for="codigo_postal">Código Postal:</label></td>
                                <td><input type="text" id="codigo_postal" name="codigo_postal" value="${storage.studentData.alumno.cp}"></td>
                            </tr>
                            <tr>
                                <td><label for="localidad">Localidad:</label></td>
                                <td><input type="text" id="localidad" name="localidad" value="${storage.studentData.alumno.localidad}"></td>
                            </tr>
                            <tr>
                                <td><label for="iban">IBAN:</label></td>
                                <td><input type="text" id="iban" name="iban" value="${(storage.studentData.alumno.iban != null) ? storage.studentData.alumno.iban : ''}"></td>
                            </tr>
                            <tr>
                                <td><label for="comentarios_medicos">Comentarios Médicos:</label></td>
                                <td><textarea id="comentarios_medicos" name="comentarios_medicos">${(storage.studentData.alumno.comentariosMedicos == null) ? '' : storage.studentData.alumno.comentariosMedicos}</textarea></td>
                            </tr>
                            <tr>
                                <td><label for="notas_rapidas">Notas Rápidas:</label></td>
                                <td><textarea id="notas_rapidas" name="notas_rapidas">${(storage.studentData.alumno.notasRapidas == null) ? '' : storage.studentData.alumno.notasRapidas}</textarea></td>
                            </tr>
                        </table>
                        <div class="editFooter">
                            <button type="button" class="warn" onclick="discardEdits.any()">Descartar cambios</button>
                            <button type="button" onclick="saveEdits.mainDetails()">Guardar cambios</button>
                        </div>
                    </form>
                </div>
            </div>
            `;
    },

    emergencyContact(id_contact = null, name = '', tel = '', rel = '') {
        storage.pendingEdits = true;
        const display = document.querySelector('#studentDataModal div');
        display.innerHTML = `<div class="header">
                <div>
                    <p>Editando contacto de emergencia de:</p>
                    <h2>${storage.studentData.alumno.apellidos}, ${storage.studentData.alumno.nombre}</h2>
                    <div class="spaced-items-sm">${buildChips(storage.studentData.alumno)}</div>
                </div>
                <img onclick="removeDetailsModal()" class="iconButton" src="./img/close.png" alt="Cerrar">
            </div>`
            
            if (id_contact == null) {
                display.innerHTML += `<div class="body">
                    <div class="editView">
                        <h3>Nuevo contacto de emergencia:</h3>
                        <form id="editEmergencyContact">
                            <table class="camo">
                                <tr>
                                    <td><label for="contact_name">Nombre:</label></td>
                                    <td><input type="text" id="contact_name" name="contact_name" required></td>
                                </tr>
                                <tr>
                                    <td><label for="contact_phone">Teléfono:</label></td>
                                    <td><input type="tel" id="contact_phone" name="contact_phone" required></td>
                                </tr>
                                <tr>
                                    <td><label for="contact_relation">Relación:</label></td>
                                    <td><input type="text" id="contact_relation" name="contact_relation" required></td>
                                </tr>
                            </table>
                            <div class="editFooter">
                                <button type="button" class="warn" onclick="discardEdits.any()">Descartar cambios</button>
                                <button type="button" onclick="saveEdits.emergencyContact()">Guardar cambios</button>
                            </div>
                        </form>
                    </div>
                </div>`;
        } else {
            display.innerHTML += `<div class="body">
                    <div class="editView">
                        <h3>Nuevo contacto de emergencia:</h3>
                        <form id="editEmergencyContact">
                            <table class="camo">
                                <tr>
                                    <td><label for="contact_name">Nombre:</label></td>
                                    <td><input type="text" id="contact_name" name="contact_name" value="${name}" required></td>
                                </tr>
                                <tr>
                                    <td><label for="contact_phone">Teléfono:</label></td>
                                    <td><input type="tel" id="contact_phone" name="contact_phone" value="${tel}" required></td>
                                </tr>
                                <tr>
                                    <td><label for="contact_relation">Relación:</label></td>
                                    <td><input type="text" id="contact_relation" name="contact_relation" value="${rel}" required></td>
                                </tr>
                            </table>
                            <div class="editFooter">
                                <button type="button" class="warn" onclick="discardEdits.any()">Descartar cambios</button>
                                <button type="button" onclick="saveEdits.emergencyContact(${id_contact})">Guardar cambios</button>
                            </div>
                        </form>
                    </div>
                </div>`;
        }
            
    },

    emergencyContactDelete(id_contact) {
        const action = () => saveEdits.emergencyContactDelete(id_contact);
        _ex.ui.dialog.make('Eliminar contacto', '¿Está seguro de que quiere eliminar el contacto de emergencia de este alumno? Esta acción no se puede deshacer.', action, 'Eliminar', true);
    },

    guardian() {
        storage.pendingEdits = true;
        const display = document.querySelector('#studentDataModal div');
        display.innerHTML = `<div class="header">
                <div>
                    <p>Editando responsable legal del alumno:</p>
                    <h2>${storage.studentData.alumno.apellidos}, ${storage.studentData.alumno.nombre}</h2>
                    <div class="spaced-items-sm">${buildChips(storage.studentData.alumno)}</div>
                </div>
                <img onclick="removeDetailsModal()" class="iconButton" src="./img/close.png" alt="Cerrar">
            </div>
            
            <div class="body">
                <div class="editView">
                    <h3>Modificar datos del responsable legal:</h3>
                    <form id="editGuardianDetails">
                        <table class="camo">
                            <tr>
                                <td><label for="nombre">Nombre:</label></td>
                                <td><input type="text" id="nombre" name="nombre" value="${storage.studentData.guardian.nombre}"></td>
                            </tr>
                            <tr>
                                <td><label for="apellidos">Apellidos:</label></td>
                                <td><input type="text" id="apellidos" name="apellidos" value="${storage.studentData.guardian.apellidos}"></td>
                            </tr>
                            <tr>
                                <td><label for="dni">DNI:</label></td>
                                <td><input type="text" id="dni" name="dni" value="${storage.studentData.guardian.dni}"></td>
                            </tr>
                            <tr>
                                <td><label for="telefono">Teléfono:</label></td>
                                <td><input type="tel" id="telefono" name="telefono" value="${storage.studentData.guardian.telefono}"></td>
                            </tr>
                            <tr>
                                <td><label for="email">Email:</label></td>
                                <td><input type="email" id="email" name="email" value="${storage.studentData.guardian.email}"></td>
                            </tr>
                            <tr>
                                <td><label for="direccion">Dirección:</label></td>
                                <td><input type="text" id="direccion" name="direccion" value="${storage.studentData.guardian.direccion}"></td>
                            </tr>
                            <tr>
                                <td><label for="codigo_postal">Código Postal:</label></td>
                                <td><input type="text" id="codigo_postal" name="codigo_postal" value="${storage.studentData.guardian.cp}"></td>
                            </tr>
                            <tr>
                                <td><label for="localidad">Localidad:</label></td>
                                <td><input type="text" id="localidad" name="localidad" value="${storage.studentData.guardian.localidad}"></td>
                            </tr>
                            <tr>
                                <td><label for="iban">IBAN:</label></td>
                                <td><input type="text" id="iban" name="iban" value="${(storage.studentData.guardian.iban != null) ? storage.studentData.guardian.iban : ''}"></td>
                            </tr>
                        </table>
                        <div class="editFooter">
                            <button type="button" class="warn" onclick="triggerEdit.guardianDelete(${storage.activeStudent})">Eliminar responsable legal</button>
                            <button type="button" onclick="discardEdits.any()">Descartar cambios</button>
                            <button type="button" onclick="saveEdits.guardian()">Guardar cambios</button>
                        </div>
                    </form>
                </div>
            </div>
            `;
    },

    guardianDelete(id_alumno) {
        const action = () => saveEdits.guardianDelete(id_alumno);
        _ex.ui.dialog.make('Eliminar responsable legal', '¿Está seguro de que quiere eliminar el responsable legal de este alumno? Los menores deben tener un responsable legal. Esta acción no se puede deshacer.', action, 'Eliminar', true);
    },

}

const saveEdits = {
    mainDetails() {
        storage.pendingEdits = false;
        const formData = new FormData(document.getElementById('editStudentDetails'));
        const data = Object.fromEntries(formData.entries());
        data.id = storage.activeStudent; // Add the student ID to the data object

        fetch('./resources/alumnos/updateStudentDetails.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update student details.');
            }
            return response.json();
        })
        .then(result => {
            if (result.success) {
                _ex.ui.toast.make('Detalles del alumno actualizados correctamente.', 'Aceptar', false);
                removeDetailsModal(); 
                getStudentDetails(storage.activeStudent);
            } else {
                _ex.ui.toast.make('Error al actualizar los detalles del alumno.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            _ex.ui.toast.make('Error al procesar la solicitud.');
        });
    },

    emergencyContact(id_contact) {
        storage.pendingEdits = false;
        const formData = new FormData(document.getElementById('editEmergencyContact'));
        const data = Object.fromEntries(formData.entries());
        data.id = storage.activeStudent; // Add the student ID to the data object
        data.contact = id_contact;

        console.log(id_contact)

        let direction = (id_contact == undefined) ? './resources/alumnos/newEmgContact.php' : './resources/alumnos/updateEmgContact.php';
        
        console.log(direction);
        
        fetch(direction, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update student details.');
            }
            return response.json();
        })
        .then(result => {
            console.log('Response from server:', result); // Log the response for debugging
            if (result.success) {
                _ex.ui.toast.make('Contacto actulizado correctamente.', 'Aceptar', false);
                removeDetailsModal(); 
                getStudentDetails(storage.activeStudent);
            } else {
                _ex.ui.toast.make('Error al actualizar los detalles del contacto.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            _ex.ui.toast.make('Error al procesar la solicitud.');
        });
    },

    emergencyContactDelete(id_contact) {
        storage.pendingEdits = false;

        // Debug: log the payload being sent
        console.log('Deleting emergency contact, sending:', { id_contact });

        fetch('./resources/alumnos/deleteEmgContact.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_contact }),
        })
        .then(response => {
            if (!response.ok) {
            throw new Error('Failed to delete emergency contact.');
            }
            return response.json();
        })
        .then(result => {
            if (result.success) {
                _ex.ui.toast.make('Contacto de emergencia eliminado correctamente.', 'Aceptar', false);
                removeDetailsModal(); 
                getStudentDetails(storage.activeStudent);
            } else {
                _ex.ui.toast.make('Error al eliminar el contacto de emergencia.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            _ex.ui.toast.make('Error al procesar la solicitud.');
        });
    },

    guardian() {
        storage.pendingEdits = false;
        const formData = new FormData(document.getElementById('editGuardianDetails'));
        const data = Object.fromEntries(formData.entries());
        data.id = storage.activeStudent; // Add the student ID to the data object

        fetch('./resources/alumnos/updateGuardianDetails.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update student details.');
            }
            return response.json();
        })
        .then(result => {
            if (result.success) {
                _ex.ui.toast.make('Detalles del alumno actualizados correctamente.', 'Aceptar', false);
                removeDetailsModal(); 
                getStudentDetails(storage.activeStudent);
            } else {
                _ex.ui.toast.make('Error al actualizar los detalles del alumno.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            _ex.ui.toast.make('Error al procesar la solicitud.');
        });
    },

    guardianDelete(id_alumno){
        storage.pendingEdits = false;

        // Debug: log the payload being sent
        console.log('Deleting emergency contact, sending:', { id_alumno });

        fetch('./resources/alumnos/deleteGuardian.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_alumno }),
        })
        .then(response => {
            if (!response.ok) {
            throw new Error('Failed to delete guardian.');
            }
            return response.json();
        })
        .then(result => {
            if (result.success) {
                _ex.ui.toast.make('Responsable legal eliminado correctamente.', 'Aceptar', false);
                removeDetailsModal(); 
                getStudentDetails(storage.activeStudent);
            } else {
                _ex.ui.toast.make('Error al eliminar el responsable legal.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            _ex.ui.toast.make('Error al procesar la solicitud.');
        });
    }
}

const discardEdits = {
    any() {
        storage.pendingEdits = false;
        _ex.ui.toast.make('Cambios descartados', 'Ok', false)
        removeDetailsModal(); 
        getStudentDetails(storage.activeStudent);
    }
}