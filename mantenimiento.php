<!DOCTYPE html>
<html lang="es">
<head>
    <?php include './components/htmlHead.php'; ?>
    <title>Mantenimiento Base de Datos</title>
</head>
<body>
    <div id="app">
        <?php include './components/navView.php'; ?>

        <main>
            <h1>Copias de Seguridad MySQL</h1>

            <form action="backup.php" method="post">
                <button type="submit" class="cta">📦 Hacer copia de seguridad</button>
            </form>

            <?php
                if (isset($_GET['status'])) {
                    if ($_GET['status'] === 'success') {
                        $file = htmlspecialchars($_GET['file']);
                        echo "<p class='success'>Backup creado correctamente. <a href='backups/$file' download>Descargar backup</a></p>";
                    } elseif ($_GET['status'] === 'error') {
                        echo "<p class='error'>Error al crear el backup.</p>";
                    }
                }
            ?>
        </main>
    </div>
</body>
</html>
