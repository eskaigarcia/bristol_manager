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
                <h1>Profesor</h1>
                <button class="cta" onclick="createTeacher()">
                    Nuevo profesor
                </button>
            </header>
                <div class="card full">
                    <h2>Buscar maestro</h2>
                    <form id="searchBar" method="POST">
                        <label for="prof_nombre">Nombre:</label>
                            <input type="text" id="prof_nombre" name="prof_nombre">
                        <label for="prof_grupos">grupos:</label>
                            <input type="text" id="prof_grupos" name="prof_grupos">
                        <label for="prof_partiulares">particulares:</label>
                            <input type="text" id="prof_particulares" name="prof_particulares">
                        <label for="prof_alumnos">Alumnos:</label>
                            <input type="text" id="prof_alumnos" name="prof_alumnos"> 
                        <div class="full center">
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
</body>
</html>