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
                <h1>Panel de control</h1>
            </header>

            <div class="card double stat-singleNum">
                <h2>Pagos pendientes</h2>
                <p><span>✅</span> Todos los pagos al día</p>
                <button>Ir a pagos pendientes</button>
            </div>

            <div class="card double">
                <h2>Accesos rápidos</h2>
                <hr>
                <form method="post" action="annadir_alumnos.php">
                <button type="submit" class="cardLink align_left"><img src="img/personaAdd-onlight.png" alt="">Nuevo alumno</button>
                </form>
                <button class="cardLink align_left"><img src="img/money-onlight.png" alt="">Nuevo cobro</button>
                <button class="cardLink align_left"><img src="img/groupAdd-onlight.png" alt="">Añadir alumno a grupo</button>
                <button class="cardLink align_left"><img src="img/groupRemove-onlight.png" alt="">Eliminar alumno de grupo</button>
            </div>

            <div class="card double stat-singleNum">
                <h2>Comprobador de integridad</h2>
                <p><span>✅</span> Sin errores de integridad</p>
                <button>Ir a notificaciones</button>
            </div>

        </main>
    </div>

    <!-- Scripts -->
    <script src="render.js"></script>
</body>
</html>