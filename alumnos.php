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

            <div class="modal studentData">
                <div>
                    <div class="header">
                        <div>
                            <p>Alumno 001 - Inscrito el 13/04/2025</p>
                            <h2>Eskai García Alcántara  </h2>
                            <p><span>Mayor de edad</span> <span>Amonestado</span> <span>Comentarios médicos</span></p>
                        </div>
                        <p>[X]</p>
                    </div>

                    <div class="body">
                        <div class="tabs">
                            <button>
                                <img src="./img/contactInfo.png" alt="Información de contacto">
                                <span>Información</span>
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

                        </div>
                    </div>
                </div>
            </div>

            <script src="./resources/getStudentDetails.js"></script>
            
        </main>
    </div>
</body>
</html>