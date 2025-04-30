function getGroupDetails(id) {
    fetch(`./resources/grupos/getGroupDetails.php?id=${id}`)
        .then(response => {
            if (!response.ok) throw new Error("Grupo no encontrado")
            return response.json();
        })
        .then(data => displayGroupDetails(data))
        // .catch(error => console.error("Error:", error.message));
}

function displayGroupDetails(group) {
    console.log(group); // debugging the object

    // CONSTRUCCIÓN FINAL DE LA INTERFAZ
    let div = document.createElement('div');
    div.className = 'modal groupData';
    div.id = 'groupDataModal';

    div.innerHTML = `
        <div>
            <div class="header">
                <div>
                    <p>Grupo ${group.id_grupo} - Creado el ${group.fechaCreacion || ''}</p>
                    <h2>${group.nombre}</h2>
                    <div class="spaced-items-sm">
                        ${buildGroupChips(group)}
                    </div>
                </div>
                <img onclick="removeDetailsModal()" class="iconButton" src="./img/close.png" alt="Cerrar">
            </div>

            <div class="body">
                ${doTabBar_groupDetails()}
                <div id="groupDataView">
                    <div class="scrollspySection" id="GDVData">
                        ${buildGroupData(group)}
                    </div>
                </div>
            </div>
        </div>`;

    document.querySelector('body').appendChild(div);

    startScrollSpy();
}

// Chips para grupo
function buildGroupChips(group) {
    let chips = '';
    chips += group.activo ? '<span class="chip">Activo</span>' : '<span class="chip warn">Inactivo</span>';
    chips += group.intensivo ? '<span class="chip warn">Intensivo</span>' : '';
    chips += group.modalidad ? `<span class="chip">${group.modalidad}</span>` : '';
    chips += group.horario ? `<span class="chip">${group.horario}</span>` : '';
    return chips;
}

// Tab bar para grupos
function doTabBar_groupDetails() {
    return `<div class="tabs-scrollspy">
        <a href="#GDVData">
            <img src="./img/contactInfo.png" alt="Información y datos del grupo">
            <span>Datos</span>
        </a>
    </div>`;
}

// Datos principales del grupo
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
                <td>${group.intensivo ? 'Sí' : 'No'}</td>
            </tr>
            <tr>
                <td>Activo:</td>
                <td>${group.activo ? 'Sí' : 'No'}</td>
            </tr>
            <tr>
                <td>Horario:</td>
                <td>${group.horario || ''}</td>
            </tr>
        </table>
    `;
}

function removeDetailsModal() {
    const modal = document.getElementById('groupDataModal');
    if (modal) modal.remove();
}

// Dummy para scrollspy si lo usas
function startScrollSpy() {
    // Implementa si tienes scrollspy, si no puedes dejarlo vacío
}