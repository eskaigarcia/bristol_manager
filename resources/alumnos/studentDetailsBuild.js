function getStudentDetails(id) {
    fetch(`./resources/alumnos/getStudentDetails.php?id=${id}`)
        .then(response => {
            if (!response.ok) throw new Error("Alumno no encontrado")
            return response.json();
        })
        .then(data => displayStudentDetails(data))
        // .catch(error => console.error("Error:", error.message));
}

function displayStudentDetails(student) {
    console.log(student) // debugging the object

    // Update active student in a global variable
    storage.activeStudent = student.alumno.id_alumno;
    storage.studentData = student;

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
                    <div class="spaced-items-sm">${buildChips(student.alumno)}</div>
                </div>
                <img onclick="removeDetailsModal()" class="iconButton" src="./img/close.png" alt="Cerrar">
            </div>

            <div class="body">
                ${doTabBar()}
                <div id="studentDataView">
                    <div class="scrollspySection" id="SDVData">
                        ${buildStudentData(student.alumno)}
                    </div>
                    <div class="scrollspySection" id="SDVCourses">
                        ${buildCoursesTable(student.groups)}
                    </div>
                    <div class="scrollspySection" id="SDVBonos">
                        ${buildVouchersTable(student.vouchers)}
                    </div>
                    <div class="scrollspySection" id="SDVClases">
                        ${buildClassesTable(student)}
                    </div>
                    <div class="scrollspySection" id="SDVPayments">
                        ${buildPaymentsTable(student.payments)}
                    </div>
                    <div class="scrollspySection" id="SDVEmergencies">
                        ${buildEmgContacts(student.contacts)}
                    </div>
                    <div class="scrollspySection" id="SDVGuardian">
                        ${buildGuardianInfo(student.guardian, student.alumno.esAdulto)}
                    </div>
                    <div class="scrollspySection" id="SDVFriends">
                        ${buildRelations(student.relations, student.alumno)}
                    </div>
                </div>
            </div>
        </div>`

    document.querySelector('body').appendChild(div);

    startScrollSpy();
}

function formatObjectData(student) {
    // FORMATEAMOS EL ALUMNO
    // Gestionamos los datos nulos
    if(student.alumno.dni == null) student.alumno.dni = '';
    if(student.alumno.telefono == null) student.alumno.telefono = '';
    if(student.alumno.email == null) student.alumno.email = '';
    if(student.alumno.direccion == null) student.alumno.direccion = '';
    if(student.alumno.localidad == null) student.alumno.localidad = '';
    if(student.alumno.cp == null) student.alumno.cp = '';

    // Damos formato a los datos que lo necesitan
    student.alumno.fechaInclusion = _ex.format.date(student.alumno.fechaInclusion);

    // REPETIMOS CON EL GUARDIAN (IF EXISITS)
    if(student.guardian != null) {
        // Gestionamos los datos nulos
        if(student.guardian.dni == null) student.guardian.dni = '';
        if(student.guardian.telefono == null) student.guardian.telefono = '';
        if(student.guardian.email == null) student.guardian.email = '';
        if(student.guardian.direccion == null) student.guardian.direccion = '';
        if(student.guardian.localidad == null) student.guardian.localidad = '';
        if(student.guardian.cp == null) student.guardian.cp = '';
    }

    return student;
}

function buildChips(student) {
    let chips = ''
    chips += (student.esAdulto == 0) ? '<span class="chip warn">Menor de edad</span>' : '<span class="chip">Mayor de edad</span>';
    chips += (student.esAmonestado == 1) ? '<span class="chip warn">Amonestado</span>' : '';
    chips += (student.comentariosMedicos != null) ? '<span class="chip warn">Tiene anotaciones médicas</span>' : '';
    return chips;
}

function buildIBANField(iban, isGuardian = false) {
    let id = isGuardian ? 'IBANField2' : 'IBANField' ;
    let bid = isGuardian ? 'IBANButton2' : 'IBANButton' ; 
    let fun = isGuardian ? 'toggleIBAN2' : 'toggleIBAN' ; 
    
    if (iban == null) {
        return `<input type="text" id="${id}" value="No proporcionado" readonly></input>`
    } else {
        let temp = _ex.format.iban(iban);
        return `<input type="password" id="${id}" value="${temp}" readonly><button id="${bid}" class="mini" onclick="${fun}()">Mostrar</button>`;
    }
}

function doTabBar() {
    return `<div class="tabs-scrollspy">
                    <a href="#SDVData">
                        <img src="./img/contactInfo.png" alt="Información y datos del alumno">
                        <span>Datos</span>
                    </a>
                    <a href="#SDVCourses">
                        <img src="./img/education.png" alt="Cursos">
                        <span>Cursos</span>
                    </a>
                    <a href="#SDVBonos">
                        <img src="./img/bonos.png" alt="Bonos">
                        <span>Bonos</span>
                    </a>
                    <a href="#SDVClases">
                        <img src="./img/clases.png" alt="Clases">
                        <span>Clases ind.</span>
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
                        <img src="./img/guardian.png" alt="Responsable legal">
                        <span>Resp. legal</span>
                    </a>
                    <a href="#SDVFriends">
                        <img src="./img/group.png" alt="Amigos">
                        <span>Amigos</span>
                    </a>
                </div>`;
}

function buildStudentData(student) {
    return `
    <div class="flex clear-between">
        <h3>Datos personales</h3>
        <button class="outlined" onclick="triggerEdit.mainDetails()">Modificar datos</button>
    </div>
    <div class="flex">
        <table class="camo">
            <tr>
                <td>DNI:</td>
                <td>${student.dni}</td>
            </tr>
            <tr>
                <td>Teléfono:</td>
                <td>${_ex.format.phoneNum(student.telefono)}</td>
            </tr>
            <tr>
                <td>Email:</td>
                <td>${student.email}</td>
            </tr>
            <tr>
                <td>Dirección:</td>
                <td>${student.direccion}</td>
            </tr>
            <tr>
                <td>Código postal:</td>
                <td>${student.cp}</td>
            </tr>
            <tr>
                <td>Localidad:</td>
                <td>${student.localidad}</td>
            </tr>
        </table>
        <div id="quickNotes">
            <h4>Notas rápidas:</h4>
            <textarea oninput="quickNotes.trigger()">${(student.notasRapidas == null) ? '' : student.notasRapidas}</textarea>
            <div class="hidden flex clear-between">
                <button onclick="quickNotes.discard()">Descartar</button>
                <button onclick="quickNotes.save()">Guardar cambios</button>
            </div>
        </div>
    </div>
    <div class="revealField">
        <p><b>IBAN:</b></p>
        ${buildIBANField(student.iban)}
    </div>
    <p><b>Comentarios médicos:</b></p>
    <p>${(student.comentariosMedicos == null) ? 'Este alumno no tiene notas médicas' : student.comentariosMedicos}</p>`;
}

function buildCoursesTable(groups) {
    if (groups == null || groups.length === 0) return `
    <h3>Cursos</h3>
    <div class="emptyState-icon">
        <img src="./img/es-enroll.png">
        <div>
            <p>Ningun curso activo</p>
            <button>Apuntar a grupo</button>
        </div>
    </div>`;
    
    let table = `<div class="flex clear-between">
        <h3>Historial de pagos</h3>
        <button class="outlined">Añadir a un curso</button>
    </div>`
    table += `
    <table class="styledData">
        <thead>
            <tr>
                <td>Curso</td>
                <td>Horario</td>
                <td>Modalidad</td>
                <td>Precio</td>
            </tr>
        </thead>`;

    for (i in groups) {
        table += `
        <tr>
            <td>${groups[i].nombre}</td>
            <td></td>
            <td>${groups[i].modalidad}</td>
            <td>${_ex.format.money(groups[i].precio)}</td>
        </tr>`
    }

    table += '</table>'

    return table;
}

function buildVouchersTable(vouchers) {
    if (vouchers == null || vouchers.length === 0) return `
    <h3>Bonos</h3>
    <div class="emptyState-icon">
        <img src="./img/es-bonos.png">
        <div>
            <p>Sin bonos</p>
            <button>Nuevo bono</button>
        </div>
    </div>`;
    
    let table = `<div class="flex clear-between">
        <h3>Bonos</h3>
        <button class="outlined">Nuevo bono</button>
    </div>`;

    table += `
    <table class="styledData">
        <thead>
            <tr>
                <td>Clases disponibles</td>
                <td>Transferible</td>
                <td>Fecha de compra</td>
                <td>Caducidad</td>
            </tr>
        </thead>`;

    for (i in vouchers) {
        table += `
        <tr>
            <td>${parseInt(vouchers[i].cantidadClases) - parseInt(vouchers[i].used_classes)}/${vouchers[i].cantidadClases}</td>
            <td>${(vouchers[i].esTransferido == 0) ? 'Si' : 'No'}</td>
            <td>${_ex.format.date(vouchers[i].fechaPago)}</td>
            <td>${_ex.format.date(vouchers[i].caducidad)}</td>
        </tr>`;
    }

    table += '</table>'

    return table;
}

function buildClassesTable(classes) {
    if (classes == null || classes.length === 0 || 0 == 0) return `
    <h3>Clases individuales</h3>
    <div class="emptyState-icon">
        <img src="./img/es-classes.png">
        <div>
            <p>Sin clases individuales pendientes</p>
            <button>Nueva clase</button>
        </div>
    </div>`;
    
    let table = `<div class="flex clear-between">
        <h3>Clases individuales</h3>
        <button class="outlined">Nueva clase</button>
    </div>`
    table += `
    <table class="styledData">
        <thead>
            <tr>
                <td>Profesor</td>
                <td>Temática</td>
                <td>Modalidad</td>
                <td>Inicio</td>
                <td>Fin</td>
            </tr>
        </thead>`;

    for (i in classes) {
        table += `
        <tr>
            
        </tr>`
    }

    table += '</table>'

    return table;
}

function buildPaymentsTable(payments) {
    if (payments == null || payments.length === 0) return `
    <h3>Historial de pagos</h3>
    <div class="emptyState-icon">
        <img src="./img/es-payments.png">
        <div>
            <p>Ningun pago registrado o pendiente</p>
            <button>Relizar un cobro</button>
        </div>
    </div>`;

    let table = `
    <div class="flex clear-between">
        <h3>Historial de pagos</h3>
        <button class="outlined">Nuevo cobro</button>
    </div>
    <table class="styledData">
        <thead>    
            <tr>
                <td>State</td>
                <td>Curso</td>
                <td>Mensualidad</td>
                <td>Fecha del pago</td>
                <td>Método</td>
                <td>Total</td>
            </tr>
        </thead>`;
                    
    // FOR EACH PAYMENT
    // table += <tr><td>Curso</td><td>Fecha</td><td>Precio</td><td>Método</td></tr>
    for (i in payments) {
        payments[i].precioPagado = payments[i].precioTotal - payments[i].descuentoCalculado - payments[i].descuentoPersonal;

        table += `
        <tr>
            <td>Pagado</td>
            <td>${payments[i].nombre}</td>
            <td>${_ex.format.date(payments[i].fecha, false)}</td>
            <td>${_ex.format.date(payments[i].fechaPago)}</td>
            <td>${payments[i].metodoPago}</td>
            <td>${_ex.format.money(payments[i].precioPagado)}</td>
        </tr>`
    }

    table += '</table>';

    return table
}

function buildEmgContacts(contacts) {
    if (contacts == null || contacts.length === 0) return `
    <h3>Contactos de emergencia</h3>
    <div class="emptyState-icon">
        <img src="./img/es-warn.png">
        <div>
            <p>Ningún contacto de emergencia registrado</p>
            <button>Añadir</button>
        </div>
    </div>`;

    let table = `
    <div class="flex clear-between">
        <h3>Contactos de emergencia</h3>
        <button class="outlined">Modificar contactos de emergencia</button>
    </div>
    <table class="styledData">
                    <thead>    
                        <tr>
                            <td>Nombre</td>
                            <td>Teléfono</td>
                            <td>Relación</td>
                        </tr>
                    </thead>`
                    
    // FOR EACH PAYMENT
    for (i in contacts) {
        table += `
        <tr>
            <td>${contacts[i].nombre}</td>
            <td>${_ex.format.phoneNum(contacts[i].telefono)}</td>
            <td>${contacts[i].relacion}</td>
        </tr>`;
    }

    table += '</table>';

    return table
}

function buildGuardianInfo(guardian, isAdult) {
    let src = (isAdult == 1) ? './img/es-guardian.png ': './img/es-warn.png'
    if (guardian == null) return `
    <h3>Responsable legal</h3>
    <div class="emptyState-icon">
        <img src="${src}">
        <div>
            <p>Ningún responsable legal regsitrado</p>
            <button>Añadir</button>
        </div>
    </div>`;

    return `
    <div class="flex clear-between">
        <h3>Responsable legal</h3>
        <button class="outlined">Modificar responsable legal</button>
    </div>
    <table class="camo">
        <tr>
            <td>Nombre completo:</td>
            <td>${guardian.nombre}, ${guardian.apellidos}</td>
        </tr>
        <tr>
            <td>DNI:</td>
            <td>${guardian.dni}</td>
        </tr>
        <tr>
            <td>Teléfono:</td>
            <td>${_ex.format.phoneNum(guardian.phone)}</td>
        </tr>
        <tr>
            <td>Email:</td>
            <td>${guardian.email}</td>
        </tr>
        <tr>
            <td>Dirección:</td>
            <td>${guardian.direccion}</td>
        </tr>
        <tr>
            <td>Código postal:</td>
            <td>${guardian.cp}</td>
        </tr>
        <tr>
            <td>Localidad:</td>
            <td>${guardian.localidad}</td>
        </tr>
    </table>

    <div class="revealField">
        <p><b>IBAN:</b></p>
        ${buildIBANField(guardian.iban, true)}
    </div>`;
}

function buildRelations(relations, student) {
    if (relations == null || relations.length === 0) return `
    <h3>Amigos y familiares</h3>
    <div class="emptyState-icon">
        <img src="./img/es-group.png">
        <div>
            <p>No se han encontrado amigos o hermanos</p>
            <button>Añadir</button>
        </div>
    </div>`;

    let table = `
    <div class="flex clear-between">
        <h3>Amigos y familiares</h3>
        <button class="outlined">Nueva relación</button>
    </div>
    <table class="styledData">
                    <thead>    
                        <tr>
                            <td>Nombre completo</td>
                            <td>Relación</td>
                            <td>Fecha inicio</td>
                            <td>Estado</td>
                        </tr>
                    </thead>`
                    
    // FOR EACH RELATION
    const mainID = student.id_alumno;
    for (i in relations) {
        // Mostramos siempre el nombre del otro alumno.
        const ID1 = relations[i].a1ID;
        let nombre, apellidos;
        if(mainID == ID1) {
            nombre = relations[i].a2Nombre;
            apellidos = relations[i].a2Apellidos;
        } else {
            nombre = relations[i].a1Nombre;
            apellidos = relations[i].a1Apellidos;
        }

        // Hacemos legible el booleano de estado
        let estado = 'Activa'
        // if (relations[i],tipoRelacion == 'familiar' && CONCURRENT ENRROLLEMENT == false) estado = 'Inactiva'
        if (relations[i].tipoRelacion == 'amigo' && relations[i].esActivo == 0) estado = 'Finalizada'

        table += `
        <tr>
            <td>${nombre} ${apellidos}</td>
            <td>${relations[i].tipoRelacion}</td>
            <td>${_ex.format.date(relations[i].fechaInicio)}</td>
            <td>${estado}</td>
        </tr>`;
    }

    table += '</table>';

    return table;
}