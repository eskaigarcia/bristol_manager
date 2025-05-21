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
                <h1>Profesores</h1>
                <button onclick="createTeacher()" class="cta">
                    <?php include './img/addTeacher.svg'; ?>
                    Nuevo profesor
                </button>
            </header>

                <div class="card full">
                    <h2>Buscar maestro</h2>
                    <form id="searchBar" method="POST">
                        <label for="prof_nombre">Profesor:</label>
                            <input type="text" id="prof_nombre" name="prof_nombre">
                        <label for="prof_grupos">Grupo:</label>
                            <input type="text" id="prof_grupos" name="prof_grupos">
                        <label for="prof_alumnos">Alumno:</label>
                            <input type="text" id="prof_alumnos" name="prof_alumnos"> 
                        <div class="full center">
                            <button type="submit" class="cta">
                                <?php include './img/search.svg' ?>
                                Buscar
                            </button>
                        </div>
                    </form>
                </div>
            <div class="card full"><?php include 'resources/payroll/teachersearch.php' ?></div>
        </main>
    </div>

    <script src="./resources/payroll/newTeacher.js"></script>
    <script src="./resources/payroll/teacherStatsBuild.js"></script>
</body>
</html>