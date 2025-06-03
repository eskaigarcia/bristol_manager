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
                        <div class="full center gap-md">
                            <button type="submit" class="cta">
                                <?php include './img/search.svg' ?>
                                Limpiar búsqueda
                            </button>
                            <button type="submit" class="cta">
                                <?php include './img/search.svg' ?>
                                Buscar
                            </button>
                        </div>
                    </form>
                </div>
            <div class="card full"><?php include 'resources/profesores/teachersearch.php' ?></div>
        </main>
    </div>

    <script src="./resources/profesores/newTeacher.js"></script>
    <script src="./resources/profesores/teacherStatsBuild.js"></script>
    <script src="./resources/scrollspy.js"></script>
</body>
</html>