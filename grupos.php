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
                <button onclick="createGroup()" class="cta">
                    <?php include './img/addGroup.svg'; ?>
                    Nuevo grupo
                </button>
            </header>

            <div class="card full">
                <h2>Buscar grupos</h2>
                <form action='<?php echo $_SERVER["PHP_SELF"]?>' method="get" id="searchBar">
                    <label for="nombre">Nombre:</label>
                    <input type="text" id="nombre" name="nombre">

                    <label for="profesor">Profesor:</label>
                    <select id="profesor" name="profesor"></select>

                    <div class="full subGrid">
                        <div class="full subGrid">
                                <label for="precio_min">Precio min:</label>
                                <input class="mini" type="number" id="precio_min" name="precio_min" step="any" value="0">

                                <label for="precio_max">Precio max:</label>
                                <input class="mini" type="number" id="precio_max" name="precio_max" step="any" value="200">
                        </div>

                        <div class="full subGrid">
                            <label for="horasSemanales">Hrs/semana:</label>
                            <input type="number" id="horasSemanales" name="horasSemanales" step="0.5" min="0" max="10">
                            
                            <label for="curso">Año:</label>
                            <input type="number" id="curso" name="curso" step="1" min="2020" max="2100">
                        </div>
                        
                    </div>
                    

                    <div class="full subGrid">
                        <label for="modalidad">Modalidad:</label>
                        <select id="modalidad" name="modalidad">
                            <option value="">Cualquier modalidad</option>
                            <option value="presencial">Presencial</option>
                            <option value="online">Online</option>
                            <option value="hibrido">Híbrido</option>
                        </select>
                            
                        <label for="esIntensivo">Intensivo: </label>
                        <select id="esIntensivo" name="esIntensivo">
                            <option value="">Cualquiera</option>
                            <option value="1">Intensivos</option>
                            <option value="0">No intensivos</option>
                        </select>
                    </div>

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

            <div class="card full">
                <?php include './resources/grupos/groupSearch.php' ?>
            </div>

            <script src="./resources/grupos/newGroup.js"></script>
            <script src="./resources/grupos/getTeacherSelector.js"></script>
            <script src="./resources/grupos/groupDetailsBuild.js"></script>
            <script src="./resources/scrollspy.js"></script>
        </main>
    </div>
</body>
</html>
