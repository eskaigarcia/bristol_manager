function createStudent() {
    // CONSTRUCCIÓN FINAL DE LA INTERFAZ
    let div = document.createElement('div');
    div.className = 'modal studentData';
    div.id = 'studentDataModal';

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
                <div id="studentDataView">
                    <div class="scrollspySection" id="SDVData">
                        <h3>Datos personales</h3>
                        ${buildNewStudent()}
                    </div>
                    <div class="scrollspySection" id="SDVEmergencies">
                        <h3>Contactos de emergencia</h3>
                        ${buildNewEmgContacts()}
                    </div>
                    <div class="scrollspySection" id="SDVGuardian">
                        <h3>Responsable legal</h3>
                        ${buildNewGuardian()}
                    </div>
                    <div class="scrollspySection" id="SDVFriends">
                        <h3>Amigos y familiares</h3>
                        ${buildNewRelations()}
                    </div>
                </div>
            </div>
        </div>`

    document.querySelector('body').appendChild(div);

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
            <table class="camo">
                <tr>
                    <td><label for="nombre">Nombre:</label></td>
                    <td><input type="text" id="nombre" name="nombre"></td>
                </tr>
                <tr>
                    <td><label for="apellidos">Apellidos:</label></td>
                    <td><input type="text" id="apellidos" name="apellidos"></td>
                </tr>
                <tr>
                    <td><label>Mayor de edad:</label></td>
                    <td class="unlarge">
                        <input type="radio" id="adulto_si" name="adulto" value="si">
                        <label for="adulto_si">Sí</label>
                        <input type="radio" id="adulto_no" name="adulto" value="no">
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
        </form>
    `;
}

function buildNewEmgContacts() {
    return 0;
}

function buildNewGuardian() {
    return 0;
}

function buildNewRelations() {
    return 0;
}