<!DOCTYPE html>
<html lang="en">
<head>
    <?php include './components/htmlHead.php'; ?>
</head>
<body>
    <div id="app">
        <?php include './components/navView.php'; ?>
        <main>
            <header>
                <h1>Alumnos</h1>
                <button class="cta">
                    <?php include './img/addStudent.svg'; ?>
                    Nuevo alumno
                </button>
            </header>

            <!-- Caja de búsqueda -->
            <div class="card full">
                <h2>Buscar alumnos</h2>
                <form action='<?php echo $_SERVER["PHP_SELF"]?>' method="get" id="searchBar">
                    <label for="a_nombre">Nombre:</label>
                    <input type="text" id="a_nombre" name="a_nombre">
                    <label for="a_apellidos">Apellidos:</label>
                    <input type="text" id="a_apellidos" name="a_apellidos">
                    <label for="a_mail">Email:</label>
                    <input type="text" id="a_mail" name="a_mail">
                    <div class="full subGrid">
                        <label for="a_dni">DNI:</label>
                        <input type="text" id="a_dni" name="a_dni">
                        <label for="a_tel">Teléfono:</label>
                        <input type="text" id="a_tel" name="a_tel">
                    </div>
                    <div class="full center">
                        <button type="submit" class="cta">
                            <?php include './img/search.svg' ?>
                            Buscar
                        </button>
                    </div>
                </form>
            </div>

            <!-- Tabla de resultados -->
            <div class="card full">
                <?php include './resources/studentSearch.php' ?>
            </div>

            <div class="modal studentData" id="studentDataModal">
                <div>
                    <div class="header">
                        <div>
                            <p>Alumno 001 - Inscrito el 13/04/2025</p>
                            <h2>Eskai García Alcántara  </h2>
                            <p><span>Mayor de edad</span> <span>Amonestado</span> <span>Comentarios médicos</span></p>
                        </div>
                        <p onclick="deleteDetailsModal()">[X]</p>
                    </div>

                    <div class="body">
                        <div class="tabs vertical">
                            <button>
                                <img src="./img/contactInfo.png" alt="Información y datos del alumno">
                                <span>Datos</span>
                            </button>
                            <button>
                                <img src="./img/education.png" alt="Cursos y bonos">
                                <span>Cursos y bonos</span>
                            </button>
                            <button>
                                <img src="./img/payments.png" alt="Pagos">
                                <span>Pagos</span>
                            </button>
                            <button>
                                <img src="./img/emergencyContact.png" alt="Contactos de emergencia">
                                <span>Emergencias</span>
                            </button>
                            <button>
                                <img src="./img/minor.png" alt="Responsable legal">
                                <span>Responsable legal</span>
                            </button>
                        </div>
                        <div id="studentDataView">
                            <div id="SDVData">
                                <h3>Datos</h3>
                                <div class="flex">
                                    <table class="camo">
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
                                    <input type="password" id="IBANField" value="ES12 7586 9453 4953 2934" readonly>
                                    <button id="IBANButton" class="mini" onclick="toggleIBAN()">Mostrar</button>
                                </div>
                                <p><b>Comentarios médicos:</b></p>
                                <p id="comentariosMedicos">Este alumno no tiene anotaciones médicas.</p>
                            </div>
                            <div id="SDVCourses">
                                <h3>Cursos y bonos</h3>
                                <table class="styledData">
                                    <thead>    
                                        <tr>
                                            <td>Cursos en los que está inscrito</td>
                                            <td>Horario</td>
                                        </tr>
                                    </thead>
                                    <tr>
                                        <td>Intensivo de inglés</td>
                                        <td>L 9:15, M 9:15</td>
                                    </tr>
                                </table>
                            </div>
                            <div id="SDVPayments">
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
                            <div id="SDVEmergencies">
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
                            <div id="SDVGuardian">
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
                                    <input type="password" id="IBANField" value="ES12 7586 9453 4953 2934" readonly>
                                    <button id="IBANButton" class="mini" onclick="toggleIBAN()">Mostrar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <script src="./resources/studentDetails.js"></script>
            
        </main>
    </div>
</body>
</html>