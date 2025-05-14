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
                            <table class="camo inputMode">
                                <tr>
                                    <td><label for="ng_nombre">Nombre del grupo:</label></td>
                                    <td><input type="text" id="ng_nombre" name="ng_nombre" placeholder="Introduce el nombre del grupo" required></td>
                                </tr>
                            </table>
                            <div class="flex gap-md">
                                <table class="camo inputMode">
                                    <tr>
                                        <td><label for="ng_profesor">Profesor:</label></td>
                                        <td>
                                            <select id="ng_profesor" name="ng_profesor"></select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><label for="ng_modalidad">Modalidad:</label></td>
                                        <td>
                                            <select id="ng_modalidad" name="ng_modalidad" required>
                                                <option value="">-- Selecciona modalidad --</option>
                                                <option value="presencial">Presencial</option>
                                                <option value="online">Online</option>
                                                <option value="hibrido">Híbrido</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><label for="ng_precio">Precio (en euros):</label></td>
                                        <td><input type="number" id="ng_precio" name="ng_precio" min="0" step="0.01" required></td>
                                    </tr>
                                    <tr>
                                        <td><label for="ng_esIntensivo">Intensivo</label></td>
                                        <td>
                                            <input type="checkbox" id="ng_esIntensivo" name="ng_esIntensivo" value="1">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><label for="ng_creacion" id="creacion" name="creacion">Fecha de creación</td>
                                        <td>
                                            <input type="date" id="ng_fecha" name="ng_fecha">
                                        </td>
                                    </tr>
                                </table>

                                <table class="camo inputMode">
                                    <tr>
                                        <td><label for="ng_horasSemanales">Horas semanales:</label></td>
                                        <td>
                                            <input type="number" id="ng_horasSemanales" name="ng_horasSemanales" required>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><label>Días:</label></td>
                                        <td>
                                            <div class="multipicker" onchange="updateDaysDisplay()">
                                                <label><input type="checkbox" value="Lunes">L</label>
                                                <label><input type="checkbox" value="Martes">M</label>
                                                <label><input type="checkbox" value="Miércoles">X</label>
                                                <label><input type="checkbox" value="Jueves">J</label>
                                                <label><input type="checkbox" value="Viernes">V</label>
                                                <label><input type="checkbox" value="Sábado">S</label>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr id="scheduleBuilder">
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
    document.getElementById("ng_fecha").value = new Date().toISOString().split("T")[0]
    getTeachersForNG()
}

function tryCloseGroupModal() {
    if (storage.pendingEdits) {
        _ex.ui.toast.make('Tienes cambios sin guardar');
        return;
    }
    closeGroupModal();
}

function closeGroupModal() {
    storage.pendingEdits = false;
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


