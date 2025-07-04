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
                <h1>Amigos</h1>
                <button onclick="createFriend()" class="cta">
                    <?php include './img/addStudent.svg'; ?>
                    Nueva relación
                </button>
            </header>

            <div class="card full">
                <h2>Buscar amigos</h2>
                <form action='<?php echo $_SERVER["PHP_SELF"]?>' method="get" id="searchBar">
                    <label for="nombre">Nombre:</label>
                    <input type="text" id="nombre" name="nombre" value="<?php echo htmlspecialchars($_GET['nombre'] ?? ''); ?>">

                    <label for="tipo_relacion">Tipo de relación:</label>
                    <select id="tipo_relacion" name="tipo_relacion">
    <option value="cualquiera" <?php echo ($_GET['tipo_relacion'] ?? '') == 'cualquiera' ? 'selected' : ''; ?>>Cualquiera</option>
    <option value="amigo" <?php echo ($_GET['tipo_relacion'] ?? '') == 'amigo' ? 'selected' : ''; ?>>Amigos</option>
    <option value="familiar" <?php echo ($_GET['tipo_relacion'] ?? '') == 'familiar' ? 'selected' : ''; ?>>Familia</option>
</select>

                    <label for="activo">Estado:</label>
                    <select id="activo" name="activo">
                        <option value="cualquiera" <?php echo ($_GET['activo'] ?? '') == 'cualquiera' ? 'selected' : ''; ?>>Cualquiera</option>
                        <option value="1" <?php echo ($_GET['activo'] ?? '') == '1' ? 'selected' : ''; ?>>Activo</option>
                        <option value="0" <?php echo ($_GET['activo'] ?? '') == '0' ? 'selected' : ''; ?>>Inactivo</option>
                    </select>

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
                <?php include './resources/relaciones/friendSearch.php'; ?>
            </div>

            <script src="./resources/relaciones/newFriend.js"></script>
            <script src="./resources/relaciones/friendDetailsBuild.js"></script>
            <script src="./resources/scrollspy.js"></script>
        </main>
    </div>
</body>
</html>
