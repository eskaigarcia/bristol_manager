function getGroupDetails(id) {
    fetch(`./resources/alumnos/getGroupDetails.php?id=${id}`)
        .then(response => {
            if (!response.ok) throw new Error("Alumno no encontrado")
            return response.json();
        })
        .then(data => displayGroupDetails(data))
        // .catch(error => console.error("Error:", error.message));
}

function displayGeoupDetails(group) {
    console.log(group) // debugging the object

    // CONSTRUCCIÓN FINAL DE LA INTERFAZ
    let div = document.createElement('div');
    div.className = 'modal studentData';
    div.id = 'studentDataModal';

    div.innerHTML = `
        <div>
            <div class="header">
                <div>
                    <p>Alumno ${student.alumno.id_alumno} - Inscrito el ${student.alumno.fechaInclusion}</p>
                    <h2>${student.alumno.apellidos}, ${student.alumno.nombre}</h2>
                    <div class="spaced-items-sm">${buildChips(student.alumno)}</div>
                </div>
                <img onclick="removeDetailsModal()" class="iconButton" src="./img/close.png" alt="Cerrar">
            </div>

            <div class="body">
                ${doTabBar_studentDetails()}
                <div id="studentDataView">
                    <div class="scrollspySection" id="SDVData">
                        ${buildStudentData(student.alumno)}
                    </div>
                </div>
            </div>
        </div>`

    document.querySelector('body').appendChild(div);

    startScrollSpy();
}

function doTabBar_studentDetails() {
    return `<div class="tabs-scrollspy">
                    <a href="#SDVData">
                        <img src="./img/contactInfo.png" alt="Información y datos del alumno">
                        <span>Datos</span>
                    </a>
                </div>`;
}
