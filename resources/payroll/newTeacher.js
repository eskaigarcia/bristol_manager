let selectedDays;

function createTeacher() {
    let div = document.createElement('div');
    div.className = 'modal';
    div.id = 'popUpModal';
    selectedDays = [];

    div.innerHTML = `
        <div>
            <div class="header">
                <div>
                    <h2>Nuevo Profesor</h2>
                </div>
                <img onclick="closeTeacherModal()" class="iconButton" src="./img/close.png" alt="Cerrar">
            </div>
            <div class="body noMeta">
                <div id="modalBodyView" style="margin-top: 1rem;">
                    <div class="scrollspySection" id="SDVData">
                        <div class="flex clear-between">
                            <h3>Datos del profesor</h3>
                            <p class="requiredAlert">Los campos marcados con <span class="requiredMark">*</span> son obligatorios</p>
                        </div>

                        <form name="insgrupo" id="teacherForm" method="POST">
                            <table class="camo inputMode">
                                <tr>
                                    <td><label for="nt_nombre">Profesor:<span class="requiredMark">*</span></label></td>
                                    <td><input type="text" id="nt_nombre" name="nt_nombre" placeholder="Introduce el nombre del profesor" required></td>
                                </tr>
                            </table>
                            <div class="center gap-md" style="margin-top: 1rem;">
                                <button class="warn" onclick="closeTeacherModal()" type="button">Cancelar inserción</button>
                                <button onclick="validateTeacher()" type="button">Guardar profesor</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>`;

    document.body.appendChild(div);
}

function closeTeacherModal() {
    const modal = document.getElementById('popUpModal');
    if (modal) modal.remove();
}

function validateTeacher() {
    const existingAlert = document.getElementById('alertMissingData');
    if (existingAlert) {
        existingAlert.remove();
    }

    const input = document.getElementById('nt_nombre').value;
    let missingValues = (input == '') ? true : false;

    if (missingValues) {
        const groupForm = document.getElementById('teacherForm');
        const warningDiv = document.createElement('div');
        warningDiv.className = 'inlineFormWarning';
        warningDiv.id="alertMissingData"
        warningDiv.innerHTML = `
            <p>Faltan datos</p>
            <p>Los campos marcados con asterisco son obligatorios</p>
        `;
        groupForm.insertBefore(warningDiv, groupForm.querySelector('div').nextSibling);
    } else {
        saveTeacherToDatabase()
    }
}

function saveTeacherToDatabase() {

    const nombre = document.getElementById('nt_nombre').value;

    // Push to database 
    fetch('./resources/profesores/newTeacher.php', {
        method: 'POST',
        headers:
         {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre })
    })
    .then(async response => {
        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message || 'Error desconocido');
        }
        return result;
    })
    .then(result => {
        if (result.success) {
            _ex.ui.toast.make('Profesor guardado correctamente', 'Ok', false);
        } else {
            console.error('Error al guardar:', result.message);
            _ex.ui.toast.make('Error al guardar el profesor: ' + (result.message || ''));
        }
    })
    .catch(err => {
        try {
            const phpError = JSON.parse(err.message);
            console.error('Error SQL:', phpError);
            _ex.ui.toast.make('Error de base de datos: ' + phpError.error);
        } catch {
            console.error('Error completo:', err);
            _ex.ui.toast.make('Error de conexión al guardar el grupo');
        }
    });

    closeTeacherModal()
}