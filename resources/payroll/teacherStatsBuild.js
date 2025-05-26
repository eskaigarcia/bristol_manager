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
                        ${buildTeacherStats_groups(data)}
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