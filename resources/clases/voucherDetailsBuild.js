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
    console.log(data)
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

    let transferButton = ''
    if(data.bono.esTransferido == 0 && clasesLibres > 0){
        transferButton = `<button class="mini inline" style="margin-left: 1rem;" onclick="performVoucherTransfer(${data.bono.id_bono}, ${data.bono.id_alumno})">Transferir bono</button>`
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
                    <td>¿Transferido?</td>
                    <td>${data.bono.esTransferido == 1 ? 'Sí' : 'No'} ${transferButton}</td>
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