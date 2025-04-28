<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <?php 
    include "components/htmlHead.php";
    ?>

</head>
<body>
<div id="app">
        <?php include './components/navView.php'; ?>
        <main>
            <header>
                <h1>Profesor</h1>
                <button class="cta" onclick="window.location.href='../bristol_alumnos/annadir_profesor.php' ">
                    Nuevo profesor
                </button>
            </header>
                <div class="card full">
                    <h2>Buscar maestro</h2>
                    <form id="searchBar">
                        <label for="prof_nombre">Nombre:</label>
                            <input type="text" id="prof_nombre" name="prof_nombre">
                        <label for="prof_apellidos">Apellidos:</label>
                            <input type="text" id="prof_apellidos" name="prof_apellidos">
                        <label for="prof_Grupos">Grupo:</label>
                            <input type="text" id="prof_Grupo" name="prof_Grupo">
                        <label for="prof_dni">Asignatura:</label>
                            <input type="text" id="prof_asignatura" name="prof_asignatura">
                    <div class="full center">
                        <button type="submit" class="cta">
                            <?php include './img/search.svg' ?>
                            Buscar
                        </button>
                    </div>
                    <div class="card full"><?php include 'resources/teachersearch.php' ?></div>
            </form>
        </main>
    </div>
</body>
</html>