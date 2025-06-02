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

            <div class="card double">
                <h2>Nuevo cobro</h2>
                <button class="cardLink align_left" onclick="createMonthlyPayment()"><img src="img/groupAdd-onlight.png" alt="">Pago de mensualidad</button>
                <!-- <button class="cardLink align_left"><img src="img/groupAdd-onlight.png" alt="">Pago de grupo intensivo</button> -->
                <button class="cardLink align_left" onclick="createVoucherPayment()"><img src="img/groupAdd-onlight.png" alt="">Pago de bono de clases individuales</button>
            </div>

        </main>
    </div>

    <!-- Scripts -->
    <script src="./resources/pagos/newMonthlyPayment.js"></script>
    <script src="./resources/pagos/newVoucherPayment.js"></script>
</body>
</html>