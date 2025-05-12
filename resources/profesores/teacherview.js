function mostrarDatosProfe(id) {
    const filas = document.querySelectorAll('#searchResult tr:not(.head)');
    const fila = [...filas].find(tr => tr.children[0] && tr.children[0].textContent.trim() == id);

    if (!fila) return alert("Profesor no encontrado.");

    const nombre = fila.children[1].textContent;

    let div = document.createElement('div');
    div.className = 'modal studentData';
    div.id = 'studentDataModal';
//acuerdate luego de cambiar el enlace del href para que la barra de navegacion vaya a todos lados
    div.innerHTML = `
    <div>
        <div class="header">
            <div>
                <p>ID del profesor: ${id}</p>
                <h2>Profesor: ${nombre}</h2>
            </div>
            <img onclick="document.body.removeChild(document.getElementById('studentDataModal'))" class="iconButton" src="./img/close.png" alt="Cerrar">
        </div>
       <div class="tabs-scrollspy">
    <div class="tab">
        <a href="#SDVData">
            <img src="./img/contactInfo.png" alt="Información y datos del maestro">
            <span>Datos</span>
        </a>
    </div>
    <div class="tab">
        <a href="#SDVData">
            <img src="./img/group.png" alt="Información y datos de los alumnos del maestro">
            <span>Alumnos</span>
        </a>
    </div>
</div>
        <div class="body" id="studentDataView">
            <div class="scrollspySection">
                <div id="datos">
                    <h3>Información del profesor</h3>
                    <p>Aquí van los datos del profesor.</p>
                </div>
                <div id="alumnos">
                    <h3>Alumnos relacionados</h3>
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
