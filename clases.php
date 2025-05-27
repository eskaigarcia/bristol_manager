<!DOCTYPE html>
<html lang="en">
<head>
    <?php include "components/htmlHead.php"; ?>
</head>
<body>
    <div id="app">
        <?php include './components/navView.php'; ?>
        <main>
            <header>
                <h1>Clases particulares</h1>
                <button onclick="createTeacher()" class="cta">
                    <?php include './img/addTeacher.svg'; ?>
                    Nuevo profesor
                </button>
            </header>

                <div class="card full">
                <h2>Buscar grupos</h2>
                <form action='<?php echo $_SERVER["PHP_SELF"]?>' method="get" id="searchBar">
                    <label for="profesor">Profesor:</label>
                    <select id="profesor" name="profesor"></select>
                    
                    <label for="nombre">Alumno:</label>
                    <input type="text" id="nombre" name="nombre">

                    <div class="full subGrid">
                        <div class="full subGrid">
                            <label for="precio_min">Precio min:</label>
                            <input class="mini" type="number" id="precio_min" name="precio_min" step="any" value="0">
                            
                            <label for="precio_max">Precio max:</label>
                            <input class="mini" type="number" id="precio_max" name="precio_max" step="any" value="200">
                        </div>
                        <label for="modalidad">Modalidad:</label>
                        <select id="modalidad" name="modalidad">
                            <option value="">Cualquier modalidad</option>
                            <option value="presencial">Presencial</option>
                            <option value="online">Online</option>
                            <option value="hibrido">Híbrido</option>
                        </select>
                    </div>
                    <div class="full center">
                        <button type="submit" class="cta">
                            <?php include './img/search.svg' ?>
                            Buscar
                        </button>
                    </div>
                </form>
            </div>

            <div class="card full"><!-- php include 'resources/payroll/teachersearch.php' ?--></div>
        </main>
    </div>

    <script src="./resources/payroll/newTeacher.js"></script>
    <script src="./resources/payroll/teacherStatsBuild.js"></script>
    <script src="./resources/scrollspy.js"></script>
</body>
</html>