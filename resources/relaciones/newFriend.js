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
                                        <td><label for="alumno1">Alumno 1:<span class="requiredMark">*</span></label></td>
                                        <td><input type="text" id="alumno1" name="alumno1" oninput="typeAheadA()" required><div id="typeAhead1" class="typeAhead"></div></td>
                                    </tr>
                                    <tr>
                                        <td><label for="alumno2">Alumno 2:<span class="requiredMark">*</span></label></td>
                                        <td><input type="text" id="alumno2" name="alumno2" oninput="typeAheadB()" required><div id="typeAhead2" class="typeAhead"></div></td>
                                    </tr>
                                    <tr>
                                        <td><label for="fechaInicio">Fecha inicio:<span class="requiredMark">*</span></label></td>
                                        <td><input type="date" id="fechaInicio" name="fechaInicio" required></td>
                                    </tr>
                                    <tr>
                                        <td><label for="tipoRelacion">Tipo de relación:<span class="requiredMark">*</span></label></td>
                                        <td>
                                            <select id="tipoRelacion" name="tipoRelacion" required>
                                                <option value=""> -- Selecciona el tipo -- </option>
                                                <option value="amigo">Amigo</option>
                                                <option value="familiar">Familiar</option>
                                            </select>
                                    </tr>
                                    <input type="number" style="display: none;" id="id_alumno1" name="id_alumno1">
                                    <input type="number" style="display: none;" id="id_alumno2" name="id_alumno2">
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
        document.getElementById("fechaInicio").value = new Date().toISOString().split("T")[0]
}

function typeAheadA() {
    const query = document.getElementById('alumno1').value;
    const suggestionBox = document.getElementById("typeAhead1");

    if(query.length >= 3) {
    fetch("./resources/studentTypeAhead.php?q=" + encodeURIComponent(query))
        .then(response => response.json())
        .then(data => {
            suggestionBox.innerHTML = "";
            if (data.results.length > 0) {
                data.results.forEach(item => {
                    console.log(item)
                    const div = document.createElement("div");
                    div.textContent = item.nombre_completo;
                    div.style.cursor = "pointer";
                    div.addEventListener("click", () => {
                        document.getElementById("alumno1").value = item.nombre_completo;
                        document.getElementById("id_alumno1").value = item.id_alumno;
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

function typeAheadB() {
    const query = document.getElementById('alumno2').value;
    const suggestionBox = document.getElementById("typeAhead2");

    if(query.length >= 3) {
    fetch("./resources/studentTypeAhead.php?q=" + encodeURIComponent(query))
        .then(response => response.json())
        .then(data => {
            suggestionBox.innerHTML = "";
            if (data.results.length > 0) {
                data.results.forEach(item => {
                    console.log(item)
                    const div = document.createElement("div");
                    div.textContent = item.nombre_completo;
                    div.style.cursor = "pointer";
                    div.addEventListener("click", () => {
                        document.getElementById("alumno2").value = item.nombre_completo;
                        document.getElementById("id_alumno2").value = item.id_alumno;
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
        tipoRelacion: form.tipoRelacion.value
    };

    if (!data.id_alumno1 || !data.id_alumno2 || !data.tipoRelacion) {
        _ex.ui.toast.make('Hay Campos sin rellenar.')
        return;
    }

    fetch(`./resources/relaciones/newRelation.php`, {
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
