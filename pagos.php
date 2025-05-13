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
            </header>

            <div class="card double stat-singleNum">
                <h2>Pagos pendientes</h2>
                <p><span>✅</span> Todos los pagos al día</p>
                <p style="font-size: 1rem; margin-top: -40px;" >Ultima comprobación: 1/1/2014</p>
                <button>Ver pagos pendientes</button>
            </div>

            <div class="card double">
                <h2>Nuevo cobro</h2>
                        <button class="cardLink align_left" onclick="createMonthlyPayment()"><img src="img/groupAdd-onlight.png" alt="">Pago de mensualidad</button>
                        <button class="cardLink align_left"><img src="img/groupAdd-onlight.png" alt="">Pago de grupo intensivo</button>
                        <button class="cardLink align_left"><img src="img/groupAdd-onlight.png" alt="">Pago de bono de clases individuales</button>

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
    <script src="./resources/pagos/newMonthlyPayment.js"></script>
</body>
</html>