<!DOCTYPE html>
<html lang="en">
<head>
    <?php include "components/htmlHead.php"; ?>
</head>
<body>
    <div id="app">
        <?php include './components/navView.php'; ?>
        <main>
            <header>
                <h1>Clases particulares</h1>
                <div class="flex gap-md">
                    <button onclick="createVoucherPayment()" class="cta">
                        <?php include './img/money.svg'; ?>
                        Nuevo bono
                    </button>
                    <button onclick="createTeacher()" class="cta">
                        <?php include './img/addClass.svg'; ?>
                        Nueva clase
                    </button>
                </div>
            </header>

                <div class="card full">
                <h2>Buscar grupos</h2>
                <form action='<?php echo $_SERVER["PHP_SELF"]?>' method="get" id="searchBar">
                    <label for="profesor">Profesor:</label>
                    <select id="profesor" name="profesor"></select>
                    
                    <label for="nombre">Alumno:</label>
                    <input type="text" id="nombre" name="nombre">

                    <div class="full center">
                        <button type="submit" class="cta">
                            <?php include './img/search.svg' ?>
                            Buscar
                        </button>
                    </div>
                </form>
            </div>

            <div class="card full"><!-- php include 'resources/payroll/teachersearch.php' ?--></div>
        </main>
    </div>

    <script src="./resources/pagos/newVoucherPayment.js"></script>
    <script src="./resources/scrollspy.js"></script>
</body>
</html>