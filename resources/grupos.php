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
                <a href="añadir_grupos.php" class="cta">
                Nuevo grupo
                </a>

            </header>

            <!-- Caja de búsqueda -->
            <div class="card full">
                <h2>Buscar grupos</h2>
                <form action='<?php echo $_SERVER["PHP_SELF"]?>' method="get" id="searchBar">
                    <label for="g_nombre">Nombre:</label>
                    <input type="text" id="g_nombre" name="g_nombre">

                    <label for="g_asignatura">Asignatura:</label>
                    <input type="text" id="g_asignatura" name="g_asignatura">

                    <label for="g_modalidad">Modalidad:</label>
                    <input type="text" id="g_modalidad" name="g_modalidad">

                    <label for="g_precio">Precio:</label>
                    <input type="number" id="g_precio" name="g_precio" step="any">

                    <div class="full subGrid">
                        <label for="g_horasSemanales">Horas semanales:</label>
                        <input type="number" id="g_horasSemanales" name="g_horasSemanales" step="0.5">

                        <label for="g_esActivo">Activo:</label>
                        <select id="g_esActivo" name="g_esActivo">
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

            <!-- Tabla de resultados -->
            <div class="card full">
                <?php include './resources/groupSearch.php' ?>
            </div>

            <script src="./resources/groupDetails.js"></script>
            <script src="./resources/scrollspy.js"></script>
            
        </main>
    </div>
</body>
</html>
