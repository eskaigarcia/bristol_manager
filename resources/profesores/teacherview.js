function mostrarDatosProfe(id) {
    const filas = document.querySelectorAll('#searchResult tr:not(.head)');
    const fila = [...filas].find(tr => tr.children[0] && tr.children[0].textContent.trim() == id);

    if (!fila) return alert("Profesor no encontrado.");

    const nombre = fila.children[1].textContent;

    let div = document.createElement('div');
    div.className = 'modal studentData';
    div.id = 'studentDataModal';

    div.innerHTML = `
    <div>
        <div class="header">
            <div>
                <p>ID del profesor: ${id}</p>
                <h2>Profesor: ${nombre}</h2>
            </div>
            <img onclick="document.body.removeChild(document.getElementById('studentDataModal'))" class="iconButton" src="./img/close.png" alt="Cerrar">
        </div>
        <div class="body" id="studentDataView">
            <div class="scrollspySection">
                <div id="datos">
                    <h3>Información del profesor</h3>
                    <p>Aquí van los datos del profesor.</p>
                </div>
                <div id="alumnos">
                    <h3>Alumnos relacionados de prueba</h3>
                    <p>Lista de alumnos asociados a este profesor.</p>
                </div>
                <div id="otros">
                    <h3>Otros datos</h3>
                    <p>Información adicional sobre el profesor.</p>
                </div>
            </div>
        </div>
    </div>
`;

    document.body.appendChild(div);
}