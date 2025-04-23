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
                <button class="cta">
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
                        <label for="prof_Grupos">Grupos:</label>
                            <input type="text" id="prof_Grupos" name="prof_Grupos">
                        <label for="prof_dni">Asignatura:</label>
                            <input type="text" id="prof_dni" name="prof_dni">
                         <label for="prof_Activo">Activo:</label><!--ahora lo cambio a radio button -->
                            <input type="text" id="prof_Activo" name="prof_Activo">
                            <!--<h2>Buscar por alumno</h2>
                    <div class="full subGrid">
                        
                        <label for="prof_Activo">Nombre:</label>
                            <input type="text" id="prof_Activo" name="prof_Activo">
                        <label for="prof_tel">Apellido:</label>
                            <input type="text" id="prof_tel" name="prof_tel">
                    </div>
-->
                    <div class="full center">
                        <button type="submit" class="cta">
                            <?php include './img/search.svg' ?>
                            Buscar
                        </button>
                    </div>
            </form>
        </main>
    </div>
</body>
</html>