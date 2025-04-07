function getStudentDetails(id) {
    fetch(`./resources/getStudentDetails.php?id=${id}`)
        .then(response => {
            if (!response.ok) throw new Error("Alumno no encontrado")
            return response.json();
        })
        .then(data => displayStudentDetails(data))
        // .catch(error => console.error("Error:", error.message));
}

function toggleIBAN() {
    const field = document.getElementById('IBANField');
    const button = document.getElementById('IBANButton');

    if (field.type == 'text') {
        field.type = 'password';
        button.innerText = 'Mostrar';
    } else { 
        field.type = 'text'
        button.innerText = 'Ocultar';
    } 
}

function toggleIBAN2() {
    const field = document.getElementById('IBANField2');
    const button = document.getElementById('IBANButton2');

    if (field.type == 'text') {
        field.type = 'password';
        button.innerText = 'Mostrar';
    } else { 
        field.type = 'text'
        button.innerText = 'Ocultar';
    } 
}

function removeDetailsModal() {
    document.getElementById('studentDataModal').remove()
}

function displayStudentDetails(student) {
    console.log(student) // debugging the object

    // Creamos los chips booleanos
    let chips = ''
    chips += (student.alumno.esAdulto == 0) ? '<span class="chip warn">Menor de edad</span>' : '<span class="chip">Mayor de edad</span>';
    chips += (student.alumno.esAmonestado == 1) ? '<span class="chip warn">Amonestado</span>' : '';
    chips += (student.alumno.comentariosMedicos != null) ? '<span class="chip warn">Tiene anotaciones médicas</span>' : '';

    student = formatObjectData(student);
    
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
                    <div class="spaced-items-sm">${chips}</div>
                </div>
                <img onclick="removeDetailsModal()" class="iconButton" src="./img/close.png" alt="Cerrar">
            </div>

            <div class="body">
                ${doTabBar()}
                <div id="studentDataView">
                    <div class="scrollspySection" id="SDVData">
                        <h3>Datos</h3>
                        <div class="flex">
                            <table class="camo">
                                <tr>
                                    <td>DNI:</td>
                                    <td>${student.alumno.dni}</td>
                                </tr>
                                <tr>
                                    <td>Teléfono:</td>
                                    <td>${student.alumno.telefono}</td>
                                </tr>
                                <tr>
                                    <td>Email:</td>
                                    <td>${student.alumno.email}</td>
                                </tr>
                            </table>
                            <table class="camo">
                                <tr>
                                    <td>Dirección:</td>
                                    <td>${student.alumno.direccion}</td>
                                </tr>
                                <tr>
                                    <td>CP:</td>
                                    <td>${student.alumno.cp}</td>
                                </tr>
                                <tr>
                                    <td>Localidad:</td>
                                    <td>${student.alumno.localidad}</td>
                                </tr>
                            </table>
                        </div>
                        <div class="revealField">
                            <p><b>IBAN:</b></p>
                            ${student.alumno.iban}
                        </div>
                        <p><b>Comentarios médicos:</b></p>
                        <p>${student.alumno.comentariosMedicos}</p>
                    </div>
                    <div class="scrollspySection" id="SDVCourses">
                        <h3>Cursos y bonos</h3>
                        ${buildCoursesTable()}
                    </div>
                    <div class="scrollspySection" id="SDVPayments">
                        <h3>Pagos</h3>
                        <table class="styledData">
                            <thead>    
                                <tr>
                                    <td>Curso asociado</td>
                                    <td>Fecha</td>
                                    <td>Cantidad</td>
                                </tr>
                            </thead>
                            <tr>
                                <td>Intensivo de inglés</td>
                                <td>02/2025</td>
                                <td>65.00€</td>
                            </tr>
                            <tr>
                                <td>Intensivo de inglés</td>
                                <td>03/2025</td>
                                <td>65.00€</td>
                            </tr>
                        </table>
                    </div>
                    <div class="scrollspySection" id="SDVEmergencies">
                        <h3>Contactos de emergencia</h3>
                        <table class="styledData">
                            <thead>    
                                <tr>
                                    <td>Nombre</td>
                                    <td>Relación</td>
                                    <td>Teléfono</td>
                                </tr>
                            </thead>
                            <tr>
                                <td>Carmen Ramírez</td>
                                <td>Hermana</td>
                                <td>645 24 35 46</td>
                            </tr>
                            <tr>
                                <td>Carmen Ramírez</td>
                                <td>Hermana</td>
                                <td>645 24 35 46</td>
                            </tr>
                        </table>
                    </div>
                    <div class="scrollspySection" id="SDVGuardian">
                        <h3>Responsable legal</h3>
                        <div class="flex">
                            <table class="camo">
                                <tr>
                                    <td>Nombre:</td>
                                    <td>Joaquín González Sánchez de Diego</td>
                                </tr>
                                <tr>
                                    <td>DNI:</td>
                                    <td>12345678A</td>
                                </tr>
                                <tr>
                                    <td>Teléfono:</td>
                                    <td>644 26 53 64</td>
                                </tr>
                                <tr>
                                    <td>Email:</td>
                                    <td>hola@eskai.es</td>
                                </tr>
                            </table>
                            <table class="camo">
                                <tr>
                                    <td>Dirección:</td>
                                    <td>Calle Periodista Francisco de Paula Terrón nº5 4ºD</td>
                                </tr>
                                <tr>
                                    <td>CP:</td>
                                    <td>18001</td>
                                </tr>
                                <tr>
                                    <td>Localidad:</td>
                                    <td>Granada, Esoaña</td>
                                </tr>
                            </table>
                        </div>
                        <div class="revealField">
                            <p><b>IBAN:</b></p>
                            <input type="password" id="IBANField2" value="ES12 7586 9453 4953 2934" readonly>
                            <button id="IBANButton2" class="mini" onclick="toggleIBAN2()">Mostrar</button>
                        </div>
                    </div>
                    <div class="scrollspySection" id="SDVGuardian">
                        <h3>Amigos y familiares</h3>
                    </div>
                </div>
            </div>
        </div>`

    document.querySelector('body').appendChild(div);

    startScrollSpy();
}

function formatObjectData(student) {
    // Gestionamos los datos nulos
    if(student.alumno.comentariosMedicos == null) student.alumno.comentariosMedicos = 'Este alumno no tiene anotaciones médicas.';
    if(student.alumno.dni == null) student.alumno.dni = '';
    if(student.alumno.telefono == null) student.alumno.telefono = '';
    if(student.alumno.email == null) student.alumno.email = '';
    if(student.alumno.direccion == null) student.alumno.direccion = '';
    if(student.alumno.localidad == null) student.alumno.localidad = '';
    if(student.alumno.cp == null) student.alumno.cp = '';

    // Damos formato a los datos que lo necesitan
    student.alumno.fechaInclusion = student.alumno.fechaInclusion.split('-').reverse().join('/');

    // Montamos el IBAN
    if (student.alumno.iban == null) {
        student.alumno.iban = '<input type="text" id="IBANField" value="" readonly></input>'
    } else {
        student.alumno.iban = student.alumno.iban.replace(/(.{4})/g, '$1 ').trim();
        student.alumno.iban = `<input type="password" id="IBANField" value="${student.alumno.iban}" readonly><button id="IBANButton" class="mini" onclick="toggleIBAN()">Mostrar</button>`;
    }

    return student;
}

function buildCoursesTable(student) {
    
    let table = ''
    // IF coursos == 0 
    // table = empty state

    // ELSE
    table += `<table class="styledData"><thead><tr><td>Cursos en los que está inscrito</td><td>Horario</td></tr></thead>`;
    // FOR EACH course += <tr><td>Course</td><td>Schedule</td> </tr>
    table += '</table>'

    return table;
}

function doTabBar() {
    return `<div class="tabs-scrollspy">
                    <a href="#SDVData">
                        <img src="./img/contactInfo.png" alt="Información y datos del alumno">
                        <span>Datos</span>
                    </a>
                    <a href="#SDVCourses">
                        <img src="./img/education.png" alt="Cursos y bonos">
                        <span>Cursos y bonos</span>
                    </a>
                    <a href="#SDVPayments">
                        <img src="./img/payments.png" alt="Pagos">
                        <span>Pagos</span>
                    </a>
                    <a href="#SDVEmergencies">
                        <img src="./img/emergencyContact.png" alt="Contactos de emergencia">
                        <span>Emergencias</span>
                    </a>
                    <a href="#SDVGuardian">
                        <img src="./img/minor.png" alt="Responsable legal">
                        <span>Responsable legal</span>
                    </a>
                    <a href="#SDVFriends">
                        <img src="./img/minor.png" alt="Amigos">
                        <span>Amigos</span>
                    </a>
                </div>`;
}

function buildPaymentsTable(student) {

}

function buildContactsTable(student) {

}

function doGuardianTab(student) {
    
}

function buildGuardianTable(student) {

}