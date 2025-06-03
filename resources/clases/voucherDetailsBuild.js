function getVoucherDetails(id_bono) {
    fetch(`./resources/clases/getVoucherDetails.php?id=${id_bono}`)
        .then(response => {
            if (!response.ok) throw new Error("Alumno no encontrado")
            return response.json();
        })
        .then(data => displayVoucherDetails(data))
        // .catch(error => console.error("Error:", error.message));
}

function displayVoucherDetails(data) {
    let div = document.createElement('div');
    div.className = 'modal';
    div.id = 'popUpModal';

    div.innerHTML = `
        <div>
            <div class="header">
                <div>
                    <p>Bono: ${data.bono.id_bono}</p>
                    <h2>Bono de ${data.alumno.nombre} ${data.alumno.apellidos}</h2>
                    <div class="spaced-items-sm">
                        ${buildVoucherChips(data)}
                    </div>
                </div>
                <img onclick="removeDetailsModal()" class="iconButton" src="./img/close.png" alt="Cerrar">
            </div>

            <div class="body">
                <div id="modalBodyView">
                    <div class="scrollspySection" id="GDVData">
                        <h3>Datos del bono</h3>
                        ${buildVoucherStats(data)}
                    </div>
                    <div class="scrollspySection" id="GDVAlumnos">
                        <h3>${data.clases.length} clases registradas</h3>
                        ${buildListOfClases(data.clases)}
                    </div>
                </div>
            </div>
        </div>`;

    document.querySelector('body').appendChild(div);
}

function buildVoucherStats(data) {
    const clasesLibres = data.bono.cantidadClases - data.clases.length;

    storage.currentDataObject = data;

    let transferButton = ''
    if(data.bono.esTransferido == 0 && clasesLibres > 0){
        transferButton = `<button class="mini inline" style="margin-left: 1rem;" onclick="performVoucherTransfer()">Transferir bono</button>`
    }

    return `
        <table class="camo" style="width: 100%;">
            <tbody>
                <tr>
                    <td style="width: 10rem;">Cantidad de clases</td>
                    <td>${data.bono.cantidadClases}</td>
                </tr>
                <tr>
                    <td>Clases disponibles</td>
                    <td>${clasesLibres}</td>
                </tr>
                <tr>
                    <td>Transferible</td>
                    <td>${data.bono.esTransferido == 1 ? 'No' : 'Sí'} ${transferButton}</td>
                </tr>
                <tr>
                    <td>Fecha de compra</td>
                    <td>${_ex.format.date(data.bono.fechaPago)}</td>
                </tr>
                <tr>
                    <td>Caducidad</td>
                    <td>${_ex.format.date(data.bono.caducidad)}</td>
                </tr>
                <tr>
                    <td>Precio total</td>
                    <td>${_ex.format.money(data.bono.precioTotal)}</td>
                </tr>
                <tr>
                    <td>Fecha de pago</td>
                    <td>${_ex.format.date(data.bono.fechaPago)}</td>
                </tr>
                <tr>
                    <td>Método de pago</td>
                    <td>${data.bono.metodopago || 'No registrado'}</td>
                </tr>
            </tbody>
        </table>
    `;
}

function buildVoucherChips(data) {
    let chips = '';
    // Chip for caducidad
    // Parse "2026-07-03" as YYYY-MM-DD
    const [year, month, day] = data.bono.caducidad.split('-').map(Number);
    const caducidadDate = new Date(year, month - 1, day);
    if (caducidadDate > new Date()) {
        chips += '<span class="chip">Bono en vigor</span>';
    } else {
        chips += '<span class="chip warn">Bono caducado</span>';
    }

    // Chip for bono consumido
    if (data.clases.length === data.bono.cantidadClases) {
        chips += '<span class="chip warn">Bono consumido</span>';
    } else {
        chips += '<span class="chip">Clases disponibles</span>';
    }
    return chips;
}

function buildListOfClases(classList){
    if (!classList || classList.length === 0) {
        return '<p>No hay clases registradas.</p>';
    }
    let table = `<table class="styledData">
        <thead>
            <tr>
                <td>Fecha y hora</td>
                <td>Asignatura</td>
                <td>Duración</td>
                <td>Profesor</td>
            </tr>
        </thead>
        <tbody>`;
    classList.forEach(clase => {
        table += `<tr>
            <td>${_ex.format.dateTime(clase.fechaHora) || ''}</td>
            <td>${clase.asignatura || 'No definida'}</td>
            <td>${clase.duracion || 0} minutos</td>
            <td>${clase.nombre_profesor || ''}</td>
        </tr>`;
    });
    table += `</tbody></table>`;
    return table;
}

function performVoucherTransfer() {
    const data = storage.currentDataObject;
    // Remove any existing transfer dialog
    const existingDialog = document.getElementById('voucherTransferDialog');
    if (existingDialog) existingDialog.remove();

    // Create dialog container
    const dialog = document.createElement('div');
    dialog.id = 'voucherTransferDialog';
    dialog.className = 'modal';
    dialog.innerHTML = `
        <div style="background: #fff; padding: 2rem; border-radius: 8px; max-height: 400px; max-width: 400px; position: relative;">
            <h3>Transferir bono</h3>
            <input type="text" id="id_studentNameInput" style="display: none;">
            <label for="studentNameInput">Nombre del alumno:</label>
            <input type="text" id="studentNameInput" style="width: 100%; margin: 1rem 0;" autofocus oninput="transferTypeAhead()">
            <div id="typeAhead" style="transform: translate(0, 200%);"></div>
            <div class="gap-md" style="text-align: right; display: flex;">
                <button id="cancelTransferBtn" class="mini" style="margin-right: 1rem;">Cancelar</button>
                <button id="confirmTransferBtn" class="mini primary">Transferir</button>
            </div>
        </div>
    `;

    // Append dialog to body
    document.body.appendChild(dialog);

    // Add event listeners
    document.getElementById('cancelTransferBtn').onclick = () => dialog.remove();
    document.getElementById('confirmTransferBtn').onclick = () => {
        const studentId = document.getElementById('id_studentNameInput').value;
        const classesLeft = data.bono.cantidadClases - data.clases.length;
        if (!studentId) {
            alert('Por favor, selecciona un alumno válido de la lista.');
            return;
        }
        fetch('./resources/clases/transferVoucher.php', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            id_bono: data.bono.id_bono,
            id_alumno: studentId,
            clases_restantes: classesLeft
            })
        })
        .then(response => response.json())
        .then(result => {
            if (!result.success) {
            alert('Error al transferir el bono: ' + (result.message || 'Error desconocido'));
            }
        })
        .catch(error => {
            alert('Error de red al transferir el bono');
        });
        dialog.remove();
    };
}


function transferTypeAhead() {
    const query = document.getElementById('studentNameInput').value;
    const suggestionBox = document.getElementById("typeAhead");
    if(query.length >= 3) {
    fetch("./resources/studentTypeAhead.php?q=" + encodeURIComponent(query))
        .then(response => response.json())
        .then(data => {
            suggestionBox.innerHTML = "";
            if (data.results.length > 0) {
                data.results.forEach(item => {
                    const div = document.createElement("div");
                    div.textContent = item.nombre_completo;
                    div.style.cursor = "pointer";
                    div.addEventListener("click", () => {
                        document.getElementById("studentNameInput").value = item.nombre_completo;
                        document.getElementById("id_studentNameInput").value = item.id_alumno;
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
