function getFriendDetails(id) {
    fetch(`./resources/relaciones/getFriendDetails.php?id=${id}`)
        .then(response => {
            if (!response.ok) throw new Error("No se pudieron cargar los detalles de la relación de amistad");
            return response.json();
        })
        .then(data => {
            if (data.error) {
                alert(data.error);
                return;
            }
            displayFriendDetails(data.amigo, data.alumnos);
        })
        .catch(error => {
            console.error("Error fetching friend details:", error);
        });
}

function displayFriendDetails(amigo, alumnos = []) {
    let div = document.createElement('div');
    div.className = 'modal';
    div.id = 'popUpModal';

    div.innerHTML = `
        <div>
            <div class="header">
                <div>
                    <p>Amigos ${amigo.id_amigo} - Creado el ${amigo.fechaInicio || ''}</p>
                    <h2>${amigo.tipoRelacion}</h2>
                    <div class="spaced-items-sm">${buildFriendChips(amigo)}</div>
                </div>
                <img onclick="removeDetailsModal()" class="iconButton" src="./img/close.png" alt="Cerrar">
            </div>
            <div class="body">
                ${doTabBar_friendDetails()}
                <div id="modalBodyView">
                    <div class="scrollspySection" id="FDVData">
                        <h3>Datos de la relación</h3>
                        ${buildFriendData(amigo)}
                    </div>
                    <div class="scrollspySection" id="FDVAlumnos">
                        <h3>Alumnos relacionados</h3>
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
                            : '<div style="margin-top:1rem;color:#888;">No hay alumnos en esta relación</div>'
                        }
                    </div>
                </div>
            </div>
        </div>
    `;
    document.querySelector('body').appendChild(div);
    startScrollSpy();
}

function buildFriendChips(amigo) {
    return amigo.tipoRelacion ? `<span class="chip">${amigo.tipoRelacion}</span>` : '';
}

function doTabBar_friendDetails() {
    return `<div class="tabs-scrollspy">
        <a href="#FDVData">
            <img src="./img/contactInfo.png" alt="Información y datos de la relación">
            <span>Datos</span>
        </a>
        <a href="#FDVAlumnos">
            <img src="./img/group.png" alt="Alumnos">
            <span>Alumnos</span>
        </a>
    </div>`;
}

function buildFriendData(amigo) {
    return `
        <table class="camo">
            <tr><td>Tipo de relación:</td><td>${amigo.tipoRelacion || ''}</td></tr>
            <tr><td>Fecha de inicio:</td><td>${amigo.fechaInicio || ''}</td></tr>
            <tr><td>Fecha de fin:</td><td>${amigo.fechaFin || ''}</td></tr>
        </table>
    `;
}

function removeDetailsModal() {
    const modal = document.getElementById('popUpModal');
    if (modal) modal.remove();
}

