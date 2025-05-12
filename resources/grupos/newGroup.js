function createGroup() {
    let div = document.createElement('div');
    div.className = 'modal';
    div.id = 'popUpModal';

    div.innerHTML = `
        <div>
            <div class="header">
                <div>
                    <h2>Nuevo Grupo</h2>
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
                        <form name="insgrupo" method="POST">
                            <div class="flex">
                                <label for="nombre">Nombre del grupo:</label>
                                <input type="text" id="nombre" name="nombre" placeholder="Introduce el nombre del grupo" required>
                            </div>
                            <div class="flex gap-md">
                                <table class="camo inputMode">
                                    <tr>
                                        <td><label for="asignatura">Asignatura:</label></td>
                                        <td><input type="text" id="asignatura" name="asignatura" placeholder="Introduce la asignatura" required></td>
                                    </tr>
                                    <tr>
                                        <td><label for="modalidad">Modalidad:</label></td>
                                        <td>
                                            <select id="modalidad" name="modalidad" required>
                                                <option value="presencial">Presencial</option>
                                                <option value="online">Online</option>
                                                <option value="hibrido">Híbrido</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><label for="horasSemanales">Horas semanales:</label></td>
                                        <td>
                                            <select id="horasSemanales" name="horasSemanales" required>
                                                <option value="1">1 Hora</option>
                                                <option value="1.5">1.5 Hora</option>
                                                <option value="2">2 Horas</option>
                                                <option value="3">3 Horas</option>
                                                <option value="4">4 Horas</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><label for="precio">Precio (en euros):</label></td>
                                        <td><input type="number" id="precio" name="precio" placeholder="Introduce el precio" required></td>
                                    </tr>
                                    <tr>
                                        <td><label for="esActivo">¿Está activo?</label></td>
                                        <td>
                                            <input type="checkbox" id="esActivo" name="esActivo" value="1">
                                            <label for="esActivo">Activo</label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><label for="esIntensivo">¿Es intensivo?</label></td>
                                        <td>
                                            <input type="checkbox" id="esIntensivo" name="esIntensivo" value="1">
                                            <label for="esIntensivo">Intensivo</label>
                                        </td>
                                    </tr>
                                </table>
                                <table class="camo inputMode">
                                    <tr>
                                        <td><label for="id_profesor">ID del Profesor:</label></td>
                                        <td><input type="number" id="id_profesor" name="id_profesor" placeholder="Introduce el ID del profesor" required></td>
                                    </tr>
                                    <tr>
                                        <td><label for="horarioDias">Días:</label></td>
                                        <td>
                                    <div class="multipicker">
                                            <label><input type="checkbox" name="horarioDias[]" value="Lunes">Lunes</label>
                                            <label><input type="checkbox" name="horarioDias[]" value="Martes">Martes</label>
                                            <label><input type="checkbox" name="horarioDias[]" value="Miércoles">Miércoles</label>
                                            <label><input type="checkbox" name="horarioDias[]" value="Jueves">Jueves</label>
                                            <label><input type="checkbox" name="horarioDias[]" value="Viernes">Viernes</label>
                                            <label><input type="checkbox" name="horarioDias[]" value="Sábado">Sábado</label>
                                            <label><input type="checkbox" name="horarioDias[]" value="Domingo">Domingo</label>
                                    </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><label for="horarioHoras">Horas de clase:</label></td>
                                        <td><input type="text" id="horarioHoras" name="horarioHoras" placeholder="Ejemplo: 09:00, 11:00" required></td>
                                    </tr>
                                    <tr>
                                        <td><label for="horarioDuraciones">Duraciones de clase:</label></td>
                                        <td><input type="text" id="horarioDuraciones" name="horarioDuraciones" placeholder="Ejemplo: 60, 90" required></td>
                                    </tr>
                                </table>
                            </div>
                        </form>
                    </div>
                    <div class="center gap-md">
                        <button class="warn" onclick="cancelStudentInsertion()">Cancelar inserción</button>
                        <button onclick="submitNewStudent()">Guardar alumno</button>
                    </div>
                </div>
            </div>
        </div>`

    document.querySelector('body').appendChild(div);
    document.getElementById("fecha").value = new Date().toISOString().split("T")[0]
};


if (typeof storage === 'undefined') window.storage = {};
storage.pendingEdits = false;
let groupCloseWarned = false;

function createGroup() {
    storage.pendingEdits = true;
    groupCloseWarned = false;
    let div = document.createElement('div');
    div.className = 'modal';
    div.id = 'popUpModal';

    div.innerHTML = `
        <div>
            <div class="header">
                <div>
                    <h2>Nuevo Grupo</h2>
                </div>
                <img onclick="tryCloseGroupModal()" class="iconButton" src="./img/close.png" alt="Cerrar">
            </div>
            <div class="body noMeta">
                <div id="modalBodyView" style="margin-top: 1rem;">
                    <div class="scrollspySection" id="SDVData">
                        <div class="flex clear-between">
                            <h3>Datos de la clase</h3>
                            <p class="requiredAlert">Los campos marcados con <span class="requiredMark">*</span> son obligatorios</p>
                        </div>

                        <form name="insgrupo" id="groupForm" method="POST">
                            <div class="flex gap-md">
                                <table class="camo inputMode">
                                    <tr>
                                        <td><label for="nombre">Nombre del grupo:</label></td>
                                        <td><input type="text" id="nombre" name="nombre" placeholder="Introduce el nombre del grupo" required></td>
                                    </tr>
                                    <tr>
                                        <td><label for="modalidad">Modalidad:</label></td>
                                        <td>
                                            <select id="modalidad" name="modalidad" required>
                                                <option value="presencial">Presencial</option>
                                                <option value="online">Online</option>
                                                <option value="hibrido">Híbrido</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><label for="horasSemanales">Horas semanales:</label></td>
                                        <td>
                                            <select id="horasSemanales" name="horasSemanales" required>
                                                <option value="1">1 Hora</option>
                                                <option value="1.5">1.5 Hora</option>
                                                <option value="2">2 Horas</option>
                                                <option value="3">3 Horas</option>
                                                <option value="4">4 Horas</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><label for="precio">Precio (en euros):</label></td>
                                        <td><input type="number" id="precio" name="precio" min="0" step="0.01" required></td>
                                    </tr>
                                    <tr>
                                        <td><label for="esActivo">¿Está activo?</label></td>
                                        <td>
                                            <input type="checkbox" id="esActivo" name="esActivo" value="1">
                                            <label for="esActivo">Activo</label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><label for="esIntensivo">¿Es intensivo?</label></td>
                                        <td>
                                            <input type="checkbox" id="esIntensivo" name="esIntensivo" value="1">
                                            <label for="esIntensivo">Intensivo</label>
                                        </td>
                                    </tr>
                                </table>

                                <table class="camo inputMode">
                                    <tr>
                                        <td><label for="id_profesor">ID del Profesor:</label></td>
                                        <td><input type="number" id="id_profesor" name="id_profesor" placeholder="Introduce el ID del profesor" required></td>
                                    </tr>
                                    <tr>
                                        <td><label for="horarioDias">Días:</label></td>
                                        <td>
                                            <div class="multipicker">
                                                <label><input type="checkbox" name="horarioDias[]" value="Lunes">L</label>
                                                <label><input type="checkbox" name="horarioDias[]" value="Martes">M</label>
                                                <label><input type="checkbox" name="horarioDias[]" value="Miércoles">X</label>
                                                <label><input type="checkbox" name="horarioDias[]" value="Jueves">J</label>
                                                <label><input type="checkbox" name="horarioDias[]" value="Viernes">V</label>
                                                <label><input type="checkbox" name="horarioDias[]" value="Sábado">S</label>
                                                <label><input type="checkbox" name="horarioDias[]" value="Domingo">D</label>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><label for="horarioHoras">Horas de clase:</label></td>
                                        <td><input type="text" id="horarioHoras" name="horarioHoras" placeholder="Ejemplo: 09:00, 11:00" required></td>
                                    </tr>
                                    <tr>
                                        <td><label for="horarioDuraciones">Duraciones de clase:</label></td>
                                        <td><input type="text" id="horarioDuraciones" name="horarioDuraciones" placeholder="Ejemplo: 60, 90" required></td>
                                    </tr>
                                </table>
                            </div>

                            <div class="center gap-md" style="margin-top: 1rem;">
                                <button class="warn" onclick="tryCloseGroupModal()" type="button">Cancelar inserción</button>
                                <button onclick="submitNewGroup()" type="button">Guardar grupo</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>`;

    document.body.appendChild(div);
}

function tryCloseGroupModal() {
    if (storage.pendingEdits && !groupCloseWarned) {
        _ex.ui.toast.make('Tienes cambios sin guardar');
        groupCloseWarned = true;
        return;
    }
    closeGroupModal();
}

function closeGroupModal() {
    storage.pendingEdits = false;
    groupCloseWarned = false;
    const modal = document.getElementById('popUpModal');
    if (modal) modal.remove();
}

function submitNewGroup() {
    storage.pendingEdits = false;
    groupCloseWarned = false;

    const form = document.forms['insgrupo'];
    const data = {
        nombre: form.nombre.value,
        modalidad: form.modalidad.value,
        horasSemanales: form.horasSemanales.value,
        precio: form.precio.value,
        esActivo: form.esActivo.checked ? 1 : 0,
        esIntensivo: form.esIntensivo.checked ? 1 : 0,
        id_profesor: form.id_profesor.value,
        horarioDias: Array.from(form.querySelectorAll('input[name="horarioDias[]"]:checked')).map(cb => cb.value),
        horarioHoras: form.horarioHoras.value,
        horarioDuraciones: form.horarioDuraciones.value
    };

    // Validación para evitar precios negativos
    if (parseFloat(data.precio) < 0) {
        _ex.ui.toast.make('El precio no puede ser negativo.');
        return;
    }

    // Aquí va el fetch real para guardar en la base de datos
    fetch('./resources/grupos/newGroup.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(result => {
        if (result.success) {
            sessionStorage.setItem('groupAdded', '1');
            closeGroupModal();
            location.reload();
        } else {
            _ex.ui.toast.make('Error al añadir el grupo: ' + (result.message || ''));
        }
    })
    .catch(() => {
        _ex.ui.toast.make('Error al procesar la solicitud.');
    });
}


