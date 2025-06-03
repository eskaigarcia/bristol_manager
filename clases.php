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
                <h1>Clases particulares y bonos</h1>
                <div class="flex gap-md">
                    <button onclick="createVoucherPayment()" class="cta">
                        <?php include './img/money.svg'; ?>
                        Nuevo bono
                    </button>
                    <button onclick="createClass()" class="cta">
                        <?php include './img/addClass.svg'; ?>
                        Nueva clase
                    </button>
                </div>
            </header>

                <div class="card double">
                    <h2>Buscar grupos</h2>
                    <form action='<?php echo $_SERVER["PHP_SELF"]?>' method="get" id="searchBar">
                        <label for="profesor">Profesor:</label>
                        <input type="text" id="profesor" name="profesor">
                        
                        <label for="nombre">Alumno:</label>
                        <input type="text" id="nombre" name="nombre">

                        <label for="fechaDesde">Desde:</label>
                        <input type="date" id="fechaDesde" name="fechaDesde">
                        
                        <label for="fechaHasta">Hasta:</label>
                        <input type="date" id="fechaHasta" name="fechaHasta">

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

                <div class="card double">
                    <h2>Buscar bonos</h2>
                    <form action='<?php echo $_SERVER["PHP_SELF"]?>' method="get" id="searchBarVoucher" class="searchBar">                        
                        <label for="alumno">Alumno:</label>
                        <input type="text" id="alumno" name="alumno">

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

            <div class="card double">
                <?php include 'resources/clases/classSearch.php' ?>
            </div>
            <div class="card double">
                <?php include 'resources/clases/voucherSearch.php' ?>
            </div>

        </main>
    </div>
    
    <script src="./resources/pagos/newVoucherPayment.js"></script>
    <script src="./resources/clases/voucherDetailsBuild.js"></script>
    <script src="./resources/clases/newClass.js"></script>
    <script src="./resources/scrollspy.js"></script>
</body>
</html>