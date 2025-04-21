const storage = {
    activeStudent: 0,
    pendingEdits: false,
    studentData: null,
}

function removeDetailsModal() {
    if (storage.pendingEdits) {
        _ex.ui.toast.make('Guarda o descarta los cambios de las notas rápidas antes de salir.')
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
        
        fetch('./updateQuickNotes.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify({ notes, id }),
        })
        // .then(response => {
        //     if (!response.ok) throw new Error('Network response was not ok');
        //     return response.json();
        // })
        // .then(data => { console.log('Success:', data); })
        // .catch(error => { console.error('Error:', error); });

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
                    <form>
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
                                <td><textarea id="comentarios_medicos" name="comentarios_medicos">${storage.studentData.alumno.comentariosMedicos}</textarea></td>
                            </tr>
                            <tr>
                                <td><label for="notas_rapidas">Notas Rápidas:</label></td>
                                <td><textarea id="notas_rapidas" name="notas_rapidas">${storage.studentData.alumno.notasRapidas}</textarea></td>
                            </tr>
                        </table>
                        <button>Cancelar</button>
                        <button type="submit">Enviar</button>
                    </form>
                </div>
            </div>
            `;
    }
}