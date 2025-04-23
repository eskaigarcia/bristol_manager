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
                <button class="cta" onclick="createStudent()">
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
                <?php include './resources/alumnos/studentSearch.php' ?>
            </div>

            <script src="./resources/alumnos/studentDetailsBuild.js"></script>
            <script src="./resources/alumnos/studentDetailsEdit.js"></script>
            <script src="./resources/alumnos/newStudent.js"></script>
            <script src="./resources/scrollspy.js"></script>
            
        </main>
    </div>
</body>
</html>