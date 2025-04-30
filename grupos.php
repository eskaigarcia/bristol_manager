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
                    <label for="g_nombre">Nombre:</label>
                    <input type="text" id="g_nombre" name="g_nombre">

                    <label for="g_asignatura">Asignatura:</label>
                    <input type="text" id="g_asignatura" name="g_asignatura">

                    <div class="full subGrid">
                        <label for="g_modalidad">Modalidad:</label>
                        <select id="g_modalidad" name="g_modalidad">
                            <option value="">Selecciona modalidad</option>
                            <option value="presencial">Presencial</option>
                            <option value="online">Online</option>
                            <option value="hibrido">Híbrido</option>
                        </select>

                        <label for="g_precio">Precio:</label>
                        <input type="number" id="g_precio" name="g_precio" step="any">
                    </div>
                    

                    <div class="full subGrid">
                        <label for="g_horasSemanales">H. semanales:</label>
                        <input type="number" id="g_horasSemanales" name="g_horasSemanales" step="0.5">

                        <label for="g_esIntensivo">Intensivo: </label>
                        <select id="g_esIntensivo" name="g_esIntensivo">
                            <option value="">--Seleccionar--</option>
                            <option value="1">Sí</option>
                            <option value="0">No</option>
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
