function getGroupDetails(id) {
    fetch(`./resources/grupos/getGroupDetails.php?id=${id}`)
        .then(response => {
            if (!response.ok) throw new Error("No se pudieron cargar los detalles del grupo");
            return response.json();
        })
        .then(data => {
            if (data.error) {
                alert(data.error);
                return;
            }
            displayGroupDetails(data.grupo, data.alumnos, data.profesor);
        })
        .catch(error => {
            console.error("Error fetching group details:", error);
        });
}

function displayGroupDetails(group, alumnos = [], profesor = null) {
    storage.group = group;
    storage.alumnos = alumnos;
    storage.profesor = profesor;

    let div = document.createElement('div');
    div.className = 'modal';
    div.id = 'popUpModal';

    div.innerHTML = `
        <div>
            <div class="header">
                <div>
                    <p>Grupo ${group.id_grupo} - Creado el ${group.creacion || ''}</p>
                    <h2>${group.nombre}</h2>
                    <div class="spaced-items-sm">
                        ${buildGroupChips(group)}
                    </div>
                </div>
                <img onclick="removeDetailsModal()" class="iconButton" src="./img/close.png" alt="Cerrar">
            </div>

            <div class="body">
                ${doTabBar_groupDetails()}
                <div id="modalBodyView">
                    <div class="scrollspySection" id="GDVData">
                        <h3>Datos del grupo</h3>
                        ${buildGroupData(group, profesor)}
                    </div>
                    <div class="scrollspySection" id="GDVAlumnos">
                        ${buildGroupStudents(alumnos, group)}
                    </div>
                </div>
            </div>
        </div>`;

    document.querySelector('body').appendChild(div);
    startScrollSpy();
}

// Función que crea las "chips" de información del grupo
function buildGroupChips(group) {
    let chips = '';
    chips += group.esActivo ? '<span class="chip">Activo</span>' : '<span class="chip warn">Inactivo</span>';
    chips += group.esIntensivo ? '<span class="chip warn">Intensivo</span>' : '';
    chips += group.modalidad ? `<span class="chip">${group.modalidad}</span>` : '';
    return chips;
}

// Función para crear la barra de navegación del modal
function doTabBar_groupDetails() {
    return `<div class="tabs-scrollspy">
        <a href="#GDVData">
            <img src="./img/contactInfo.png" alt="Información y datos del grupo">
            <span>Datos</span>
        </a>
        <a href="#GDVAlumnos">
            <img src="./img/group.png" alt="Alumnos">
            <span>Alumnos</span>
        </a>
    </div>`;
}

// Función para generar los detalles del grupo en una tabla
function buildGroupData(group, profesor) {
    console.log(group)
    console.log(profesor)
    return `
        <table class="camo">
            <tr>
                <td>Nombre:</td>
                <td>${group.nombre}</td>
            </tr>
            <tr>
                <td>Profesor:</td>
                <td>${profesor.nombre}</td>
            </tr>
            <tr>
                <td>Modalidad:</td>
                <td>${group.modalidad || ''}</td>
            </tr>
            <tr>
                <td>Intensivo:</td>
                <td>${group.esIntensivo ? 'Sí' : 'No'}</td>
            </tr>
            <tr>
                <td>Activo:</td>
                <td>${group.esActivo ? 'Sí' : 'No'}</td>
            </tr>
            <tr>
                <td>Horario:</td>
                <td>
                    ${_ex.schedule.formatArray(_ex.schedule.decode(group.horario))}
                </td>
            </tr>
        </table>
    `;
}

// Función para eliminar el modal cuando se cierra
function removeDetailsModal() {
    const modal = document.getElementById('popUpModal');
    if (modal) modal.remove();
}

function buildGroupStudents(alumnos, group) {
    // Only show alumnos currently enrolled (fechaFin is null or today/future)
    const filteredAlumnos = alumnos.filter(a => {
        if (!a.fechaFin) return true;
        const fechaFinDate = new Date(a.fechaFin);
        const today = new Date();
        today.setHours(0,0,0,0);
        fechaFinDate.setHours(0,0,0,0);
        return fechaFinDate >= today;
    });
    
    if(filteredAlumnos.length == 0) return `<h3>Alumnos inscritos</h3>
    <div class="emptyState-icon">
        <img src="./img/es-group.png">
        <div>
            <p>No hay alumnos inscitos</p>
            <button onclick="addStudentToGroup()">Añadir alumno</button>
        </div>
    </div>`;

    else return `
    <div class="flex clear-between">
        <h3>Alumnos inscritos</h3>
        <button class="outlined" onclick="addStudentToGroup()">Añadir alumno</button>
    </div>
    <table class="styledData">
        <thead>
            <tr>
                <td>Alumno</td>
                <td>Inscripción</td>
                <td style="text-align: right;">Estado</td>
            </tr>
        </thead>
        <tbody>
            ${filteredAlumnos.map(a => `
                <tr>
                    <td>${a.apellidos}, ${a.nombre}</td>
                    <td>${a.fechaInicio}</td>
                    <td style="text-align: right;"><button class="mini warn inline" onclick="doubleCheckStudentDeletion(${a.id_alumno}, ${group.id_grupo})">Eliminar del grupo</button></td>
                </tr>
            `).join('')}
        </tbody>
    </table>`
}

function doubleCheckStudentDeletion(student, group){
    let action = function() { removeStudentFromGroup(student, group)}
    _ex.ui.dialog.make('Eliminar del grupo', '¿Seguro desea desapuntar a este alumno de este grupo?', action, 'Eliminar', true )
}

function removeStudentFromGroup(student, group) {
    fetch('./resources/grupos/removeStudentFromGroup.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_alumno: student, id_grupo: group })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            removeDetailsModal();
            getGroupDetails(group);
            _ex.ui.toast.make('Alumno eliminado correctamente.', 'Aceptar', false);
        } else {
            alert(data.message || "No se pudo eliminar el alumno del grupo.");
        }
    })
    .catch(err => {
        alert("Error al eliminar alumno del grupo.");
        console.error(err);
    });
}

function addStudentToGroup() {
    const display = document.querySelector('#popUpModal div');
    display.innerHTML = `<div class="header">
            <div>
                <p>Añadir alumno al grupo:</p>
                <h2>${storage.group.nombre}</h2>
                <div class="spaced-items-sm">${buildGroupChips(storage.group)}</div>
            </div>
            <img onclick="removeDetailsModal()" class="iconButton" src="./img/close.png" alt="Cerrar">
        </div>
        
        <div class="body">
            <div class="editView">
                <h3>Modificar datos personales:</h3>
                <form id="editStudentDetails">
                    <table class="camo inputMode">
                        <tr>
                            <td><label for="add_nombre">Alumno:</label></td>
                            <td><input type="text" id="add_nombre" name="add_nombre" oninput="studentTypeAhead()"><div id="typeAhead"></div></td>
                        </tr>
                        <tr>
                            <td><label for="add_fecha">Fecha de inscripcción</label></td>
                            <td><input type="date" id="add_fecha" name="add_fecha"></td>
                        </tr>
                    </table>
                    <input style="display: none;" name="add_id_alumno" type="number" id="add_id_alumno">
                    <div class="editFooter">
                        <button type="button" class="warn" onclick="removeDetailsModal()">Descartar cambios</button>
                        <button type="button" onclick="processAddStudentToGroup()">Guardar cambios</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    document.getElementById("add_fecha").value = new Date().toISOString().split("T")[0]
}


function studentTypeAhead() {
    const query = document.getElementById('add_nombre').value;
    const suggestionBox = document.getElementById("typeAhead");

    if(query.length >= 3) {
    fetch("./resources/studentTypeAhead.php?q=" + encodeURIComponent(query))
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
                        document.getElementById("add_nombre").value = item.nombre_completo;
                        document.getElementById("add_id_alumno").value = item.id_alumno;
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


function processAddStudentToGroup() {
    const id_alumno = document.getElementById('add_id_alumno').value;
    const fechaInicio = document.getElementById('add_fecha').value;
    const id_grupo = storage.group.id_grupo;

    if (!id_alumno || !fechaInicio) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    fetch('./resources/grupos/addStudentToGroup.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id_alumno: id_alumno,
            id_grupo: id_grupo,
            fechaInicio: fechaInicio
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            removeDetailsModal();
            getGroupDetails(id_grupo);
            _ex.ui.toast.make('Alumno añadido correctamente.', 'Aceptar', false);
        } else {
            alert(data.message || "No se pudo añadir el alumno al grupo.");
        }
    })
    .catch(err => {
        alert("Error al añadir alumno al grupo.");
        console.error(err);
    });
}