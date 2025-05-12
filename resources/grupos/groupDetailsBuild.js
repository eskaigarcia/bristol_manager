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
                        ${buildGroupData(group)}
                    </div>
                    <div class="scrollspySection" id="GDVAlumnos">
                        ${
                            alumnos.length > 0
                            ? `<table class="styledData" style="width:100%;margin-top:1rem;">
                                    <thead>
                                        <tr>
                                            <td>Nombre</td>
                                            <td>Apellidos</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${alumnos.map(a => `
                                            <tr>
                                                <td>${a.nombre}</td>
                                                <td>${a.apellidos || ''}</td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>`
                            : '<div style="margin-top:1rem;color:#888;">No hay alumnos en este grupo</div>'
                        }
                    </div>
                </div>
            </div>
        </div>`;

    document.querySelector('body').appendChild(div);
}

// Función que crea las "chips" de información del grupo
function buildGroupChips(group) {
    let chips = '';
    chips += group.esActivo ? '<span class="chip">Activo</span>' : '<span class="chip warn">Inactivo</span>';
    chips += group.esIntensivo ? '<span class="chip warn">Intensivo</span>' : '';
    chips += group.modalidad ? `<span class="chip">${group.modalidad}</span>` : '';
    chips += group.horario ? `<span class="chip">${group.horario}</span>` : '';
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
function buildGroupData(group) {
    return `
        <table class="camo">
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
                <td>${group.horario || ''}</td>
            </tr>
        </table>
    `;
}

// Función para eliminar el modal cuando se cierra
function removeDetailsModal() {
    const modal = document.getElementById('popUpModal');
    if (modal) modal.remove();
}

function startScrollSpy() {
    // Vacío o tu lógica de pestañas si la necesitas
}