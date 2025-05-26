function getTeacherStats(id) {
    fetch(`./resources/payroll/getTeacherStats.php?id=${id}`)
        .then(response => {
            if (!response.ok) throw new Error("No se pudieron cargar los detalles del grupo");
            return response.json();
        })
        .then(data => {
            if (data.error) {
                alert(data.error);
                return;
            }
            displayTeacherStats(data);
        })
}

function displayTeacherStats(data) { 
    console.log(data)
    let div = document.createElement('div');
    div.className = 'modal';
    div.id = 'popUpModal';

    div.innerHTML = `
        <div>
            <div class="header">
                <div>
                    <p>Profesor ${data.profesor.id_profesor}</p>
                    <h2>${data.profesor.nombre}</h2>
                    <div class="spaced-items-sm">
                        ${buildTeacherChips(data)}
                    </div>
                </div>
                <img onclick="removeDetailsModal()" class="iconButton" src="./img/close.png" alt="Cerrar">
            </div>

            <div class="body">
                ${doTabBar_teacherStats()}
                <div id="modalBodyView">
                    <div class="scrollspySection" id="TDVGroups">
                        <h3>Grupos recurrentes</h3>
                        ${buildTeacherStats_Groups()}
                    </div>
                    <div class="scrollspySection" id="TDVIntensivos">
                        <h3>Cursos intensivos</h3>
                    </div>
                    <div class="scrollspySection" id="TDVIndividuals">
                        <h3>Clases individuales</h3>
                    </div>
                </div>
            </div>
        </div>`;

    document.querySelector('body').appendChild(div);
    startScrollSpy();
}

// Función que crea las "chips" de información del grupo
function buildTeacherChips(data) {
    if (data.grupos.length > 0 && data.particulares.length > 0) return '<span class="chip">Profesor activo</span>'
    else return '<span class="chip warn">Profesor inactivo</span>'
}

// Función para crear la barra de navegación del modal
function doTabBar_teacherStats() {
    return `<div class="tabs-scrollspy">
        <a href="#TDVGroups">
            <img src="./img/group.png" alt="Grupos">
            <span>Grupos recurrentes</span>
        </a>
        <a href="#TDVIntensives">
            <img src="./img/grupoIntensivo.png" alt="Intensivos">
            <span>Cursos intensivos</span>
        </a>
        <a href="#TDVIndividuals">
            <img src="./img/contactInfo.png" alt="Clases individuales">
            <span>Clases individuales</span>
        </a>
    </div>`;
}

// Función para eliminar el modal cuando se cierra
function removeDetailsModal() {
    const modal = document.getElementById('popUpModal');
    if (modal) modal.remove();
}

// Función para generar los detalles del grupo en una tabla
function buildTeacherStats_Groups(group) {
        <table class="styledData">
            <tr>
                <td>Nombre:</td>
                <td>${group.nombre}</td>
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

