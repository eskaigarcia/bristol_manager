function getTeacherStats(id) {
    fetch(`./resources/profesores/getTeacherStats.php?id=${id}`)
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

    data.counters = {}
    data.counters.recurring = 0;
    data.counters.intensivos = 0;
    for (group of data.grupos) {
        if (group.esIntensivo == 0) data.counters.recurring++
        else data.counters.intensivos++
    }

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
                        <h3>${data.counters.recurring} grupos recurrentes activos este mes</h3>
                        ${buildTeacherStats_groups(data)}
                    </div>
                    <div class="scrollspySection" id="TDVIntensives">
                        <h3>${data.counters.intensivos} cursos intensivos activos este mes</h3>
                        ${buildTeacherStats_intensivos(data)}
                    </div>
                    <div class="scrollspySection" id="TDVIndividuals">
                        <h3>${data.particulares.length} clases individuales este mes</h3>
                        ${buildTeacherStats_particulares(data.particulares)}
                    </div>
                </div>
            </div>
        </div>`;

    document.querySelector('body').appendChild(div);
    startScrollSpy();
}

// Función que crea las "chips" de información del grupo
function buildTeacherChips(data) {
    if (data.grupos.length > 0 || data.particulares.length > 0) return '<span class="chip">Profesor activo</span>'
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

function buildTeacherStats_groups(data) {

    let groupButtons = []
    let groupDetails = []

    data.grupos.forEach(group => {
        if(group.esIntensivo == 0){
            groupButtons.push(group.nombre)
            groupDetails.push({
                nombre: group.nombre,
                modalidad: group.modalidad,
                horario: group.horario,
                alumnos: group.alumnos
            })
        }
    });

    if (groupButtons.length == 0) return '<p>Ningún grupo activo</p>'

    const container = document.createElement('div');
    container.className = 'TP_listExplorer';

    const groupList = document.createElement('div');
    groupList.id = 'TS_groupList';

    const groupData = document.createElement('div');
    groupData.id = 'TS_groupData';

    for (let group = 0; group < groupButtons.length; group++) {
        let btn = document.createElement('button');
        btn.innerText = groupButtons[group];
        groupList.appendChild(btn)

        // Create group info div
        const details = groupDetails[group];
        const infoDiv = document.createElement('div');
        infoDiv.id = 'groupItem_' + [group]
        infoDiv.innerHTML = `
            <p class="titleName">${details.nombre}</p>
            <p><strong>Modalidad:</strong> ${details.modalidad}</p>
            <p>${_ex.schedule.formatArray(_ex.schedule.decode(details.horario))}</p>
            <hr>
            <p><strong>${details.alumnos.length} alumnos</strong></p>
        `;

        // Create students table
        const table = document.createElement('table');
        table.className = 'camo';
        details.alumnos.forEach(alumno => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${alumno.nombre} ${alumno.apellidos}</td>`;
            table.appendChild(tr);
        });

        // Append info and table to groupData
        if (table.hasChildNodes()) infoDiv.appendChild(table);
        else {
            const message = document.createElement('p')
            message.innerText = 'Ningún alumno registrado.'
            infoDiv.appendChild(message);
        }
        groupData.appendChild(infoDiv);
        
    }

    container.appendChild(groupList);
    container.appendChild(groupData);

    setTimeout(() => {
        let buttons = document.querySelectorAll('#TS_groupList button')
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', function() {
                updateDisplayedList_groups(i)
            });
        }
    }, 100);

    return container.outerHTML;
}

function updateDisplayedList_groups(index) {
    const all = document.querySelectorAll('#TS_groupData div')
    all.forEach(div => {
        div.classList.remove('shown')
    });
    document.getElementById(`groupItem_${index}`).classList.add('shown')
}

function buildTeacherStats_intensivos(data) {

    let groupButtons = []
    let groupDetails = []

    data.grupos.forEach(group => {
        if(group.esIntensivo == 1){
            groupButtons.push(group.nombre)
            groupDetails.push({
                nombre: group.nombre,
                modalidad: group.modalidad,
                horario: group.horario,
                alumnos: group.alumnos
            })
        }
    });

    if (groupButtons.length == 0) return '<p>Ningún grupo activo</p>'


    const container = document.createElement('div');
    container.className = 'TP_listExplorer';

    const intensivoList = document.createElement('div');
    intensivoList.id = 'TS_intensivoList';

    const intensivoData = document.createElement('div');
    intensivoData.id = 'TS_intensivoData';

    for (let group = 0; group < groupButtons.length; group++) {
        let btn = document.createElement('button');
        btn.innerText = groupButtons[group];
        intensivoList.appendChild(btn)

        // Create group info div
        const details = groupDetails[group];
        const infoDiv = document.createElement('div');
        infoDiv.id = 'intensivoItem_' + [group]
        infoDiv.innerHTML = `
            <p class="titleName">${details.nombre}</p>
            <p><strong>Modalidad:</strong> ${details.modalidad}</p>
            <p>${_ex.schedule.formatArray(_ex.schedule.decode(details.horario))}</p>
            <hr>
            <p><strong>${details.alumnos.length} alumnos</strong></p>
        `;

        // Create students table
        const table = document.createElement('table');
        table.className = 'camo';
        details.alumnos.forEach(alumno => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${alumno.nombre} ${alumno.apellidos}</td>`;
            table.appendChild(tr);
        });

        // Append info and table to intensivoData
        if (table.hasChildNodes()) infoDiv.appendChild(table);
        else {
            const message = document.createElement('p')
            message.innerText = 'Ningún alumno registrado.'
            infoDiv.appendChild(message);
        }
        intensivoData.appendChild(infoDiv);
        
    }

    container.appendChild(intensivoList);
    container.appendChild(intensivoData);

    setTimeout(() => {
        let buttons = document.querySelectorAll('#TS_intensivoList button')
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', function() {
                updateDisplayedList_intensivos(i)
            });
        }
    }, 100);

    return container.outerHTML;
}

function updateDisplayedList_intensivos(index) {
    const all = document.querySelectorAll('#TS_intensivoData div')
    all.forEach(div => {
        div.classList.remove('shown')
    });
    document.getElementById(`intensivoItem_${index}`).classList.add('shown')
}

function buildTeacherStats_particulares(clases) {
    if (clases.length == 0) return '<p>Ninguna clase particular registrada este mes.</p>'
    
    let table = `<table class="styledData">
        <tr>
            <td><strong>Alumno</strong></td>
            <td><strong>Asignatura</strong></td>
            <td><strong>Fecha</strong></td>
            <td><strong>Duración</strong></td>
            <td><strong>Modalidad</strong></td>
        </tr>`

    for (let clase of clases) {
        // Format date as dd/mm hh:mm
        let dateObj = new Date(clase.FechaHora.replace(' ', 'T'));
        let day = String(dateObj.getDate()).padStart(2, '0');
        let month = String(dateObj.getMonth() + 1).padStart(2, '0');
        let hours = String(dateObj.getHours()).padStart(2, '0');
        let minutes = String(dateObj.getMinutes()).padStart(2, '0');
        let formattedDate = `${day}/${month} ${hours}:${minutes}`;

        table += `
        <tr>
            <td>${clase.apellidos}, ${clase.nombre}</td>
            <td>${clase.asignatura || 'No definida'}</td>
            <td>${formattedDate}</td>
            <td>${clase.duracion}min</td>
            <td>${clase.modalidad}</td>
        </tr>`

    }

    table += '</table>'

    return table;
}