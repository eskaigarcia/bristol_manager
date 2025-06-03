function createClass() {
    let div = document.createElement('div');
    div.className = 'modal';
    div.id = 'popUpModal';
    selectedDays = [];

    div.innerHTML = `
        <div>
            <div class="header">
                <div>
                    <h2>Nueva Clase</h2>
                </div>
                <img onclick="removeDetailsModal()" class="iconButton" src="./img/close.png" alt="Cerrar">
            </div>
            <div class="body noMeta">
                <div id="modalBodyView" style="margin-top: 1rem;">
                    <div class="scrollspySection" id="SDVData">
                        <div class="flex clear-between">
                            <h3>Datos de la clase</h3>
                            <p class="requiredAlert">Los campos marcados con <span class="requiredMark">*</span> son obligatorios</p>
                        </div>

                        <form name="newclass" id="classForm" method="POST">
                            <input type="number" id="nc_id_alumno" name="nc_id_alumno" style="display: none;"> 
                            <div class="flex gap-md">
                                <table class="camo inputMode">
                                    <tr>
                                        <td><label for="nc_alumno">Alumno:<span class="requiredMark">*</span></label></td>
                                        <td><input type="text" id="nc_alumno" name="nc_alumno" oninput="classTypeAhead()" required><div id="typeAhead"></div></td>
                                    </tr>
                                    <tr>
                                        <td><label for="nc_bono">Bono:<span class="requiredMark">*</span></label></td>
                                        <td>
                                            <select id="nc_bono" name="nc_bono" required>
                                                <option value=""> -- Selecciona primero un alumno -- </option>
                                            </select>
                                        </td>
                                    </tr>
                                </table>

                                <table class="camo inputMode">
                                    <tr>
                                        <td><label for="nc_profesor">Profesor:<span class="requiredMark">*</span></label></td>
                                        <td>
                                            <select id="nc_profesor" name="nc_profesor" required></select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><label for="nc_asignatura">Asignatura:</label></td>
                                        <td><input type="text" id="nc_asignatura" name="nc_asignatura"></td>
                                    </tr>
                                    <tr>
                                        <td><label for="nc_modalidad">Modalidad:</label></td>
                                        <td>
                                            <select id="nc_modalidad" name="nc_modalidad">
                                                <option value="">-- Selecciona modalidad --</option>
                                                <option value="presencial">Presencial</option>
                                                <option value="online">Online</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><label for="nc_fecha">Hora de la clase<span class="requiredMark">*</span>:</td>
                                        <td>
                                            <input type="datetime-local" id="nc_fecha" name="nc_fecha">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <label for="nc_batch">
                                            Cantidad de clases 
                                            <span 
                                                title="Puedes crear de golpe varias clases para este mismo día de la semana en las semanas próximas. Al dejarlo vacío se creará solo una clase, al introducir un número se creará una clase en cada semana próxima por tantas semanas como se indique en esta casilla"
                                            >
                                                <u style="cursor:pointer;">
                                                    (?)
                                                </u>
                                            </span>:
                                        </td>
                                        <td>
                                            <input type="number" id="nc_batch" name="nc_batch">
                                        </td>
                                    </tr>
                                </table>
                            </div>

                            <div class="center gap-md" style="margin-top: 1rem;">
                                <button class="warn" onclick="removeDetailsModal()" type="button">Cancelar</button>
                                <button onclick="validateClass()" type="button">Guardar clase</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>`;

    document.body.appendChild(div);
    // Set value in "YYYY-MM-DDTHH:MM" format for datetime-local input
    const now = new Date();
    const pad = n => n.toString().padStart(2, '0');
    const formatted = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
    document.getElementById("nc_fecha").value = formatted;
    getTeachersForNC();
}


function classTypeAhead() {
    const query = document.getElementById('nc_alumno').value;
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
                        document.getElementById("nc_alumno").value = item.nombre_completo;
                        document.getElementById("nc_id_alumno").value = item.id_alumno;
                        suggestionBox.style.display = "none";
                        getStudentVouchers(item.id_alumno)
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

function getStudentVouchers(id_alumno) {
    const select = document.getElementById('nc_bono');
    // Remove all existing options
    while (select.firstChild) {
        select.removeChild(select.firstChild);
    }
    // Add default option
    select.innerHTML = '<option value=""> -- Selecciona un bono -- </option>';

    fetch(`./resources/clases/getStudentVouchers.php?id=${encodeURIComponent(id_alumno)}`)
        .then(response => response.json())
        .then(data => {
            storage.classArray = {}
            if (Array.isArray(data) && data.length > 0) {
                data.forEach(voucher => {
                    const option = document.createElement('option');
                    option.value = voucher.id_bono;
                    option.textContent = `Bono de ${voucher.cantidadClases} clases con ${voucher.clasesLibres} clases restantes`;
                    storage.classArray[`voucher${voucher.id_bono}`] = voucher.clasesLibres;
                    select.appendChild(option);
                });
            } else {
                while (select.firstChild) {
                    select.removeChild(select.firstChild);
                }
                const option = document.createElement('option');
                option.value = '';
                option.textContent = 'No hay bonos disponibles';
                _ex.ui.toast.make('Este alumno no tienes bonos, debe pagar un bono de clases particulares antes de poder recibir clases particulares.');
                select.appendChild(option);
            }
        })
        .catch(error => {
            console.error('Error fetching vouchers:', error);
            const option = document.createElement('option');
            option.value = '';
            option.textContent = 'Error al cargar bonos';
            select.appendChild(option);
        });
}

async function getTeachersForNC() {
    const node = document.getElementById('nc_profesor');
    if (!node) return;

    // Add default option
    const defaultOpt = document.createElement('option');
    defaultOpt.value = '';
    defaultOpt.textContent = '-- Selecciona profesor --';
    node.appendChild(defaultOpt);

    try {
        const response = await fetch('./resources/grupos/getTeacherSelector.php');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const teachers = await response.json();
        teachers.forEach(teacher => {
            const option = document.createElement('option');
            // If teacher is a string, use as name, else use id_profesor/nombre
            if (typeof teacher === 'string') {
                option.textContent = teacher;
                option.value = teacher;
            } else {
                option.textContent = teacher.nombre;
                option.value = teacher.id_profesor;
            }
            node.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching teacher selector:', error);
    }
}

function validateClass() {
    const alumno = document.getElementById('nc_alumno').value.trim();
    const idAlumno = document.getElementById('nc_id_alumno').value.trim();
    const bono = document.getElementById('nc_bono').value.trim();
    const profesor = document.getElementById('nc_profesor').value.trim();
    const fecha = document.getElementById('nc_fecha').value.trim();

    let missingFields = [];

    if (!alumno || !idAlumno) missingFields.push('Alumno');
    if (!bono) missingFields.push('Bono');
    if (!profesor) missingFields.push('Profesor');
    if (!fecha) missingFields.push('Hora de la clase');

    if (missingFields.length > 0) {
        _ex.ui.toast.make('Debes rellenar los campos obligatorios');
        return false;
    }

    // All required fields are filled, proceed to save
    generateClasses();
}

function generateClasses() {
    let amt = parseInt(document.getElementById('nc_batch').value, 10);
    let id_bono = document.getElementById('nc_bono').value;
    if (isNaN(amt) || amt == '' || amt < 1) amt = 1;

    if (amt > 1) {
        clasesLibres = storage.classArray[`voucher${id_bono}`]
        if (amt > clasesLibres) {
            _ex.ui.toast.make('No puedes crear más clases de las que quedan en el bono seleccionado.');
            return;
        } else {
            // Get the original date from the input
            let fechaInput = document.getElementById('nc_fecha');
            let originalDate = new Date(fechaInput.value);

            for (let i = 0; i < amt; i++) {
                // Set the input value to the current date for this iteration
                let currentDate = new Date(originalDate);
                currentDate.setDate(originalDate.getDate() + i * 7);
                // Format to "YYYY-MM-DDTHH:MM"
                const pad = n => n.toString().padStart(2, '0');
                let formatted = `${currentDate.getFullYear()}-${pad(currentDate.getMonth() + 1)}-${pad(currentDate.getDate())}T${pad(currentDate.getHours())}:${pad(currentDate.getMinutes())}`;
                fechaInput.value = formatted;
                saveClassToDatabase();
            }
            _ex.ui.toast.make('Clases guardadas correctamente', 'Aceptar', false);
            storage.pendingEdits = false;
            removeDetailsModal();
        } 
    } else {    
        saveClassToDatabase();
        _ex.ui.toast.make('Clase guardada correctamente', 'Aceptar', false);
        storage.pendingEdits = false;
        removeDetailsModal();
    }
}

function saveClassToDatabase() {
    const idAlumno = document.getElementById('nc_id_alumno').value.trim();
    const idBono = document.getElementById('nc_bono').value.trim();
    const idProfesor = document.getElementById('nc_profesor').value.trim();
    const asignatura = document.getElementById('nc_asignatura').value.trim();
    const modalidad = document.getElementById('nc_modalidad').value.trim();
    const fecha = document.getElementById('nc_fecha').value.trim();

    const payload = {
        id_alumno: idAlumno,
        id_bono: idBono,
        id_profesor: idProfesor,
        asignatura: asignatura,
        modalidad: modalidad,
        fecha: fecha
    };

    fetch('./resources/clases/newClass.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            return
        } else {
            _ex.ui.toast.make('Error al guardar la clase: ' + (data.message || ''));
        }
    })
    .catch(error => {
        _ex.ui.toast.make('Error de red al guardar la clase');
        console.error('Error saving class:', error);
    });
}