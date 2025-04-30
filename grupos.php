<!DOCTYPE html>
<html lang="es">
<head>
    <?php include './components/htmlHead.php'; ?>
</head>
<body>
    <div id="app">
        <?php include './components/navView.php'; ?>
        <main>
            <header>
                <h1>Grupos</h1>
                <button onclick="window.location.href='añadir_grupos.php'" class="cta">Nuevo grupo</button>
            </header>

            <div class="card full">
                <h2>Buscar grupos</h2>
                <form action='<?php echo $_SERVER["PHP_SELF"]?>' method="get" id="searchBar">
                    <label for="nombre">Nombre:</label>
                    <input type="text" id="nombre" name="nombre">

                    <label for="asignatura">Asignatura:</label>
                    <input type="text" id="asignatura" name="asignatura">

                    <div class="full subGrid">
                        <div class="full subGrid">
                                <label for="precio">Precio min:</label>
                                <input class="mini" type="number" id="precio" name="precio" step="any" value="0">

                                <label for="precio">Precio max:</label>
                                <input class="mini" type="number" id="precio" name="precio" step="any" value="200">
                        </div>

                        <label for="modalidad">Modalidad:</label>
                        <select id="modalidad" name="modalidad">
                            <option value="">Cualquier modalidad</option>
                            <option value="presencial">Presencial</option>
                            <option value="online">Online</option>
                            <option value="hibrido">Híbrido</option>
                        </select>
                    </div>
                    

                    <div class="full subGrid">
                        <label for="horasSemanales">Hrs/semana:</label>
                        <input type="number" id="horasSemanales" name="horasSemanales" step="0.5" min="0" max="10">

                        <label for="esIntensivo">Intensivo: </label>
                        <select id="esIntensivo" name="esIntensivo">
                            <option value="">Cualquiera</option>
                            <option value="1">Intensivos</option>
                            <option value="0">No intensivos</option>
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

            <div class="card full">
                <?php include './resources/grupos/groupSearch.php' ?>
            </div>

            <script src="./resources/scrollspy.js"></script>
        </main>
    </div>
</body>
</html>
