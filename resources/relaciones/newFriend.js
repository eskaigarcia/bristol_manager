function createFriend() {
    let div = document.createElement('div');
    div.className = 'modal';
    div.id = 'friendModal';

    div.innerHTML = `
        <div>
            <div class="header">
                <div>
                    <h2>Nueva Relación</h2>
                </div>
                <img onclick="closeFriendModal()" class="iconButton" src="./img/close.png" alt="Cerrar">
            </div>
            <div class="body noMeta">
                <div id="modalBodyView" style="margin-top: 1rem;">
                    <div class="scrollspySection" id="SDVData">
                        <div class="flex clear-between">
                            <h3>Datos de la relación</h3>
                            <p class="requiredAlert">Los campos marcados con <span class="requiredMark">*</span> son obligatorios</p>
                        </div>

                        <form name="newFriendForm" id="newFriendForm" method="POST">
                            <div class="flex gap-md">
                                <table class="camo inputMode">
                                    <tr>
                                        <td><label for="id_alumno1">ID Alumno 1:</label></td>
                                        <td><input type="number" id="id_alumno1" name="id_alumno1" required></td>
                                    </tr>
                                    <tr>
                                        <td><label for="id_alumno2">ID Alumno 2:</label></td>
                                        <td><input type="number" id="id_alumno2" name="id_alumno2" required></td>
                                    </tr>
                                    <tr>
                                        <td><label for="fechaInicio">Fecha inicio:</label></td>
                                        <td><input type="date" id="fechaInicio" name="fechaInicio" required></td>
                                    </tr>
                                    <tr>
                                        <td><label for="fechaFin">Fecha fin:</label></td>
                                        <td><input type="date" id="fechaFin" name="fechaFin"></td>
                                    </tr>
                                    <tr>
                                        <td><label for="tipoRelacion">Tipo de relación:</label></td>
                                        <td>
                                           <select id="tipoRelacion" name="tipoRelacion" required>
                                            <option value="amigo">Amigo</option>
                                            <option value="familiar">Familiar</option>
                                           </select>

                                    </tr>
                                </table>
                            </div>

                            <div class="center gap-md" style="margin-top: 1rem;">
                                <button class="warn" type="button" onclick="closeFriendModal()">Cancelar</button>
                                <button type="button" onclick="submitNewFriend()">Guardar relación</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>`;

    document.body.appendChild(div);
}

function closeFriendModal() {
    const modal = document.getElementById('friendModal');
    if (modal) modal.remove();
}

function submitNewFriend() {
    const form = document.forms['newFriendForm'];

    const data = {
        id_alumno1: form.id_alumno1.value,
        id_alumno2: form.id_alumno2.value,
        fechaInicio: form.fechaInicio.value,
        fechaFin: form.fechaFin.value || null,
        tipoRelacion: form.tipoRelacion.value
    };

    fetch('./resources/relaciones/insertar_amigos.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(result => {
        if (result.success) {
            closeFriendModal();
            location.reload();
        } else {
            alert('Error: ' + (result.message || 'No se pudo guardar la relación.'));
        }
    })
    .catch(() => {
        alert('Error de conexión con el servidor.');
    });
}
