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
                <!-- <button onclick="createFriend()" class="cta">
                    <?php include './img/addFriend.svg'; ?>
                    Nuevo amigo
                </button> -->
            </header>

            <div class="card full">
                <h2>Buscar amigos</h2>
                <form action='<?php echo $_SERVER["PHP_SELF"]?>' method="get" id="searchBar">
                    <!-- Filtro de nombre -->
                    <label for="nombre">Nombre:</label>
                    <input type="text" id="nombre" name="nombre">

                    <!-- Filtro de tipo de relación -->
                    <label for="tipo_relacion">Tipo de relación:</label>
                    <select id="tipo_relacion" name="tipo_relacion">
                        <option value="amigos">Amigos</option>
                        <option value="familia">Familia</option>
                    </select>

                    <!-- Filtro de estado activo -->
                    <label for="activo">Estado:</label>
                    <select id="activo" name="activo">
                        <option value="1">Activo</option>
                        <option value="0">Inactivo</option>
                    </select>

                    <div class="full center">
                        <button type="submit" class="cta">
                            <?php include './img/search.svg' ?>
                            Buscar
                        </button>
                    </div>
                </form>
            </div>

            <div class="card full">
                <?php include './relaciones/friendSearch.php' ?>
            </div>

            <script src="./resources/relaciones/newFriend.js"></script>
            <script src="./resources/relaciones/getFriendSelector.js"></script>
            <script src="./resources/relaciones/friendDetailsBuild.js"></script>
            <script src="./resources/scrollspy.js"></script>
        </main>
    </div>
</body>
</html>
