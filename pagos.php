<!DOCTYPE html>
<html lang="en">
<head> 
    <?php include './components/htmlHead.php'; ?>

</head>
<body>
    <div id="app">
        <?php include './components/navView.php'; ?>
        <main>
        <header>
                <h1>Pagos</h1>
                <button class="cta" onclick="createPayment()">
                    <?php include './img/addStudent.svg'; ?>
                    Nuevo cobro
                </button>
            </header>


            <div class="card double stat-singleNum">
                <h2>Pagos pendientes</h2>
                <p><span>✅</span> Todos los pagos al día</p>
                <button>Ir a pagos pendientes</button>
            </div>

            <div class="card double">
                <h2>Nuevo cobro</h2>
                
            </div>

            <hr class="full">

            <div class="card full">
                <h2>Buscar en el historial de pagos</h2>
                <form action='<?php echo $_SERVER["PHP_SELF"]?>' method="get" id="searchBar">
                    <label for="nombre">Nombre:</label>
                    <input type="text" id="nombre" name="nombre">

                    <label for="profesor">Profesor:</label>
                    <select id="profesor" name="profesor"></select>

                    <div class="full center">
                        <button type="submit" class="cta">
                            <?php include './img/search.svg' ?>
                            Buscar
                        </button>
                    </div>
                </form>
            </div>

            <div class="card full">
                <!-- ?php include './resources/grupos/groupSearch.php' ?> 
                WE SHOULD INCLUDE THIS MONTH'S PAYMENTS IN THE DEFAULT VIEW -->
            </div>

        </main>
    </div>

    <!-- Scripts -->
    <script src="./resources/pagos/newPayment.js"></script>
</body>
</html>